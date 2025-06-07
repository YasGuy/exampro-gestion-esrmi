
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, User, AlertCircle } from 'lucide-react';

const MySchedule = ({ user }) => {
  const [schedule] = useState([
    {
      id: 1,
      module: 'Mathématiques Avancées',
      code: 'MATH301',
      type: 'Examen Final',
      date: '2025-01-15',
      startTime: '09:00',
      endTime: '11:00',
      duration: '2h00',
      room: 'A201',
      teacher: 'Dr. Mohamed Alami',
      status: 'Confirmé',
      instructions: 'Apporter calculatrice scientifique'
    },
    {
      id: 2,
      module: 'Gestion de Projet',
      code: 'GP301',
      type: 'Présentation',
      date: '2025-01-18',
      startTime: '14:00',
      endTime: '16:00',
      duration: '2h00',
      room: 'B105',
      teacher: 'Prof. Fatima Bennani',
      status: 'Confirmé',
      instructions: 'Présentation en groupe de 4'
    },
    {
      id: 3,
      module: 'Base de Données',
      code: 'DB301',
      type: 'Examen Pratique',
      date: '2025-01-25',
      startTime: '10:00',
      endTime: '12:00',
      duration: '2h00',
      room: 'C302',
      teacher: 'Dr. Hassan El Idrissi',
      status: 'Confirmé',
      instructions: 'Salle informatique - Pas de supports autorisés'
    },
    {
      id: 4,
      module: 'Anglais Technique',
      code: 'ENG201',
      type: 'Oral',
      date: '2025-01-30',
      startTime: '15:30',
      endTime: '16:00',
      duration: '30min',
      room: 'D108',
      teacher: 'Ms. Sarah Johnson',
      status: 'Provisoire',
      instructions: 'Préparer présentation de 10 minutes'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmé': return 'bg-green-100 text-green-800 border-green-200';
      case 'Provisoire': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Annulé': return 'bg-red-100 text-red-800 border-red-200';
      case 'Reporté': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Examen Final': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Examen Pratique': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Présentation': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Oral': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const upcomingExams = schedule.filter(exam => new Date(exam.date) >= new Date());
  const thisWeekExams = schedule.filter(exam => {
    const examDate = new Date(exam.date);
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return examDate >= today && examDate <= nextWeek;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Mon Planning</h2>
        <p className="text-muted-foreground">
          Votre calendrier d'examens et d'évaluations
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
            <CardTitle className="text-sm font-medium">Prochaine épreuve</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {upcomingExams.length > 0 ? 
                new Date(upcomingExams[0].date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) :
                'Aucune'
              }
            </div>
            <p className="text-xs text-muted-foreground">
              {upcomingExams.length > 0 ? upcomingExams[0].module : 'Pas d\'examen'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Planning des examens</CardTitle>
          <CardDescription>
            Calendrier complet de vos évaluations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedule.map((exam) => (
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
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
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{exam.teacher}</span>
                  </div>
                </div>

                {exam.instructions && (
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">Instructions spéciales:</p>
                        <p className="text-sm text-blue-700">{exam.instructions}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MySchedule;
