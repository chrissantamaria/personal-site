import { useEffect, useRef, useState } from 'react';

import { animationConfig } from './config';
import { TweakGUI } from './tweak-gui';

const vertexShaderSource = /*glsl*/ `
  attribute vec2 a_position;
  varying vec2 v_uv;
  
  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = /*glsl*/ `
  precision mediump float;
  
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_seed;
  
  // Animation parameters
  uniform vec2 u_baseSpeeds[6];
  uniform vec2 u_radii[6];
  uniform float u_blobSizes[6];
  uniform float u_blobSoftness[6];
  uniform float u_colorMix[6];
  uniform float u_speedVariation;
  
  // Color parameters
  uniform vec3 u_baseColor;
  uniform vec3 u_blobColors[6];
  
  varying vec2 v_uv;
  
  // Smooth noise function
  vec3 hash(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
              dot(p, vec3(269.5, 183.3, 246.1)),
              dot(p, vec3(113.5, 271.9, 124.6)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    
    return mix(mix(mix(dot(hash(i + vec3(0.0, 0.0, 0.0)), f - vec3(0.0, 0.0, 0.0)),
                        dot(hash(i + vec3(1.0, 0.0, 0.0)), f - vec3(1.0, 0.0, 0.0)), u.x),
                    mix(dot(hash(i + vec3(0.0, 1.0, 0.0)), f - vec3(0.0, 1.0, 0.0)),
                        dot(hash(i + vec3(1.0, 1.0, 0.0)), f - vec3(1.0, 1.0, 0.0)), u.x), u.y),
                mix(mix(dot(hash(i + vec3(0.0, 0.0, 1.0)), f - vec3(0.0, 0.0, 1.0)),
                        dot(hash(i + vec3(1.0, 0.0, 1.0)), f - vec3(1.0, 0.0, 1.0)), u.x),
                    mix(dot(hash(i + vec3(0.0, 1.0, 1.0)), f - vec3(0.0, 1.0, 1.0)),
                        dot(hash(i + vec3(1.0, 1.0, 1.0)), f - vec3(1.0, 1.0, 1.0)), u.x), u.y), u.z);
  }
  
  // Create blob shapes
  float blob(vec2 p, vec2 center, float radius, float softness) {
    float dist = length(p - center);
    return smoothstep(radius + softness, radius - softness, dist);
  }
  
  void main() {
    vec2 uv = v_uv;
    vec2 p = (uv - 0.5) * 2.0;
    p.x *= u_resolution.x / u_resolution.y;
    
    // Time offsets for varied motion
    float timeOffsets[6];
    timeOffsets[0] = 0.0;
    timeOffsets[1] = 2.0;
    timeOffsets[2] = 4.0;
    timeOffsets[3] = 5.0;
    timeOffsets[4] = 1.0;
    timeOffsets[5] = 3.5;
    
    // Seed multipliers for each blob
    float seedMultipliers[6];
    seedMultipliers[0] = 12.9898;
    seedMultipliers[1] = 78.233;
    seedMultipliers[2] = 37.719;
    seedMultipliers[3] = 93.989;
    seedMultipliers[4] = 67.547;
    seedMultipliers[5] = 23.456;
    
    // Calculate blob positions, influences, and build final color
    vec3 finalColor = u_baseColor;
    
    for (int i = 0; i < 6; i++) {
      float seed = fract(sin(u_seed * seedMultipliers[i]) * 43758.5453);
      float timeOffset = timeOffsets[i];
      
      // Calculate position with alternating sin/cos patterns
      float speedX = u_baseSpeeds[i].x + seed * u_speedVariation;
      float speedY = u_baseSpeeds[i].y + seed * u_speedVariation;
      
      float phaseX = seed * 6.28 + timeOffset;
      float phaseY = seed * 6.28 + timeOffset;
      
      // Alternate sin/cos patterns for varied blob motion
      // Even blobs (0,2,4): sin X, cos Y - start from right side of ellipse
      // Odd blobs (1,3,5): cos X, sin Y - start from top of ellipse
      vec2 blobPos;
      if (mod(float(i), 2.0) < 1.0) {
        blobPos.x = sin(u_time * speedX + phaseX) * u_radii[i].x;
        blobPos.y = cos(u_time * speedY + phaseY) * u_radii[i].y;
      } else {
        blobPos.x = cos(u_time * speedX + phaseX) * u_radii[i].x;
        blobPos.y = sin(u_time * speedY + phaseY) * u_radii[i].y;
      }
      
      // Calculate influence and immediately apply to final color
      float influence = blob(p, blobPos, u_blobSizes[i], u_blobSoftness[i]);
      finalColor = mix(finalColor, u_blobColors[i], influence * u_colorMix[i]);
    }
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      console.warn('WebGL not supported, falling back to static background');
      return;
    }

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
    );

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    const positionAttribute = gl.getAttribLocation(program, 'a_position');
    const timeUniform = gl.getUniformLocation(program, 'u_time');
    const resolutionUniform = gl.getUniformLocation(program, 'u_resolution');
    const seedUniform = gl.getUniformLocation(program, 'u_seed');

    const baseSpeedsUniform = gl.getUniformLocation(program, 'u_baseSpeeds');
    const radiiUniform = gl.getUniformLocation(program, 'u_radii');
    const blobSizesUniform = gl.getUniformLocation(program, 'u_blobSizes');
    const blobSoftnessUniform = gl.getUniformLocation(
      program,
      'u_blobSoftness',
    );
    const colorMixUniform = gl.getUniformLocation(program, 'u_colorMix');
    const speedVariationUniform = gl.getUniformLocation(
      program,
      'u_speedVariation',
    );

    // Get uniform locations for color parameters
    const baseColorUniform = gl.getUniformLocation(program, 'u_baseColor');
    const blobColorsUniform = gl.getUniformLocation(program, 'u_blobColors');

    // Generate a random seed for this instance
    const randomSeed = Math.random() * 1000;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    // Resize canvas to match display size
    const resizeCanvas = () => {
      // return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const startTime = Date.now();
    const animate = () => {
      resizeCanvas();

      const time = (Date.now() - startTime) * 0.001; // seconds

      gl.useProgram(program);

      gl.uniform1f(timeUniform, time);
      gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
      gl.uniform1f(seedUniform, randomSeed);

      // Create Float32Arrays from current config values (updated by Tweakpane)
      const baseSpeeds = new Float32Array([
        animationConfig.speed1.x,
        animationConfig.speed1.y,
        animationConfig.speed2.x,
        animationConfig.speed2.y,
        animationConfig.speed3.x,
        animationConfig.speed3.y,
        animationConfig.speed4.x,
        animationConfig.speed4.y,
        animationConfig.speed5.x,
        animationConfig.speed5.y,
        animationConfig.speed6.x,
        animationConfig.speed6.y,
      ]);

      const radii = new Float32Array([
        animationConfig.radius1.x,
        animationConfig.radius1.y,
        animationConfig.radius2.x,
        animationConfig.radius2.y,
        animationConfig.radius3.x,
        animationConfig.radius3.y,
        animationConfig.radius4.x,
        animationConfig.radius4.y,
        animationConfig.radius5.x,
        animationConfig.radius5.y,
        animationConfig.radius6.x,
        animationConfig.radius6.y,
      ]);

      const blobSizes = new Float32Array([
        animationConfig.blobSize1,
        animationConfig.blobSize2,
        animationConfig.blobSize3,
        animationConfig.blobSize4,
        animationConfig.blobSize5,
        animationConfig.blobSize6,
      ]);

      const blobSoftness = new Float32Array([
        animationConfig.blobSoft1,
        animationConfig.blobSoft2,
        animationConfig.blobSoft3,
        animationConfig.blobSoft4,
        animationConfig.blobSoft5,
        animationConfig.blobSoft6,
      ]);

      const colorMix = new Float32Array([
        animationConfig.colorMix1,
        animationConfig.colorMix2,
        animationConfig.colorMix3,
        animationConfig.colorMix4,
        animationConfig.colorMix5,
        animationConfig.colorMix6,
      ]);

      // Create color arrays from current config values (convert from 0-255 to 0-1 range)
      const baseColor = new Float32Array([
        animationConfig.baseColor.r / 255,
        animationConfig.baseColor.g / 255,
        animationConfig.baseColor.b / 255,
      ]);

      const blobColors = new Float32Array([
        animationConfig.blobColor1.r / 255,
        animationConfig.blobColor1.g / 255,
        animationConfig.blobColor1.b / 255,
        animationConfig.blobColor2.r / 255,
        animationConfig.blobColor2.g / 255,
        animationConfig.blobColor2.b / 255,
        animationConfig.blobColor3.r / 255,
        animationConfig.blobColor3.g / 255,
        animationConfig.blobColor3.b / 255,
        animationConfig.blobColor4.r / 255,
        animationConfig.blobColor4.g / 255,
        animationConfig.blobColor4.b / 255,
        animationConfig.blobColor5.r / 255,
        animationConfig.blobColor5.g / 255,
        animationConfig.blobColor5.b / 255,
        animationConfig.blobColor6.r / 255,
        animationConfig.blobColor6.g / 255,
        animationConfig.blobColor6.b / 255,
      ]);

      // Set animation parameter uniforms
      gl.uniform2fv(baseSpeedsUniform, baseSpeeds);
      gl.uniform2fv(radiiUniform, radii);
      gl.uniform1fv(blobSizesUniform, blobSizes);
      gl.uniform1fv(blobSoftnessUniform, blobSoftness);
      gl.uniform1fv(colorMixUniform, colorMix);
      gl.uniform1f(speedVariationUniform, animationConfig.speedVariation);

      // Set color parameter uniforms
      gl.uniform3fv(baseColorUniform, baseColor);
      gl.uniform3fv(blobColorsUniform, blobColors);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionAttribute);
      gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);
    resizeCanvas();
    animate();

    setHasRendered(true);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);

      // Clean up WebGL resources
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="animate-slow-fade-in absolute inset-0 h-full w-full"
      />
      {hasRendered && <TweakGUI />}
    </>
  );
};
