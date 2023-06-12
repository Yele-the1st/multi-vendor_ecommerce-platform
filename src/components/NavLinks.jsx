import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/styles";

const NavLinks = () => {
  return (
    <div className=" hidden lg:flex space-x-10 pr-4">
      <NavLink
        exact
        to="/"
        className={({ isActive }) =>
          isActive ? `${styles.navActive}` : `${styles.navNormal}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive ? `${styles.navActive}` : `${styles.navNormal}`
        }
      >
        Products
      </NavLink>

      <NavLink
        to="/shops"
        className={({ isActive }) =>
          isActive ? `${styles.navActive}` : `${styles.navNormal}`
        }
      >
        Shops
      </NavLink>

      <NavLink
        to="/events"
        className={({ isActive }) =>
          isActive ? `${styles.navActive}` : `${styles.navNormal}`
        }
      >
        Events
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? `${styles.navActive}` : `${styles.navNormal}`
        }
      >
        About
      </NavLink>
    </div>
  );
};

export default NavLinks;
