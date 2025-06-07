
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash } from 'lucide-react';

const StudentsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const students = [
    { id: 1, name: 'Ahmed Benali', email: 'ahmed.benali@esrmi.ma', filiere: 'Génie Informatique', group: 'GI-2A' },
    { id: 2, name: 'Fatima Zohra', email: 'fatima.zohra@esrmi.ma', filiere: 'Management', group: 'MG-1B' },
    { id: 3, name: 'Youssef El Mansouri', email: 'youssef.elmansouri@esrmi.ma', filiere: 'Génie Informatique', group: 'GI-3A' },
    { id: 4, name: 'Aicha Berrada', email: 'aicha.berrada@esrmi.ma', filiere: 'Management', group: 'MG-2A' }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Étudiants</h2>
          <p className="text-muted-foreground">
            Gérer les étudiants et leurs affectations
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un étudiant
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des étudiants</CardTitle>
          <CardDescription>
            {students.length} étudiants inscrits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un étudiant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Filière</TableHead>
                <TableHead>Groupe</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.filiere}</TableCell>
                  <TableCell>{student.group}</TableCell>
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

export default StudentsManagement;
