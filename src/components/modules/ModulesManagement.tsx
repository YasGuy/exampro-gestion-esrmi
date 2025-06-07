
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash } from 'lucide-react';

const ModulesManagement = () => {
  const modules = [
    { id: 1, name: 'Programmation Web', code: 'INFO301', teacher: 'Dr. Mohamed Alami', credits: 6, semester: 'S3' },
    { id: 2, name: 'Mathématiques Avancées', code: 'MATH201', teacher: 'Prof. Fatima Bennani', credits: 4, semester: 'S2' },
    { id: 3, name: 'Gestion de Projet', code: 'MGT401', teacher: 'Dr. Hassan El Idrissi', credits: 5, semester: 'S4' },
    { id: 4, name: 'Base de Données', code: 'INFO202', teacher: 'Dr. Mohamed Alami', credits: 5, semester: 'S2' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Modules</h2>
          <p className="text-muted-foreground">
            Gérer les modules et leurs affectations
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un module
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des modules</CardTitle>
          <CardDescription>
            {modules.length} modules actifs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom du module</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Enseignant</TableHead>
                <TableHead>Crédits</TableHead>
                <TableHead>Semestre</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modules.map((module) => (
                <TableRow key={module.id}>
                  <TableCell className="font-medium">{module.name}</TableCell>
                  <TableCell>{module.code}</TableCell>
                  <TableCell>{module.teacher}</TableCell>
                  <TableCell>{module.credits}</TableCell>
                  <TableCell>{module.semester}</TableCell>
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

export default ModulesManagement;
