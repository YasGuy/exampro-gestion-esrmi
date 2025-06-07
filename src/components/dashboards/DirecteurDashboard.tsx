
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StudentsManagement from '@/components/modules/StudentsManagement';
import TeachersManagement from '@/components/modules/TeachersManagement';
import ModulesManagement from '@/components/modules/ModulesManagement';
import ExamsManagement from '@/components/modules/ExamsManagement';

const DirecteurDashboard = ({ activeModule }) => {
  if (activeModule === 'students') return <StudentsManagement />;
  if (activeModule === 'teachers') return <TeachersManagement />;
  if (activeModule === 'modules') return <ModulesManagement />;
  if (activeModule === 'exams') return <ExamsManagement />;

  // Dashboard overview
  const stats = [
    { title: 'Étudiants', value: '245', description: 'Total inscrits' },
    { title: 'Enseignants', value: '28', description: 'Corps professoral' },
    { title: 'Modules', value: '67', description: 'Cours actifs' },
    { title: 'Examens à venir', value: '12', description: 'Cette semaine' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tableau de bord Directeur</h2>
        <p className="text-muted-foreground">
          Vue d'ensemble de la gestion académique
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
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

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>
              Opérations courantes de gestion
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              Planifier un nouvel examen
            </Button>
            <Button className="w-full justify-start" variant="outline">
              Ajouter un étudiant
            </Button>
            <Button className="w-full justify-start" variant="outline">
              Créer un module
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Examens récents</CardTitle>
            <CardDescription>
              Derniers examens programmés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Mathématiques Avancées</p>
                  <p className="text-sm text-muted-foreground">15 Janvier 2025</p>
                </div>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  Programmé
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Gestion de Projet</p>
                  <p className="text-sm text-muted-foreground">18 Janvier 2025</p>
                </div>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  En attente
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DirecteurDashboard;
