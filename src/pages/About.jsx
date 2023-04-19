import React from "react";
import doron from "../assets/images/doron.jpeg";
import { BsGithub } from "react-icons/bs";

function About() {
  return (
    <div className="about-page-container">
      <div className="about-pic-container">
        <img className="about-pic" src={doron} alt="pic of me" />
      </div>
      <h3 className="text-center about-text">
        My name is Doron Breska and I’m currently doing a full stack, 840 hours
        bootcamp at Code Academy Berlin. <br />
        This is my third project. I built it using React, JS and Bootstarp.
        <br /> You can create account, change your acoustic info,
        like-comment-share you favorite paintings and even play a little memory
        game at the end.
        <br /> If you have any feedback or interesting idea you can contact me
        on GitHub -{" "}
        <a href="https://github.com/Doron-Breska">
          <BsGithub className="git-hub-icon" />
        </a>
      </h3>
    </div>
  );
}

export default About;
