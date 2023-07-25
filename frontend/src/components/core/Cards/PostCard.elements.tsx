import Card, { CardProps } from '@mui/material/Card';
import CardContent, { CardContentProps } from '@mui/material/CardContent';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const StyledCard = styled(Card)<CardProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));
export const TimeTypo = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
export const StyledTitle = styled(Typography)<TypographyProps>({
  maxWidth: 500,
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
});

export const StyledCardContent = styled(CardContent)<CardContentProps>({
  height: '90%',
  display: 'flex',
  justifyContent: 'space-evenly',
  flexDirection: 'column',
});
