import React from "react";
import './Card.css';

export const Card = (props) => {
  const { character } = props;

   return (
    <div>
      <h2>id: {character.id}</h2>
      <h3>name: {character.name}</h3>
      <p>status: {character.status}</p>
      <img src= {character.image} />
      
    </div>
  );
};

export default Card;