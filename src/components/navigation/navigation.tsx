import { NavLink } from 'react-router-dom';
import type { NavLinkRenderProps } from 'react-router-dom';
import { boldText } from '../../styles/styles';

export const Navigation = () => {
  const styleNavLink = ({ isActive }: NavLinkRenderProps) =>
    isActive ? boldText : '';

  return (
    <nav>
      <NavLink to="/" className={styleNavLink}>
        HOME
      </NavLink>
      <NavLink to="/about" className={styleNavLink}>
        ABOUT
      </NavLink>
    </nav>
  );
};
