
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, FileText } from 'lucide-react';

const ExamSchedule = ({ user }) => {
  const [exams] = useState([
    {
      id: 1,
      module: 'Mathématiques Avancées',
      code: 'MATH301',
      date: '2025-01-15',
      startTime: '09:00',
      endTime: '11:00',
      room: 'A201',
      students: 45,
      status: 'Programmé',
      duration: '2h00',
      type: 'Examen Final'
    },
    {
      id: 2,
      module: 'Statistiques',
      code: 'STAT202',
      date: '2025-01-22',
      startTime: '14:00',
      endTime: '16:00',
      room: 'B105',
      students: 38,
      status: 'Programmé',
      duration: '2h00',
      type: 'Examen Final'
    },
    {
      id: 3,
      module: 'Analyse Numérique',
      code: 'NUM401',
      date: '2025-01-28',
      startTime: '10:00',
      endTime: '12:00',
      room: 'C302',
      students: 32,
      status: 'Programmé',
      duration: '2h00',
      type: 'Examen Final'
    },
    {
      id: 4,
      module: 'Mathématiques Avancées',
      code: 'MATH301',
      date: '2025-02-05',
      startTime: '14:00',
      endTime: '15:30',
      room: 'A201',
      students: 45,
      status: 'Planifié',
      duration: '1h30',
      type: 'Rattrapage'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Programmé': return 'bg-green-100 text-green-800 border-green-200';
      case 'Planifié': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Terminé': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Examen Final': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Rattrapage': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Contrôle': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const upcomingExams = exams.filter(exam => new Date(exam.date) >= new Date());
  const thisWeekExams = exams.filter(exam => {
    const examDate = new Date(exam.date);
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return examDate >= today && examDate <= nextWeek;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Planning des Examens</h2>
        <p className="text-muted-foreground">
          Votre calendrier d'examens et de surveillance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Examens à venir</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingExams.length}</div>
            <p className="text-xs text-muted-foreground">
              Total programmés
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cette semaine</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisWeekExams.length}</div>
            <p className="text-xs text-muted-foreground">
              Examens proches
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total étudiants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {upcomingExams.reduce((sum, exam) => sum + exam.students, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              À surveiller
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Examens programmés</CardTitle>
            <CardDescription>
              Liste complète de vos examens à venir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{exam.module}</h3>
                      <p className="text-sm text-muted-foreground">{exam.code}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getStatusColor(exam.status)}>
                        {exam.status}
                      </Badge>
                      <Badge className={getTypeColor(exam.type)}>
                        {exam.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(exam.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{exam.startTime} - {exam.endTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Salle {exam.room}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{exam.students} étudiants</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-1" />
                      Liste étudiants
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-1" />
                      Sujet d'examen
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamSchedule;
