import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Remplacez useHistory par useNavigate
import AnnonceDetails from '../components/AnnonceDetails';
const AfficheAnnonce = () => {
    return (
      <div style={{ fontFamily: 'Montserrat', padding: '120px' }}>
        <AnnonceDetails />
      </div>
    );
  };
  
  export default AfficheAnnonce;