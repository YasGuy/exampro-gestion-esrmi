
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import DirecteurDashboard from '@/components/dashboards/DirecteurDashboard';
import EnseignantDashboard from '@/components/dashboards/EnseignantDashboard';
import EtudiantDashboard from '@/components/dashboards/EtudiantDashboard';
import AdministrateurDashboard from '@/components/dashboards/AdministrateurDashboard';

const Dashboard = ({ user, onLogout }) => {
  const [activeModule, setActiveModule] = useState('dashboard');

  const renderDashboardContent = () => {
    switch (user.role) {
      case 'directeur':
        return <DirecteurDashboard activeModule={activeModule} />;
      case 'enseignant':
        return <EnseignantDashboard activeModule={activeModule} user={user} />;
      case 'etudiant':
        return <EtudiantDashboard activeModule={activeModule} user={user} />;
      case 'administrateur':
        return <AdministrateurDashboard activeModule={activeModule} />;
      default:
        return <div>Rôle non reconnu</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar 
          user={user} 
          activeModule={activeModule} 
          onModuleChange={setActiveModule} 
        />
        <div className="flex-1">
          <Header user={user} onLogout={onLogout} />
          <main className="p-6">
            {renderDashboardContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
