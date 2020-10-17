import styled from '@emotion/styled';

export const LandingContainer = styled.div({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 1rem',
  background: '#543f79',
  textAlign: 'center',
  position: 'relative',
});

export const HeadshotContainer = styled.div({
  width: 400,
  maxWidth: '100%',
  marginBottom: '1rem',
});

export const Title = styled.h1({
  margin: 0,
  fontSize: '2.7rem',
  color: 'white',
  marginBottom: '0.5rem',
});

export const Subtitle = styled.h2({
  margin: 0,
  fontSize: '1.8rem',
  color: 'white',
  fontWeight: 300,
});
