import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EtudiantFormPage from './Pages/EtudiantFormPage';
import UserProfilePage from './Pages/UserProfilePage';
import DemandePage from './Pages/DemandePage'; // Assurez-vous que le chemin d'importation est correct
import AnnonceFormPage from './Pages/CreateAnnoncePage';
import AfficheAnnonce from './components/AnnonceDetails'; // Adjust the import path
import AfficheDemande from './components/AfficheDemande';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<h1>Welcome to the App</h1>} />
        <Route path="/create-etudiant" element={<EtudiantFormPage />} />
        <Route path="/profile-etudiant" element={<UserProfilePage />} />
        <Route path="/create-annonce" element={<AnnonceFormPage />} />
        <Route path="/demande" element={<DemandePage />} />  {/* Pour créer une nouvelle demande */}
        <Route path="/annonce/:id" element={<AfficheAnnonce />} />   
        <Route path="/afficheDemande/:id" element={<AfficheDemande />} />
     
      </Routes>
    </Router>
  );
}

export default App;
