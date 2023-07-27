import { Box, Button, Typography, styled } from '@mui/material';
import { FC } from 'react';
import { FallbackProps } from 'react-error-boundary';

const Fallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <StyledBox>
      <Typography variant="h3" color="text.secondary">
        Something went wrong
      </Typography>
      <Typography variant="h6" color="text.secondary">
        {error.message}
      </Typography>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </StyledBox>
  );
};
export default Fallback;

const StyledBox = styled(Box)({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
});
