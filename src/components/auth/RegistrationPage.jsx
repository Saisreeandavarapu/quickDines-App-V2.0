import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { RegistrationForm } from './RegistrationForm';
import { SuccessState } from './SuccessState';
import { useApp } from '../../context/AppContext';

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const { loginCustomerSuccess, setActiveCustomerTab } = useApp();
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredData, setRegisteredData] = useState(null);

  const handleRegistrationSuccess = (data) => {
    setRegisteredData(data);
    setIsRegistered(true);
    loginCustomerSuccess({
      id: "USR-NEW-" + Date.now(),
      name: `${data.firstName} ${data.lastName}`,
      phone: data.mobileNumber,
      email: data.email
    });
  };

  return (
    <AuthLayout title="Passenger Registration" subtitle="Create Account">
      {isRegistered ? (
        <SuccessState
          title="Welcome to QuickDines! 🎉"
          message={`Your profile is ready, ${registeredData?.firstName || 'Traveler'}. Your meal preferences and seat delivery defaults are saved.`}
          buttonText="Continue to Customer Home"
          onAction={() => {
            setActiveCustomerTab('menu');
            navigate('/customer/menu');
          }}
        />
      ) : (
        <RegistrationForm
          onSubmitSuccess={handleRegistrationSuccess}
          onCancel={() => navigate('/login')}
        />
      )}
    </AuthLayout>
  );
};
