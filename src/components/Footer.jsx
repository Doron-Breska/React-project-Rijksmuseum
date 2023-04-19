import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";

function Footer() {
  return (
    <footer className="d-flex justify-content-center">
      <span className="footer-text">Rijksmuseum Twenthe</span>
      <span className="footer-text">Lasondersingel 129 </span>
      <span className="footer-text">7514 BP Enschede</span>
      <span className="footer-text">053 201 2000</span>
      <span className="footer-text">
        <a className="social" href="https://www.facebook.com/rijksmuseum/">
          <FaFacebookSquare className="social-icons" />
        </a>
        <a
          className="social"
          href="https://www.instagram.com/rijksmuseum/?hl=en"
        >
          <FaInstagramSquare className="social-icons" />
        </a>
        <a
          className="social"
          href="https://twitter.com/rijksmuseum?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
        >
          <FaTwitterSquare className="social-icons" />
        </a>
      </span>
    </footer>
  );
}

export default Footer;
