import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { FC, PropsWithChildren } from 'react';

type StyledLinkProps = { url: string; onClick?: () => void; className?: string } & PropsWithChildren;

const StyledLink: FC<StyledLinkProps> = ({ url, children, onClick, className }) => {
  return (
    <Link className={className} sx={{ textDecoration: 'none' }} component={RouterLink} to={url} onClick={onClick}>
      {children}
    </Link>
  );
};
export default StyledLink;
