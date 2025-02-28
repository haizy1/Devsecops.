import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/DemandeForm.css'; // Ensure this file includes your updated styles

const DemandeForm = ({ demandeId, etudiantId, onSuccess }) => {
  const [demande, setDemande] = useState({
    possedeDejaLocal: false,
    ville: '',
    typeChambre: '',
    budgetMensuel: 0,
    dureeLocation: '',
    disponibleImmediatement: false,
    dateDisponibilite: '',
    pasDeFetes: false,
    nonFumeur: false,
    pasDeVisiteurs: false,
    pasDAnimaux: false,
    ecole: '',
    sexe: '',
    name: '',
    matchingScore: 0,
  });

  // Hardcoded options for villes and ecoles
  const villes = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux'];
  const ecoles = [
    'Université de Paris',
    'École Polytechnique',
    'HEC Paris',
    'ENS Lyon',
    'Sorbonne Université',
  ];

  useEffect(() => {
    if (demandeId) {
      axios
        .get(`/api/demande/${demandeId}`)
        .then((response) => setDemande(response.data))
        .catch((error) => console.error('Erreur lors de la récupération de la demande:', error));
    }
  }, [demandeId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDemande((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = demandeId ? `/api/demande/update/${demandeId}` : '/api/demande/create';
    const method = demandeId ? 'put' : 'post';

    axios({
      method,
      url,
      data: {
        ...demande,
        etudiant: etudiantId,
      },
    })
      .then((response) => {
        console.log('Demande enregistrée avec succès:', response.data);
        if (onSuccess) onSuccess();
      })
      .catch((error) => console.error('Erreur lors de l\'enregistrement de la demande:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="demande-form">
      {/* Ville */}
      <div className="form-group">
        <label htmlFor="ville">Ville:</label>
        <select name="ville" id="ville" value={demande.ville} onChange={handleChange}>
          <option value="">-- Sélectionnez une ville --</option>
          {villes.map((ville, index) => (
            <option key={index} value={ville}>
              {ville}
            </option>
          ))}
        </select>
      </div>

      {/* École */}
      <div className="form-group">
        <label htmlFor="ecole">École:</label>
        <select name="ecole" id="ecole" value={demande.ecole} onChange={handleChange}>
          <option value="">-- Sélectionnez une école --</option>
          {ecoles.map((ecole, index) => (
            <option key={index} value={ecole}>
              {ecole}
            </option>
          ))}
        </select>
      </div>

      {/* Type de chambre */}
      <div className="form-group">
        <label htmlFor="typeChambre">Type de Chambre:</label>
        <select name="typeChambre" id="typeChambre" value={demande.typeChambre} onChange={handleChange}>
          <option value="">-- Sélectionnez un type --</option>
          <option value="STUDIO">Studio</option>
          <option value="T1">T1</option>
          <option value="T2">T2</option>
        </select>
      </div>

      {/* Budget Mensuel */}
      <div className="form-group">
        <label htmlFor="budgetMensuel">Budget Mensuel:</label>
        <input
          type="number"
          name="budgetMensuel"
          id="budgetMensuel"
          value={demande.budgetMensuel}
          onChange={handleChange}
        />
      </div>

      {/* Durée de Location */}
      <div className="form-group">
        <label htmlFor="dureeLocation">Durée de Location:</label>
        <select name="dureeLocation" id="dureeLocation" value={demande.dureeLocation} onChange={handleChange}>
          <option value="">-- Sélectionnez une durée --</option>
          <option value="SEMAINE">Semaine</option>
          <option value="MOIS">Mois</option>
          <option value="ANNEE">Année</option>
        </select>
      </div>

      {/* Date de disponibilité */}
      <div className="form-group">
        <label htmlFor="dateDisponibilite">Date de Disponibilité:</label>
        <input
          type="date"
          name="dateDisponibilite"
          id="dateDisponibilite"
          value={demande.dateDisponibilite}
          onChange={handleChange}
        />
      </div>

      {/* Preferences */}
      {[
        { label: 'Possède déjà un local', name: 'possedeDejaLocal' },
        { label: 'Disponible immédiatement', name: 'disponibleImmediatement' },
        { label: 'Pas de fêtes', name: 'pasDeFetes' },
        { label: 'Non fumeur', name: 'nonFumeur' },
        { label: 'Pas de visiteurs', name: 'pasDeVisiteurs' },
        { label: 'Pas d\'animaux', name: 'pasDAnimaux' },
      ].map(({ label, name }) => (
        <div className="form-group" key={name}>
          <label>
            <input
              type="checkbox"
              name={name}
              checked={demande[name]}
              onChange={handleChange}
            />
            {label}
          </label>
        </div>
      ))}

      {/* Sexe */}
      <div className="form-group">
        <label htmlFor="sexe">Sexe:</label>
        <select name="sexe" id="sexe" value={demande.sexe} onChange={handleChange}>
          <option value="">-- Sélectionnez un sexe --</option>
          <option value="HOMME">Homme</option>
          <option value="FEMME">Femme</option>
        </select>
      </div>

      {/* Bouton Enregistrer */}
      <div className="form-group">
        <button type="submit">Enregistrer</button>
      </div>
    </form>
  );
};

export default DemandeForm;
