
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, TrendingUp, Award, BookOpen } from 'lucide-react';

const MyGrades = ({ user }) => {
  const [grades] = useState([
    {
      id: 1,
      module: 'Programmation Web',
      code: 'WEB301',
      credits: 6,
      grade: 16,
      maxGrade: 20,
      examType: 'Examen Final',
      date: '2025-01-10',
      semester: 'S5',
      status: 'Validé'
    },
    {
      id: 2,
      module: 'Réseaux',
      code: 'NET202',
      credits: 4,
      grade: 14,
      maxGrade: 20,
      examType: 'Contrôle Continu',
      date: '2025-01-08',
      semester: 'S5',
      status: 'Validé'
    },
    {
      id: 3,
      module: 'Algorithmique',
      code: 'ALGO401',
      credits: 5,
      grade: 18,
      maxGrade: 20,
      examType: 'Projet',
      date: '2025-01-05',
      semester: 'S5',
      status: 'Validé'
    },
    {
      id: 4,
      module: 'Base de Données',
      code: 'DB301',
      credits: 5,
      grade: 12,
      maxGrade: 20,
      examType: 'Examen Final',
      date: '2024-12-20',
      semester: 'S4',
      status: 'Validé'
    },
    {
      id: 5,
      module: 'Mathématiques',
      code: 'MATH201',
      credits: 6,
      grade: null,
      maxGrade: 20,
      examType: 'En attente',
      date: null,
      semester: 'S5',
      status: 'En cours'
    }
  ]);

  const validatedGrades = grades.filter(g => g.grade !== null);
  const totalCredits = validatedGrades.reduce((sum, grade) => sum + grade.credits, 0);
  const weightedSum = validatedGrades.reduce((sum, grade) => sum + (grade.grade * grade.credits), 0);
  const averageGrade = totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : 0;
  const averageGradeNumber = Number(averageGrade);
  const validatedModules = validatedGrades.length;

  const getGradeColor = (grade) => {
    if (grade >= 16) return 'text-green-600';
    if (grade >= 12) return 'text-blue-600';
    if (grade >= 10) return 'text-orange-600';
    return 'text-red-600';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Validé': return 'bg-green-100 text-green-800 border-green-200';
      case 'En cours': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Échec': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Mes Notes</h2>
        <p className="text-muted-foreground">
          Consulter vos résultats académiques
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moyenne générale</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageGrade}/20</div>
            <p className="text-xs text-muted-foreground">
              Sur {totalCredits} crédits
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modules validés</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{validatedModules}</div>
            <p className="text-xs text-muted-foreground">
              Sur {grades.length} modules
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crédits obtenus</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCredits}</div>
            <p className="text-xs text-muted-foreground">
              Crédits ECTS
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mention</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {averageGradeNumber >= 16 ? 'Très Bien' : 
               averageGradeNumber >= 14 ? 'Bien' : 
               averageGradeNumber >= 12 ? 'Assez Bien' : 
               averageGradeNumber >= 10 ? 'Passable' : 'Insuffisant'}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Détail des notes</CardTitle>
              <CardDescription>
                Historique de vos résultats par module
              </CardDescription>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Télécharger le relevé
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Crédits</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Type d'évaluation</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Semestre</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell className="font-medium">{grade.module}</TableCell>
                  <TableCell>{grade.code}</TableCell>
                  <TableCell>{grade.credits}</TableCell>
                  <TableCell>
                    {grade.grade ? (
                      <span className={`font-bold ${getGradeColor(grade.grade)}`}>
                        {grade.grade}/{grade.maxGrade}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">En attente</span>
                    )}
                  </TableCell>
                  <TableCell>{grade.examType}</TableCell>
                  <TableCell>
                    {grade.date ? new Date(grade.date).toLocaleDateString('fr-FR') : '-'}
                  </TableCell>
                  <TableCell>{grade.semester}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(grade.status)}>
                      {grade.status}
                    </Badge>
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

export default MyGrades;
