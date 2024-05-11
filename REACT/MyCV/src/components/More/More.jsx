

const Experience = ({ experience }) => {
  return (
    <div className="experience">
      <h2>Experience</h2>
      {experience.map((item, index) => (
        <div key={index} className="experience-item">
          <h3>{item.name}</h3>
          <p>{item.date}</p>
          <p>{item.where}</p>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Experience;
