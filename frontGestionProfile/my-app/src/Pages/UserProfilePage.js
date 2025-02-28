import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserProfileCard from '../components/UserProfileCard';
import Navbar from '../components/Navbar'; // Importing Navbar
import '../components/UserProfileCard.css';

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:1016/etudiant/find/7');
        setUser(response.data);
      } catch (error) {
        setError('Error fetching user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    alert('Modify button clicked! Implement edit functionality here.');
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div className="error">No user data found</div>;
  }

  return (
    <div className="user-profile-page">
      <Navbar /> {/* Add Navbar here */}
      <div style={{ paddingTop: '80px' }}> {/* Add padding to prevent content from being hidden under Navbar */}
        <UserProfileCard user={user} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default UserProfilePage;
