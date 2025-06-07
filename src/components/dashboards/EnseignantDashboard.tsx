import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GradesManagement from '@/components/modules/GradesManagement';
import MyModules from '@/components/modules/MyModules';
import ExamSchedule from '@/components/modules/ExamSchedule';

const EnseignantDashboard = ({ activeModule, user }) => {
  if (activeModule === 'grades') return <GradesManagement />;
  if (activeModule === 'my-modules') return <MyModules user={user} />;
  if (activeModule === 'exam-schedule') return <ExamSchedule user={user} />;

  const myModules = [
    { name: 'Mathématiques Avancées', students: 45, nextExam: '15 Jan 2025' },
    { name: 'Statistiques', students: 38, nextExam: '22 Jan 2025' },
    { name: 'Analyse Numérique', students: 32, nextExam: '28 Jan 2025' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Espace Enseignant</h2>
        <p className="text-muted-foreground">
          Bienvenue {user.name}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mes Modules</CardTitle>
            <CardDescription>
              Modules que vous enseignez ce semestre
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myModules.map((module, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <h4 className="font-medium">{module.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {module.students} étudiants • Prochain examen: {module.nextExam}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Examens à venir</CardTitle>
            <CardDescription>
              Planning de vos prochains examens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <div>
                  <p className="font-medium">Mathématiques Avancées</p>
                  <p className="text-sm text-muted-foreground">Salle A201 • 9h00-11h00</p>
                </div>
                <span className="text-sm font-medium">15 Jan</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">Statistiques</p>
                  <p className="text-sm text-muted-foreground">Salle B105 • 14h00-16h00</p>
                </div>
                <span className="text-sm font-medium">22 Jan</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnseignantDashboard;
