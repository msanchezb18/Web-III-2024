import React from "react";
import Pokemon from "../pokemon-23.svg";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <img src={Pokemon} alt="CACA" className="navbar-image" />
    </nav>
  );
};

export default NavBar;
