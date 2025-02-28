import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaCity, FaHome, FaMoneyBillWave, FaClock, FaCalendarCheck, FaBan } from 'react-icons/fa';
import { MdEventBusy } from 'react-icons/md';
import './AfficheDemande.css';

const AfficheDemande = () => {
  const { id } = useParams();
  const [demande, setDemande] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchDemande = async () => {
      try {
        const response = await axios.get(`http://localhost:1016/Demande/find/${id}`);
        console.log("Backend Response:", response.data); // Debugging
        setDemande(response.data);
      } catch (err) {
        setFetchError(err.message);
        console.error("Error fetching demande:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDemande();
    }
  }, [id]);

  if (loading) return <div className="loading">Chargement...</div>;
  if (fetchError) return <div className="error">Erreur: {fetchError}</div>;
  if (!demande) return <div className="no-data">Aucune donnée disponible</div>;

  return (
    <div className="demande-container">
      <h1 className="demande-title">Détails de la Demande</h1>

      <h3>Étudiant :</h3>
      <div className="grid-container">
        <div className="grid-item">
          <span className="label">Nom</span>
          <span className="value">{demande.name || 'N/A'}</span>
        </div>
        <div className="grid-item">
          <span className="label">École</span>
          <span className="value">{demande.ecole || 'N/A'}</span>
        </div>
        <div className="grid-item">
          <span className="label">Sexe</span>
          <span className="value">{demande.sexe || 'N/A'}</span>
        </div>
      </div>

      {/* Logement Section */}
      <h3>Logement :</h3>
      <div className="grid-container">
        {/* Ville */}
        <div className="grid-item">
          <FaCity className="icon" />
          <span className="label">Ville</span>
          <span className="value">{demande.ville || 'N/A'}</span>
        </div>

        {/* Type de chambre */}
        <div className="grid-item">
          <FaHome className="icon" />
          <span className="label">Type de chambre</span>
          <span className="value">{demande.typeChambre || 'N/A'}</span>
        </div>

        {/* Budget */}
        <div className="grid-item">
          <FaMoneyBillWave className="icon" />
          <span className="label">Budget</span>
          <span className="value">{demande.budgetMensuel ? `${demande.budgetMensuel} Dh` : 'N/A'}</span>
        </div>

        {/* Durée */}
        <div className="grid-item">
          <FaClock className="icon" />
          <span className="label">Durée</span>
          <span className="value">{demande.dureeLocation || 'N/A'}</span>
        </div>

        {/* Disponibilité */}
        <div className="grid-item">
          <FaCalendarCheck className="icon" />
          <span className="label">Disponibilité</span>
          <span className="value">
            {demande.disponibleImmediatement ? 'Immédiat' : demande.dateDisponibilite || 'N/A'}
          </span>
        </div>
      </div>

      {/* Règlements Section */}
      <h3>Règlements :</h3>
      <div className="grid-container">
        {demande.pasDeFetes && (
          <div className="grid-item">
            <MdEventBusy className="icon" />
            <span className="label">Pas de fêtes</span>
          </div>
        )}
        {demande.nonFumeur && (
          <div className="grid-item">
            <FaBan className="icon" />
            <span className="label">Non-fumeur</span>
          </div>
        )}
        {demande.pasDeVisiteurs && (
          <div className="grid-item">
            <FaBan className="icon" />
            <span className="label">Pas de visiteurs</span>
          </div>
        )}
        {demande.pasDAnimaux && (
          <div className="grid-item">
            <FaBan className="icon" />
            <span className="label">Pas d'animaux</span>
          </div>
        )}
      </div>

      {/* Étudiant Section */}
      

      {/* Matching Score */}
      {/* <div className="matching-score">
        <span className="label">Score de correspondance</span>
        <span className="value">{demande.matchingScore || 'N/A'}</span>
      </div> */}
    </div>
  );
};

export default AfficheDemande;