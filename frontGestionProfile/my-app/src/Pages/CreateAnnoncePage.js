import React from "react";
import AnnonceForm from "../components/AnnonceForm"; // Chemin vers votre composant AnnonceForm
import "./CreateAnnoncePage.css"; // Import du CSS minimaliste

const CreateAnnoncePage = () => {
  return (
    <div style={{ fontFamily: 'Montserrat', padding: '120px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Create a new annonce</h1>
        <AnnonceForm />
      </div>
  );
};

export default CreateAnnoncePage;
