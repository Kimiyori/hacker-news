import { Box, Typography, styled } from '@mui/material';
import { FC } from 'react';
import { FallbackProps } from 'react-error-boundary';
import StyledLink from 'components/core/Link/Link';

const Fallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <StyledBox>
      <Typography variant="h3" color="text.secondary">
        Something went wrong
      </Typography>
      <Typography variant="h6" color="text.secondary">
        {error.message}
      </Typography>
      <StyledLink onClick={resetErrorBoundary} url="/">
        Back
      </StyledLink>
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
