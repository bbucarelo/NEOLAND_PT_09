import React from 'react';
import { useState } from 'react'
import './App.css'
import { CV } from './CV/Cv'
import EducationandExperience from './components/EducationandExperience/EducationandExperience';
import Hero from './components/Hero/Hero';
import Experience from './components/More/More';
import About from './components/About/About';


const { hero, education, experience } = CV;

function App() {
    const [showEducation, setShowEducation] = useState(true);
  
    return (
      <div className="App">
        <Hero hero={hero} />
        <About hero={hero} />
        {showEducation ? (
          <EducationandExperience education={education} />
        ) : (
          <Experience experience={experience} />
        )}
        
        <div>
          <button className="custom-btn btn-4" onClick={() => setShowEducation(true)}>
            Education
          </button>
          <button className="custom-btn btn-4" onClick={() => setShowEducation(false)}>
            Experience
          </button>
        </div>
      </div>
    );
  }
  
  export default App;