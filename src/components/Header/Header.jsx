import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import globalCss from '../../css/global.module.css';
import css from './Header.module.css';

import { ThemeSwitcher } from 'components/Header/components/ThemeSwitcher/ThemeSwitcher';
import { LogoSvg } from './components/Svg/LogoSvg';
import { BurgerMenuSvg } from './components/Svg/BurgerMenuSvg';
import { Navigation } from './components/Navigation/Navigation';

import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { UserProfile } from 'components/ModalWindow/components/UserProfile/UserProfile';
import { DropDown } from 'components/ModalWindow/components/DropDown/DropDown';
import { LogoutAlert } from 'components/ModalWindow/components/LogoutAlert/LogoutAlert';

export const Header = () => {
  const [isModalChooseOpen, setIsModalChooseOpen] = useState(false);
  const [isModalLogoutOpen, setIsModalLogoutOpen] = useState(false);
  const [isModalEditUserOpen, setIsModalEditUserOpen] = useState(false);

  const toggleModalChoose = () => setIsModalChooseOpen(!isModalChooseOpen);

  return (
    <>
      <ModalWindow isShown={isModalEditUserOpen} setClose={setIsModalEditUserOpen}>
        <UserProfile setClose={setIsModalEditUserOpen} />
      </ModalWindow>
      <ModalWindow isShown={isModalLogoutOpen} setClose={setIsModalLogoutOpen}>
        <LogoutAlert setClose={setIsModalLogoutOpen} />
      </ModalWindow>
      <header className={css.header}>
        <div className={`${css['headerBox']} ${globalCss['container']}`}>
          <NavLink
            to="/home"
            className={`${css['logoLink']} ${globalCss['global-link']}`}
          >
            <LogoSvg />
            <p className={`${css['title']} ${globalCss['global-p']}`}>
              Drink Master
            </p>
          </NavLink>
          <Navigation />
          <div className={css.profile}>
            <ThemeSwitcher />
            <div onClick={toggleModalChoose} className={css.userBox}>
              <img
                src={require('../../img/header/user.png')}
                alt="Avatar"
                className={css.avatar}
              />
              <span className={css.name}>User</span>
            </div>
            <button className={css.burgerMenu}>
              <BurgerMenuSvg />
            </button>
            <DropDown
              isOpen={isModalChooseOpen}
              setIsOpen={setIsModalChooseOpen}
              setIsModalEditUserOpen={setIsModalEditUserOpen}
              setIsModalLogoutOpen={setIsModalLogoutOpen}
            />
          </div>
        </div>
      </header>
    </>
  );
};
