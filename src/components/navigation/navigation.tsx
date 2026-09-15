import { NavLink } from 'react-router-dom';
import type { NavLinkRenderProps } from 'react-router-dom';
import { boldText } from '../../styles/styles';
import { Btn } from '../../ui/btn';
import { useContext } from 'react';
import { ThemeContext } from '../../store/ThemeContext';

export const Navigation = () => {
  const styleNavLink = ({ isActive }: NavLinkRenderProps) =>
    isActive ? boldText : '';

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="flex items-center gap-5 p-2">
      <NavLink to="/" className={`${styleNavLink} text-xl`}>
        HOME
      </NavLink>
      <NavLink to="/about" className={`${styleNavLink} text-xl`}>
        ABOUT
      </NavLink>

      <Btn
        btnText={theme === 'dark' ? 'ligth' : 'dark'}
        onClickFunc={() => toggleTheme()}
      />
    </nav>
  );
};
