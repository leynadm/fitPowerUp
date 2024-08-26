import "./Hero.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="hero-1856">
      <div className="cs-container">
        <div className="cs-content">
          <p className="cs-topper"><span className="secondary-font">100%</span> FREE<span className="secondary-font">!</span></p>
          <p className="cs-title">
            Get fit <span className="secondary-font">&</span> power up<span className="secondary-font">!</span>
          </p>
          <p className="cs-text">
            The <span className="secondary-font">#1</span> Dragon Ball Z
            fan-made fintess app<span className="secondary-font">!</span>
          </p>
          <Button onClick={() => navigate("/login")} variant="dbz">
            Get Started
          </Button>

          <img
            className="cs-content-graphic"
            src="/images/gym-hero-graphic.svg"
            alt="graphic"
            height="1075"
            width="1135"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <picture className="cs-background">
        <source media="(max-width: 600px)" srcSet="/images/son-goku.jpeg" />
        <source media="(min-width: 601px)" srcSet="/images/son-goku.jpeg" />
        <img
          loading="lazy"
          decoding="async"
          src="/images/son-goku.jpeg"
          alt="field"
          width="1920"
          height="1200"
          aria-hidden="true"
        />
      </picture>

{/*       <img
        className="cs-graphic cs-graphic-light"
        src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Graphics/dark-splatter.svg"
        alt="graphic"
        height="161"
        width="1920"
        loading="lazy"
        decoding="async"
      />
      <img
        className="cs-graphic cs-graphic-dark"
        src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Graphics/dark-mode-splatter2.svg"
        alt="graphic"
        height="161"
        width="1920"
        loading="lazy"
        decoding="async"
      /> */}
    </section>
  );
};

export default Hero;
