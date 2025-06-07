
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash } from 'lucide-react';

const UsersManagement = () => {
  const users = [
    { id: 1, name: 'Dr. Ahmed Bennani', email: 'directeur@esrmi.ma', role: 'Directeur Pédagogique', status: 'Actif' },
    { id: 2, name: 'Prof. Fatima Alami', email: 'enseignant@esrmi.ma', role: 'Enseignant', status: 'Actif' },
    { id: 3, name: 'Youssef El Mansouri', email: 'etudiant@esrmi.ma', role: 'Étudiant', status: 'Actif' },
    { id: 4, name: 'Hassan Admin', email: 'admin@esrmi.ma', role: 'Administrateur', status: 'Actif' },
    { id: 5, name: 'Salma Berrada', email: 'salma.berrada@esrmi.ma', role: 'Enseignant', status: 'Inactif' }
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'Directeur Pédagogique': return 'bg-purple-100 text-purple-800';
      case 'Enseignant': return 'bg-blue-100 text-blue-800';
      case 'Étudiant': return 'bg-green-100 text-green-800';
      case 'Administrateur': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Utilisateurs</h2>
          <p className="text-muted-foreground">
            Gérer les comptes utilisateurs et leurs rôles
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un utilisateur
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des utilisateurs</CardTitle>
          <CardDescription>
            {users.length} comptes utilisateurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
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

export default UsersManagement;
