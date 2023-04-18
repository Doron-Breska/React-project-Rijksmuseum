import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
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
          <FaFacebookSquare />
        </a>
        <a
          className="social"
          href="https://www.instagram.com/rijksmuseum/?hl=en"
        >
          <BsInstagram />
        </a>
        <a
          className="social"
          href="https://twitter.com/rijksmuseum?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
        >
          <FaTwitterSquare />
        </a>
      </span>
    </footer>
  );
}

export default Footer;
