import React, { useState } from 'react';
import axios from 'axios';
import './AnnonceForm.css';

const AnnonceForm = () => {
  // Initialize form state
  const [formData, setFormData] = useState({
    ville: '',
    rue: '',
    quartier: '',
    equipements: [],
    cuisineEquipements: [],
    services: [],
    photoUrl: [], // This will store the photo URLs
    titre: '',
    description: '',
    capaciteAccueil: '',
    nombrePieces: '',
    surface: '',
    prix: '',
    meuble: false,
    eauEtElectriciteInclus: false,
    nombreTotaleChambres: '',
    nbrSalleBain: '',
    typeLogement: '',
    typeBien: '',
    salon: '',
    cuisine: '',
    dateDisponibilite: '',
    dureeLocation: '',
  });

  // Data for ville, rue, quartier
  const villesData = {
    Marrakech: {
      rues: ["Rue 1", "Rue 2", "Rue 3"],
      quartiers: {
        "Rue 1": ["Quartier 1", "Quartier 2"],
        "Rue 2": ["Quartier 3", "Quartier 4"],
        "Rue 3": ["Quartier 5", "Quartier 6"]
      }
    },
    Casablanca: {
      rues: ["Rue A", "Rue B", "Rue C"],
      quartiers: {
        "Rue A": ["Quartier A1", "Quartier A2"],
        "Rue B": ["Quartier B1", "Quartier B2"],
        "Rue C": ["Quartier C1", "Quartier C2"]
      }
    },
    Agadir: {
      rues: ["Rue X", "Rue Y", "Rue Z"],
      quartiers: {
        "Rue X": ["Quartier X1", "Quartier X2"],
        "Rue Y": ["Quartier Y1", "Quartier Y2"],
        "Rue Z": ["Quartier Z1", "Quartier Z2"]
      }
    },
    Rabat: {
      rues: ["Rue P", "Rue Q", "Rue R"],
      quartiers: {
        "Rue P": ["Quartier P1", "Quartier P2"],
        "Rue Q": ["Quartier Q1", "Quartier Q2"],
        "Rue R": ["Quartier R1", "Quartier R2"]
      }
    }
  };

  // Enum-like values for salon and cuisine
  const salonOptions = ['PRIVE', 'COMMUN', 'AUCUN'];
  const cuisineOptions = ['PRIVE', 'COMMUN'];

  // Handlers for form field updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler for ville change
  const handleVilleChange = (e) => {
    const selectedVille = e.target.value;
    setFormData({ ...formData, ville: selectedVille, rue: '', quartier: '' });
  };

  // Handler for rue change
  const handleRueChange = (e) => {
    const selectedRue = e.target.value;
    setFormData({ ...formData, rue: selectedRue, quartier: '' });
  };

  // Handle boolean toggle (Meublé, Eau et Electricité inclus)
  const handleToggle = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: !formData[name] });
  };

  // Handle multi-select fields (Equipements, CuisineEquipements, Services)
  const handleMultiSelect = (e, field) => {
    const selectedValue = e.target.value;
    setFormData((prevData) => {
      const updatedField = [...prevData[field]];
      if (updatedField.includes(selectedValue)) {
        // Remove if already selected
        const index = updatedField.indexOf(selectedValue);
        updatedField.splice(index, 1);
      } else {
        // Add if not already selected
        updatedField.push(selectedValue);
      }
      return { ...prevData, [field]: updatedField };
    });
  };

  // Handle photo upload
  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);

    try {
      const uploadedPhotoUrls = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);

          const response = await axios.post('http://localhost:1016/api/photos/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          return response.data; // The full URL of the uploaded photo
        })
      );

      setFormData((prevData) => ({
        ...prevData,
        photoUrl: [...prevData.photoUrl, ...uploadedPhotoUrls],
      }));
    } catch (error) {
      console.error('Error uploading photos:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:1016/loueur/Annonce/Creation-Annonce', formData);
      console.log('Annonce created:', response.data);
      alert('Annonce créée avec succès!');
    } catch (error) {
      console.error('Error creating annonce:', error);
      alert('Erreur lors de la création de l\'annonce.');
    }
  };

  // Render the form
  return (
    <form className="form" onSubmit={handleSubmit}>
      {/* Ville Selection */}
      <div className="input-group">
        <label>Ville</label>
        <select name="ville" value={formData.ville} onChange={handleVilleChange}>
          <option value="">Sélectionner une ville</option>
          {Object.keys(villesData).map((ville) => (
            <option key={ville} value={ville}>
              {ville}
            </option>
          ))}
        </select>
      </div>

      {/* Rue Selection */}
      <div className="input-group">
        <label>Rue</label>
        <select
          name="rue"
          value={formData.rue}
          onChange={handleRueChange}
          disabled={!formData.ville}
        >
          <option value="">Sélectionner une rue</option>
          {formData.ville &&
            villesData[formData.ville].rues.map((rue, index) => (
              <option key={index} value={rue}>
                {rue}
              </option>
            ))}
        </select>
      </div>

      {/* Quartier Selection */}
      <div className="input-group">
        <label>Quartier</label>
        <select
          name="quartier"
          value={formData.quartier}
          onChange={handleChange}
          disabled={!formData.rue}
        >
          <option value="">Sélectionner un quartier</option>
          {formData.rue &&
            villesData[formData.ville].quartiers[formData.rue]?.map(
              (quartier, index) => (
                <option key={index} value={quartier}>
                  {quartier}
                </option>
              )
            )}
        </select>
      </div>

      {/* Title and Description */}
      <div className="input-group">
        <label>Titre</label>
        <input
          type="text"
          name="titre"
          value={formData.titre}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      {/* Capacite Accueil */}
      <div className="input-group">
        <label>Capacité d'accueil</label>
        <input
          type="number"
          name="capaciteAccueil"
          value={formData.capaciteAccueil}
          onChange={handleChange}
        />
      </div>

      {/* Nombre de pièces */}
      <div className="input-group">
        <label>Nombre de pièces</label>
        <input
          type="number"
          name="nombrePieces"
          value={formData.nombrePieces}
          onChange={handleChange}
        />
      </div>

      {/* Surface */}
      <div className="input-group">
        <label>Surface (m²)</label>
        <input
          type="number"
          name="surface"
          value={formData.surface}
          onChange={handleChange}
        />
      </div>

      {/* Nombre Totale Chambres */}
      <div className="input-group">
        <label>Nombre totale de chambres</label>
        <input
          type="number"
          name="nombreTotaleChambres"
          value={formData.nombreTotaleChambres}
          onChange={handleChange}
        />
      </div>

      {/* Nombre de salles de bain */}
      <div className="input-group">
        <label>Nombre de salles de bain</label>
        <input
          type="number"
          name="nbrSalleBain"
          value={formData.nbrSalleBain}
          onChange={handleChange}
        />
      </div>

      {/* Salon Selection */}
      <div className="input-group">
        <label>Salon</label>
        <select name="salon" value={formData.salon} onChange={handleChange}>
          <option value="">Sélectionner un type de salon</option>
          {salonOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Cuisine Selection */}
      <div className="input-group">
        <label>Cuisine</label>
        <select name="cuisine" value={formData.cuisine} onChange={handleChange}>
          <option value="">Sélectionner un type de cuisine</option>
          {cuisineOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Meublé Toggle */}
      <div className="input-group">
        <label>Meublé</label>
        <button type="button" name="meuble" onClick={handleToggle}>
          {formData.meuble ? 'Oui' : 'Non'}
        </button>
      </div>

      {/* Eau et Electricité Inclus Toggle */}
      <div className="input-group">
        <label>Eau et Electricité Inclus</label>
        <button type="button" name="eauEtElectriciteInclus" onClick={handleToggle}>
          {formData.eauEtElectriciteInclus ? 'Oui' : 'Non'}
        </button>
      </div>

      {/* Prix */}
      <div className="input-group">
        <label>Prix</label>
        <input
          type="number"
          name="prix"
          value={formData.prix}
          onChange={handleChange}
        />
      </div>

      {/* Disponibilité et Durée */}
      <div className="input-group">
        <label>Date de disponibilité</label>
        <input
          type="datetime-local"
          name="dateDisponibilite"
          value={formData.dateDisponibilite}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label>Durée de location</label>
        <select
          name="dureeLocation"
          value={formData.dureeLocation}
          onChange={handleChange}
        >
          <option value="">Sélectionner une durée</option>
          <option value="COURTE">Courte (1 à 5 mois)</option>
          <option value="MOYENNE">Moyenne (6 à 11 mois)</option>
          <option value="LONGUE">Longue (plus de 12 mois)</option>
        </select>
      </div>

      {/* Equipements (Multiple Select) */}
      <div className="input-group">
        <label>Equipements</label>
        <select
          multiple
          value={formData.equipements}
          onChange={(e) => handleMultiSelect(e, 'equipements')}
        >
          <option value="TV">Tv</option>
          <option value="WIFI">Wifi</option>
          <option value="LAVE_LINGE">Lave Linge</option>
          <option value="MATERIEL_ENTRETIEN">Meteriel d'entretien</option>
          <option value="LINGE_MAISON">Linge Maison</option>
          <option value="LINGE_LIT">Linge Lit</option>

        </select>
        <div className="tags">
          {formData.equipements.map((equipement, index) => (
            <span key={index} className="tag">
              {equipement}
            </span>
          ))}
        </div>
      </div>

      {/* Cuisine Equipements (Multiple Select) */}
      <div className="input-group">
        <label>Equipements de Cuisine</label>
        <select
          multiple
          value={formData.cuisineEquipements}
          onChange={(e) => handleMultiSelect(e, 'cuisineEquipements')}
        >
          <option value="REFRIGERATEUR">Refrigerateur</option>
          <option value="MICRO_ONDES">Micro ondes</option>
          <option value="VAISSELLE">La vaisselle</option>
          <option value="PLAQUES_CUISSON">Plaques Cuisson</option>
          <option value="FOUR">Four</option>
          <option value="LAVE_VAISSELLE">Lave Vaisselle</option>


        </select>
        <div className="tags">
          {formData.cuisineEquipements.map((equipement, index) => (
            <span key={index} className="tag">
              {equipement}
            </span>
          ))}
        </div>
      </div>

      <div className="input-group">
        <label>Type de logement</label>
        <select
          name="typeLogement"
          value={formData.typeLogement}
          onChange={handleChange}
        >
          <option value="LOGEMENT_ENTIER">Logement entier</option>
          <option value="LOGEMENT_EN_COLOCATION">Logement en Colocation</option>
          <option value="LOGEMENT_CHEZ_HABITANT">Logement chez un habitant</option>
        </select>
      </div>

      <div className="input-group">
        <label>Type de bien</label>
        <select
          name="typeBien"
          value={formData.typeBien}
          onChange={handleChange}
        >
          <option value="MAISON">Maison</option>
          <option value="APPARTEMENT">Appartement</option>
          <option value="STUDIO">Studio</option>
          <option value="CHAMBRE">Chambre</option>

        </select>
      </div>

      {/* Services (Multiple Select) */}
      <div className="input-group">
        <label>Services</label>
        <select
          multiple
          value={formData.services}
          onChange={(e) => handleMultiSelect(e, 'services')}
        >
          <option value="CONTRAT">Contrat</option>
          <option value="MENAGE">Menage</option>
          <option value="CONCIERGERIE">Conciergerie</option>
          <option value="LINGE">Linge</option>
        </select>
        <div className="tags">
          {formData.services.map((service, index) => (
            <span key={index} className="tag">
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Photo Upload */}
      <div className="input-group">
        <label>Photos</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
        />
        <div className="photo-preview">
          {formData.photoUrl.length > 0 && (
            <ul>
              {formData.photoUrl.map((photoUrl, index) => (
                <li key={index}>
                  <img src={photoUrl} alt={`Photo ${index + 1}`} width="100" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="submit-btn">Soumettre l'annonce</button>
    </form>
  );
};

export default AnnonceForm;