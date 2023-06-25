import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../styles/styles";

const NavLinks = ({ setVisible, className }) => {
  return (
    <div className={` ${className} `}>
      <NavLink
        exact="true"
        to="/"
        onClick={() => setVisible(false)}
        className={({ isActive }) =>
          isActive ? `${styles.navActiveMobile}` : `${styles.navNormalMobile}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/products"
        onClick={() => setVisible(false)}
        className={({ isActive }) =>
          isActive ? `${styles.navActiveMobile}` : `${styles.navNormalMobile}`
        }
      >
        Products
      </NavLink>

      <NavLink
        to="/shops"
        onClick={() => setVisible(false)}
        className={({ isActive }) =>
          isActive ? `${styles.navActiveMobile}` : `${styles.navNormalMobile}`
        }
      >
        Shops
      </NavLink>

      <NavLink
        to="/events"
        onClick={() => setVisible(false)}
        className={({ isActive }) =>
          isActive ? `${styles.navActiveMobile}` : `${styles.navNormalMobile}`
        }
      >
        Events
      </NavLink>

      <NavLink
        to="/about"
        onClick={() => setVisible(false)}
        className={({ isActive }) =>
          isActive ? `${styles.navActiveMobile}` : `${styles.navNormalMobile}`
        }
      >
        About
      </NavLink>
    </div>
  );
};

export default NavLinks;
