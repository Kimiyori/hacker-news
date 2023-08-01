import { Box, BoxProps, Button, ButtonProps, Container, ContainerProps, alpha, styled } from '@mui/material';

export const StyledContainer = styled(Container)<ContainerProps>(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  background: theme.palette.background.default,
  padding: '2rem',
  [theme.breakpoints.up('xl')]: {
    maxWidth: '100%',
  },
}));
export const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  width: 200,
  height: 40,
  fontSize: 16,
  backgroundColor: alpha(theme.palette.primary.light, 0.75),
  color: alpha(theme.palette.text.primary, 0.75),
}));
export const StyledBox = styled(Box)<BoxProps>({
  position: 'fixed',
  left: '50%',
  top: '90%',
  transform: 'translate(-50%,-50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 15,
});
