import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Remplacez useHistory par useNavigate
import AfficheDemande from '../components/AfficheDemande'; // Assurez-vous que le chemin d'importation est correct
const AfficheDemande = () => {
    return (
      <div style={{ fontFamily: 'Montserrat', padding: '120px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Créer un Étudiant</h1>
        <AfficheDemande />
      </div>
    );
  };
  
  export default AfficheDemande;