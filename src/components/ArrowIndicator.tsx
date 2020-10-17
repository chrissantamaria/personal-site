import { keyframes } from '@emotion/core';

const float = keyframes`
  0% {
    transform: translateY(0px);
  } 
  50% {
    transform: translateY(-8px);
  } 
  100% {
    transform: translateY(0px);
  }
`;

const ArrowIndicator = () => (
  <div
    css={{
      position: 'absolute',
      bottom: 8,
      left: '50%',
      transform: 'translateX(-50%)',
      cursor: 'pointer',
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      css={{
        fill: 'white',
        height: 48,
        animation: `${float} 2s ease infinite`,
      }}
    >
      <path d="M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15 1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16z" />
    </svg>
  </div>
);

export default ArrowIndicator;
