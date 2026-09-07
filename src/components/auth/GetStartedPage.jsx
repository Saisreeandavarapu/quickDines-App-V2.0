import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { GetStartedCard } from './GetStartedCard';
import { useApp } from '../../context/AppContext';

export const GetStartedPage = () => {
  const navigate = useNavigate();
  const { journeyContext } = useApp();

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleChangeJourney = () => {
    navigate('/scan');
  };

  return (
    <AuthLayout title="Get Started" subtitle="Welcome to QuickDines Transit Dining">
      <GetStartedCard 
        journey={journeyContext}
        onGetStarted={handleGetStarted}
        onChangeJourney={handleChangeJourney}
      />
    </AuthLayout>
  );
};
