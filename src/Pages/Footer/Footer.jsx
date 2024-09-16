import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import Styles from './Footer.module.css';
import { FaBluesky } from 'react-icons/fa6';

const Footer = () => {
  const navigate = useNavigate();

  const goToContact = () => {
    navigate('/telaPrincipal');
  };

  return (
    <div className={Styles.footerContainer}>
      <div className={Styles.footerContent}>
        <p className={Styles.text}>© 2024 Betterlife. Todos os direitos reservados.</p>
        <div className={Styles.iconContainer}>
          <FaGithub className={Styles.socialIcon} />
          <FaInstagram className={Styles.socialIcon} />
          <FaBluesky className={Styles.socialIcon} />
        </div>        
      </div>
    </div>
  );
};

export default Footer;
