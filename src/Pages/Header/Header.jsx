import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdExit } from "react-icons/io";
import Styles from '../Header/Header.module.css';
import { UserContext } from '../../Contexts/UserContext';

function Header() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate('/perfil');
  };

  const realizarLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div className={Styles.headerContainer}>
      <h1 className={Styles.title}>Betterlife</h1>
      <div className={Styles.iconContainer}>
        <FaUserCircle className={Styles.profileIcon} onClick={goToProfile} />
        <IoMdExit className={Styles.profileIcon} onClick={realizarLogout} />
      </div>
    </div>
  );
}

export default Header;
