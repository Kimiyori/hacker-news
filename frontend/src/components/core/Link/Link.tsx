import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { FC, PropsWithChildren } from 'react';

const StyledLink: FC<{ url: string; onClick?: () => void; className?: string } & PropsWithChildren> = ({
  url,
  children,
  onClick,
  className,
}) => {
  return (
    <Link className={className} sx={{ textDecoration: 'none' }} component={RouterLink} to={url} onClick={onClick}>
      {children}
    </Link>
  );
};
export default StyledLink;
