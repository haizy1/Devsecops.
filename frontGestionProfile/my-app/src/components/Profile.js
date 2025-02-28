import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  // Define state variables to store profile data
  const [profile, setProfile] = useState(null);
  
  // Fetch profile data on component mount
  useEffect(() => {
    axios.get('/your-api-endpoint') // Replace with your actual API endpoint
      .then(response => {
        setProfile(response.data); // Assuming the response has your profile data
      })
      .catch(error => {
        console.error("Error fetching profile data:", error);
      });
  }, []);
  
  // Render loading state while data is being fetched
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold text-gray-900">À propos de moi</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Aide les Kolocs à mieux te connaitre en renseignant plus d'informations.</p>
      </div>

      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {/* Ecole */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">École</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{profile.ecole}</dd>
          </div>

          {/* Phone number */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Numéro de téléphone</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{profile.numeroTele}</dd>
          </div>

          {/* Date of birth */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Date de naissance</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{profile.dateNaissance}</dd>
          </div>

          {/* Languages */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Langues</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.langues.split(',').map((lang, index) => (
                <div key={index}>{lang}</div>
              ))}
            </dd>
          </div>

          {/* Description */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Description</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{profile.description}</dd>
          </div>

          {/* Personality */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Personnalité</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.personalityTraits.join(', ')}
            </dd>
          </div>

          {/* Lifestyle */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Style de vie</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.lifestylePreferences.join(', ')}
            </dd>
          </div>

          {/* Dietary Habits */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Habitudes alimentaires</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.dietaryHabits.join(', ')}
            </dd>
          </div>

          {/* Passions */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Passions</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.passions.join(', ')}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Profile;
