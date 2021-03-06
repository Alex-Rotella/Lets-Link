import React from "react";
import "../../App.css";
import "./HomeSection.css";
import { Button } from "../Button";
import { useHistory } from "react-router-dom";

function HomeSection() {
  const history = useHistory();
  function getStarted() {
    history.push({
      pathname: "/Form",
    });
  }

  return (
    <div className="hero-container">
      <div
        className="fullscreen-video-wrap"
        dangerouslySetInnerHTML={{
          __html: `
      <video 
        loop
        muted
        autoPlay
        playsinline
      >
      <source src="/videos/bonfire.mp4" type="video/mp4">
      </video>
      `,
        }}
      ></div>
      <h1> Let's Link </h1>
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          onClick={getStarted}
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default HomeSection;
