import React from 'react';
import "./About.css";

const About = ({ hero }) => {
  return (
    <div className="about">
      <h2>About Me</h2>
      <div className="card">
        <p>{hero.aboutMe[0].info}</p>
        <p>{hero.aboutMe[1].info}</p>
        <p>{hero.aboutMe[2].info}</p>
        <p>{hero.aboutMe[3].info}</p>
      </div>
    </div>
  );
};

export default About;
