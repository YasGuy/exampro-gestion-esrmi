
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [user, setUser] = useState(null);

  if (user) {
    return <Dashboard user={user} onLogout={() => setUser(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">ExamPro</h1>
            <p className="text-muted-foreground">
              Système de Gestion des Examens - ESRmi
            </p>
          </div>
          <LoginForm onLogin={setUser} />
        </div>
      </div>
    </div>
  );
};

export default Index;
