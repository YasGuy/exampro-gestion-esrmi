
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Calendar, Edit, Trash } from 'lucide-react';

const ExamsManagement = () => {
  const exams = [
    { 
      id: 1, 
      module: 'Mathématiques Avancées', 
      date: '2025-01-15', 
      time: '09:00-11:00', 
      room: 'A201', 
      teacher: 'Prof. Fatima Bennani',
      students: 45,
      status: 'Programmé'
    },
    { 
      id: 2, 
      module: 'Gestion de Projet', 
      date: '2025-01-18', 
      time: '14:00-16:00', 
      room: 'B105', 
      teacher: 'Dr. Hassan El Idrissi',
      students: 38,
      status: 'Confirmé'
    },
    { 
      id: 3, 
      module: 'Base de Données', 
      date: '2025-01-22', 
      time: '10:00-12:00', 
      room: 'C302', 
      teacher: 'Dr. Mohamed Alami',
      students: 42,
      status: 'En attente'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Programmé': return 'bg-green-100 text-green-800';
      case 'Confirmé': return 'bg-blue-100 text-blue-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Examens</h2>
          <p className="text-muted-foreground">
            Planifier et gérer les examens
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Planning général
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Programmer un examen
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Examens programmés</CardTitle>
          <CardDescription>
            {exams.length} examens dans le planning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Horaire</TableHead>
                <TableHead>Salle</TableHead>
                <TableHead>Enseignant</TableHead>
                <TableHead>Étudiants</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell className="font-medium">{exam.module}</TableCell>
                  <TableCell>{new Date(exam.date).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>{exam.time}</TableCell>
                  <TableCell>{exam.room}</TableCell>
                  <TableCell>{exam.teacher}</TableCell>
                  <TableCell>{exam.students}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                      {exam.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamsManagement;
