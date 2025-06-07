
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UsersManagement from '@/components/modules/UsersManagement';

const AdministrateurDashboard = ({ activeModule }) => {
  if (activeModule === 'users') return <UsersManagement />;

  const systemStats = [
    { title: 'Utilisateurs actifs', value: '289', description: 'Dernières 24h' },
    { title: 'Connexions aujourd\'hui', value: '156', description: 'Pic à 10h00' },
    { title: 'Stockage utilisé', value: '2.3 GB', description: 'Sur 10 GB' },
    { title: 'Uptime système', value: '99.9%', description: 'Ce mois-ci' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Administration Système</h2>
        <p className="text-muted-foreground">
          Surveillance et maintenance du système ExamPro
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {systemStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>État du système</CardTitle>
          <CardDescription>
            Surveillance en temps réel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Base de données</span>
              <span className="text-green-600 font-medium">Opérationnelle</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Serveur web</span>
              <span className="text-green-600 font-medium">Opérationnel</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Service d'authentification</span>
              <span className="text-green-600 font-medium">Opérationnel</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdministrateurDashboard;
