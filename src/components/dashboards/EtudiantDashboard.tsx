
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const EtudiantDashboard = ({ activeModule, user }) => {
  const upcomingExams = [
    { module: 'Mathématiques Avancées', date: '15 Jan 2025', time: '9h00-11h00', room: 'A201' },
    { module: 'Gestion de Projet', date: '18 Jan 2025', time: '14h00-16h00', room: 'B105' },
    { module: 'Base de Données', date: '25 Jan 2025', time: '10h00-12h00', room: 'C302' }
  ];

  const recentGrades = [
    { module: 'Programmation Web', grade: '16/20', date: '10 Jan 2025' },
    { module: 'Réseaux', grade: '14/20', date: '08 Jan 2025' },
    { module: 'Algorithmique', grade: '18/20', date: '05 Jan 2025' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Espace Étudiant</h2>
        <p className="text-muted-foreground">
          Bienvenue {user.name}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Examens à venir</CardTitle>
            <CardDescription>
              Vos prochains examens programmés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingExams.map((exam, index) => (
                <div key={index} className="border rounded-lg p-3 bg-blue-50">
                  <h4 className="font-medium">{exam.module}</h4>
                  <p className="text-sm text-muted-foreground">
                    {exam.date} • {exam.time} • Salle {exam.room}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes récentes</CardTitle>
            <CardDescription>
              Vos derniers résultats
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentGrades.map((grade, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">{grade.module}</p>
                    <p className="text-sm text-muted-foreground">{grade.date}</p>
                  </div>
                  <span className="text-lg font-bold text-primary">{grade.grade}</span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              Télécharger le relevé de notes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EtudiantDashboard;
