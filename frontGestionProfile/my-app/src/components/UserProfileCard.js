import React from 'react';
import './UserProfileCard.css';

const UserProfileCard = ({ user, onEdit }) => {
  return (
    <div className="user-profile-card">
      <div className="profile-header">
        {user.photoUrl ? (
          <img src={user.photoUrl} alt="Profile" className="profile-img" />
        ) : (
          <div className="profile-img-placeholder">No Photo</div>
        )}
        <div className="profile-info">
          <h2>{`${user.nom} ${user.prenom}`}</h2>
          <span className="age-badge">{`${new Date().getFullYear() - new Date(user.dateNaissance).getFullYear()} ans`}</span>
          <div className="verified">
            <i className="fa fa-check-circle" /> E-mail vérifié
          </div>
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">Informations Générales :</h3>
        <div className="info-list">
          <div className="info-item">
            <span className="label">Nom </span>
            <span className="value">{user.nom}</span>
          </div>
          <div className="info-item">
            <span className="label">Prénom </span>
            <span className="value">{user.prenom}</span>
          </div>
          <div className="info-item">
            <span className="label">École </span>
            <span className="value">{user.ecole}</span>
          </div>
          <div className="info-item">
            <span className="label">Numéro de téléphone </span>
            <span className="value">{user.numeroTele}</span>
          </div>
          <div className="info-item">
            <span className="label">Code pays </span>
            <span className="value">{user.paysCode}</span>
          </div>
          <div className="info-item">
            <span className="label">Date de naissance </span>
            <span className="value">{new Date(user.dateNaissance).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">À propos de moi </h3>
        <div className="info-list">
          <div className="info-item">
            <span className="label">Langues parlées </span>
            <span className="value">{user.langues}</span>
          </div>
          <div className="info-item">
            <span className="label">Description </span>
            <span className="value">{user.description}</span>
          </div>
          <div className="info-item">
            <span className="label">Préférence de contact </span>
            <span className="value">{user.contactPreference}</span>
          </div>
        </div>
      </div>

      {/* Traits de personnalité */}
      <div className="section">
        <h3 className="section-title">Traits de personnalité </h3>
        <div className="tag-list">
          {user.personalityTraits && user.personalityTraits.length > 0 ? (
            user.personalityTraits.map((trait, index) => (
              <span className="tag" key={index}>{trait}</span>
            ))
          ) : (
            <span className="tag">Aucun trait de personnalité spécifié</span>
          )}
        </div>
      </div>

      {/* Préférences de style de vie */}
      <div className="section">
        <h3 className="section-title">Préférences de style de vie </h3>
        <div className="tag-list">
          {user.lifestylePreferences && user.lifestylePreferences.length > 0 ? (
            user.lifestylePreferences.map((lifestyle, index) => (
              <span className="tag" key={index}>{lifestyle}</span>
            ))
          ) : (
            <span className="tag">Aucune préférence de style de vie spécifiée</span>
          )}
        </div>
      </div>

      {/* Habitudes alimentaires */}
      <div className="section">
        <h3 className="section-title">Habitudes alimentaires </h3>
        <div className="tag-list">
          {user.dietaryHabits && user.dietaryHabits.length > 0 ? (
            user.dietaryHabits.map((habit, index) => (
              <span className="tag" key={index}>{habit}</span>
            ))
          ) : (
            <span className="tag">Aucune habitude alimentaire spécifiée</span>
          )}
        </div>
      </div>

      {/* Passions */}
      <div className="section">
        <h3 className="section-title">Passions :</h3>
        <div className="tag-list">
          {user.passions && user.passions.length > 0 ? (
            user.passions.map((passion, index) => (
              <span className="tag" key={index}>{passion}</span>
            ))
          ) : (
            <span className="tag">Aucune passion spécifiée</span>
          )}
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="profile-actions">
        <button className="action-button edit" onClick={onEdit}>Modifier</button>
      </div>
    </div>
  );
};

export default UserProfileCard;
