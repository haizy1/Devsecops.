import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaUtensilSpoon, FaTint, FaBolt, FaCouch, FaCheckCircle, FaBed, FaBath, FaRulerCombined, FaUsers, FaCalendarAlt, FaClock } from 'react-icons/fa';
import './AnnonceDetails.css';

const logementTypes = {
  LOGEMENT_EN_COLOCATION: "En Colocation",
  CHEZ_LHABITANT: "Chez l'Habitant",
  LOGEMENT_ENTIER: "Logement Entier"
};

const AnnonceDetails = () => {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnonceDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:1016/loueur/Annonce/find/${id}`);
        console.log("Backend Response:", response.data);
        setAnnonce(response.data);
      } catch (error) {
        setError("Erreur lors de la récupération des détails de l'annonce");
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnonceDetail();
  }, [id]);

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!annonce) return <div className="no-details">Aucun détail disponible pour cette annonce.</div>;

  return (
    <div className="annonce-detail-container">
      <div className="annonce-header">
        <h1 className="annonce-title">{annonce.titre || "Titre non spécifié"}</h1>
        <div className="annonce-price">
          <p>{annonce.prix ? `${annonce.prix} MAD` : "Prix non spécifié"}</p>
        </div>
      </div>

      {/* Photos Section */}
      {annonce.photos && annonce.photos.length > 0 && annonce.photos[0]?.url ? (
        <img src={annonce.photos[0].url} alt="Annonce" className="annonce-image" />
      ) : (
        <div className="placeholder-image">Aucune image disponible</div>
      )}

      {/* Description Section */}
      <div className="annonce-description">
        <p >{annonce.description || "Aucune description disponible"}</p>
      </div>

      {/* Tags for Attributes */}
      <div className="annonce-tags">
        <div className="tag">
          <FaHome className="icon" />
          <span>{logementTypes[annonce.typeLogement] || "Type inconnu"}</span>
        </div>
        <div className="tag">
          <FaUsers className="icon" />
          <span>Capacité: {annonce.capaciteAccueil}</span>
        </div>
        <div className="tag">
          <FaBed className="icon" />
          <span>Chambres: {annonce.nombreTotaleChambres}</span>
        </div>
        <div className="tag">
          <FaBath className="icon" />
          <span>Salles de bain: {annonce.nbrSalleBain}</span>
        </div>
        <div className="tag">
          <FaRulerCombined className="icon" />
          <span>Surface: {annonce.surface} m²</span>
        </div>
        <div className="tag">
          <FaCalendarAlt className="icon" />
          <span>Disponible: {new Date(annonce.dateDisponibilite).toLocaleDateString()}</span>
        </div>
        {annonce.meuble && (
          <div className="tag">
            <FaCouch className="icon" />
            <span>Meublé</span>
          </div>
        )}
        {annonce.eauEtElectriciteInclus && (
          <div className="tag">
            <div className="icon-container">
              <FaTint className="icon" /> <FaBolt className="icon" />
            </div>
            <span>Eau et Électricité incluses</span>
          </div>
        )}
      </div>

      {/* Equipements Section */}
      {annonce.equipements && annonce.equipements.length > 0 && (
        <div className="annonce-section">
          <h3>Équipements</h3>
          <div className="tags">
            {annonce.equipements.map((equipement, index) => (
              <div key={index} className="tag">{equipement}</div>
            ))}
          </div>
        </div>
      )}

      {/* Cuisine Equipements Section */}
      {annonce.cuisineEquipements && annonce.cuisineEquipements.length > 0 && (
        <div className="annonce-section">
          <h3>Équipements de cuisine</h3>
          <div className="tags">
            {annonce.cuisineEquipements.map((equipement, index) => (
              <div key={index} className="tag">{equipement}</div>
            ))}
          </div>
        </div>
      )}

      {/* Services Section */}
      {annonce.services && annonce.services.length > 0 && (
        <div className="annonce-section">
          <h3>Services</h3>
          <div className="tags">
            {annonce.services.map((service, index) => (
              <div key={index} className="tag">{service}</div>
            ))}
          </div>
        </div>
      )}

      {/* Commentaires Section */}
      {annonce.commentairesContenus && annonce.commentairesContenus.length > 0 && (
        <div className="annonce-section">
          <h3>Commentaires</h3>
          <div className="tags">
            {annonce.commentairesContenus.map((commentaire, index) => (
              <div key={index} className="tag">{commentaire}</div>
            ))}
          </div>
        </div>
      )}

      {/* Interested Button */}
      <div className="annonce-interested-button">
        <button className="interested-button">Je suis intéressé(e)</button>
      </div>
    </div>
  );
};

export default AnnonceDetails;