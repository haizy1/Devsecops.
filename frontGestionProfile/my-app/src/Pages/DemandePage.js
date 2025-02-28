import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Remplacez useHistory par useNavigate
import DemandeForm from '../components/DemandeForm'; // Assurez-vous que le chemin d'importation est correct
const DemandePage = () => {
    return (
      <div style={{ fontFamily: 'Montserrat', padding: '120px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Create a Demande</h1>
        <DemandeForm />
      </div>
    );
  };
  
  export default DemandePage;