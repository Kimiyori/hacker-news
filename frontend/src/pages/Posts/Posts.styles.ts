import { Button, ButtonProps, Container, ContainerProps, alpha, styled } from '@mui/material';

export const StyledContainer = styled(Container)<ContainerProps>(({ theme }) => ({
  position: 'relative',
  marginTop: '25px',
  minHeight: '100vh',
  background: theme.palette.background.default,
  padding: '2rem',
  [theme.breakpoints.up('xl')]: {
    maxWidth: '100%',
  },
}));
export const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  position: 'fixed',
  left: '50%',
  top: '95%',
  transform: 'translate(-50%,-50%)',
  width: 200,
  height: 40,
  fontSize: 16,
  backgroundColor: alpha(theme.palette.primary.light, 0.75),
  color: alpha(theme.palette.text.primary, 0.75),
}));
