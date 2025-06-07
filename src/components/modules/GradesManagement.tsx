
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const GradesManagement = () => {
  const [selectedModule, setSelectedModule] = useState('');
  const { toast } = useToast();

  const modules = [
    'Mathématiques Avancées',
    'Statistiques',
    'Analyse Numérique'
  ];

  const students = [
    { id: 1, name: 'Ahmed Benali', currentGrade: '16', newGrade: '' },
    { id: 2, name: 'Fatima Zohra', currentGrade: '', newGrade: '' },
    { id: 3, name: 'Youssef El Mansouri', currentGrade: '14', newGrade: '' },
    { id: 4, name: 'Aicha Berrada', currentGrade: '', newGrade: '' },
    { id: 5, name: 'Omar Idrissi', currentGrade: '18', newGrade: '' }
  ];

  const [grades, setGrades] = useState(
    students.reduce((acc, student) => {
      acc[student.id] = student.currentGrade;
      return acc;
    }, {})
  );

  const handleGradeChange = (studentId, grade) => {
    setGrades(prev => ({
      ...prev,
      [studentId]: grade
    }));
  };

  const handleSaveGrades = () => {
    toast({
      title: "Notes sauvegardées",
      description: "Les notes ont été mises à jour avec succès",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Saisie des Notes</h2>
        <p className="text-muted-foreground">
          Entrer et modifier les notes des étudiants
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sélection du module</CardTitle>
          <CardDescription>
            Choisissez le module pour saisir les notes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedModule} onValueChange={setSelectedModule}>
            <SelectTrigger className="w-full max-w-sm">
              <SelectValue placeholder="Sélectionner un module" />
            </SelectTrigger>
            <SelectContent>
              {modules.map((module) => (
                <SelectItem key={module} value={module}>
                  {module}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedModule && (
        <Card>
          <CardHeader>
            <CardTitle>Notes - {selectedModule}</CardTitle>
            <CardDescription>
              Saisir les notes sur 20 points
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Étudiant</TableHead>
                  <TableHead>Note actuelle</TableHead>
                  <TableHead>Nouvelle note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>
                      {student.currentGrade ? (
                        <span className="font-medium">{student.currentGrade}/20</span>
                      ) : (
                        <span className="text-muted-foreground">Non noté</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        max="20"
                        step="0.5"
                        placeholder="Note sur 20"
                        value={grades[student.id] || ''}
                        onChange={(e) => handleGradeChange(student.id, e.target.value)}
                        className="w-32"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="flex justify-end mt-6">
              <Button onClick={handleSaveGrades}>
                Sauvegarder les notes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GradesManagement;
