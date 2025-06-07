
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, FileText, Edit } from 'lucide-react';

const MyModules = ({ user }) => {
  const [modules] = useState([
    {
      id: 1,
      name: 'Mathématiques Avancées',
      code: 'MATH301',
      students: 45,
      credits: 6,
      semester: 'S5',
      nextExam: '2025-01-15',
      nextExamTime: '09:00-11:00',
      room: 'A201',
      status: 'Actif'
    },
    {
      id: 2,
      name: 'Statistiques',
      code: 'STAT202',
      students: 38,
      credits: 4,
      semester: 'S4',
      nextExam: '2025-01-22',
      nextExamTime: '14:00-16:00',
      room: 'B105',
      status: 'Actif'
    },
    {
      id: 3,
      name: 'Analyse Numérique',
      code: 'NUM401',
      students: 32,
      credits: 5,
      semester: 'S7',
      nextExam: '2025-01-28',
      nextExamTime: '10:00-12:00',
      room: 'C302',
      status: 'Actif'
    }
  ]);

  const totalStudents = modules.reduce((sum, module) => sum + module.students, 0);
  const totalCredits = modules.reduce((sum, module) => sum + module.credits, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Mes Modules</h2>
        <p className="text-muted-foreground">
          Gestion de vos modules d'enseignement
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modules enseignés</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{modules.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total étudiants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total crédits</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCredits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Examens à venir</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des modules</CardTitle>
          <CardDescription>
            Modules que vous enseignez ce semestre
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Étudiants</TableHead>
                <TableHead>Crédits</TableHead>
                <TableHead>Semestre</TableHead>
                <TableHead>Prochain examen</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modules.map((module) => (
                <TableRow key={module.id}>
                  <TableCell className="font-medium">{module.name}</TableCell>
                  <TableCell>{module.code}</TableCell>
                  <TableCell>{module.students}</TableCell>
                  <TableCell>{module.credits}</TableCell>
                  <TableCell>{module.semester}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(module.nextExam).toLocaleDateString('fr-FR')}</div>
                      <div className="text-muted-foreground">{module.nextExamTime} - {module.room}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {module.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Noter
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-1" />
                        Détails
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

export default MyModules;
