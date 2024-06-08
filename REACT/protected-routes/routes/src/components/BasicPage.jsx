//Nos servirá para poder renderizar las páginas
//se usará en todas menos en el login que tiene su formulario

export const BasicPage = ({ title, description }) => {
    return (
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    );
  };
  