import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  const linkStyle = {
    backgoundColor: "red",
    fontSize: "2.5rem",
  };

  return (
    <div>
      {/* <div style={{ display: "flex", gap: "1em" }}>
        <Link style={location.pathname === '/' ? linkStyle : null} to='/'>HomePage</Link>
        <Link style={location.pathname === '/about' ? linkStyle : null} to='about' state={ "send this message to about page" }>About</Link>
      </div> */}

      <div style={{ display: "flex", gap: "1em" }}>
        <NavLink to="/" style={({ isActive }) => (isActive ? linkStyle : null)}>
          HomePage
        </NavLink>
        <NavLink
          to="/about"
          style={({ isActive }) => (isActive ? linkStyle : null)}
        >
          About
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
