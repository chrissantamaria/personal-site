import styled from '@emotion/styled';
import OutboundLink from './components/OutboundLink';

export const RootContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

export const LandingContainer = styled.div({
  height: 'calc(100vh - 2rem)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 32px',
  background: '#543f79',
  color: 'white',
  textAlign: 'center',
  position: 'relative',
});

export const HeadshotContainer = styled.div({
  width: 400,
  maxWidth: '90%',
  marginBottom: '1rem',
});

export const Title = styled.h1({
  margin: 0,
  fontSize: '2.6rem',
  marginBottom: '0.5rem',
});

export const Subtitle = styled.h2({
  margin: 0,
  fontSize: '1.7rem',
  fontWeight: 300,
});

export const AboutContainer = styled.div({
  margin: '64px auto',
  padding: '0 32px',
  maxWidth: 800,
});

export const Header = styled.h3({
  margin: 0,
  marginBottom: '1rem',
  fontSize: '1.8rem',
  fontWeight: 600,
});

export const Text = styled.p({
  margin: '1rem 0',
  fontSize: '1.3rem',
  fontWeight: 300,
  lineHeight: '2rem',
});

export const Link = styled(OutboundLink)({
  color: 'inherit',
});

export const IconRow = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: 350,
  margin: '0 auto',
});
