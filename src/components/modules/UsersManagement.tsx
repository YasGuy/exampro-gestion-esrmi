
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UsersManagement = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    status: 'Actif'
  });
  const { toast } = useToast();

  const [users, setUsers] = useState([
    { id: 1, name: 'Dr. Ahmed Bennani', email: 'directeur@esrmi.ma', role: 'Directeur Pédagogique', status: 'Actif' },
    { id: 2, name: 'Prof. Fatima Alami', email: 'enseignant@esrmi.ma', role: 'Enseignant', status: 'Actif' },
    { id: 3, name: 'Youssef El Mansouri', email: 'etudiant@esrmi.ma', role: 'Étudiant', status: 'Actif' },
    { id: 4, name: 'Hassan Admin', email: 'admin@esrmi.ma', role: 'Administrateur', status: 'Actif' },
    { id: 5, name: 'Salma Berrada', email: 'salma.berrada@esrmi.ma', role: 'Enseignant', status: 'Inactif' }
  ]);

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

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    const user = {
      id: users.length + 1,
      ...newUser
    };
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: '', status: 'Actif' });
    setIsAddDialogOpen(false);
    toast({
      title: "Succès",
      description: "Utilisateur ajouté avec succès"
    });
  };

  const handleEditUser = () => {
    if (!editingUser.name || !editingUser.email || !editingUser.role) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    setIsEditDialogOpen(false);
    setEditingUser(null);
    toast({
      title: "Succès",
      description: "Utilisateur modifié avec succès"
    });
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(u => u.id !== userId));
    toast({
      title: "Succès",
      description: "Utilisateur supprimé avec succès"
    });
  };

  const openEditDialog = (user) => {
    setEditingUser({ ...user });
    setIsEditDialogOpen(true);
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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
              <DialogDescription>
                Remplissez les informations de l'utilisateur
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Nom complet"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              />
              <Input
                placeholder="Email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              />
              <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Directeur Pédagogique">Directeur Pédagogique</SelectItem>
                  <SelectItem value="Enseignant">Enseignant</SelectItem>
                  <SelectItem value="Étudiant">Étudiant</SelectItem>
                  <SelectItem value="Administrateur">Administrateur</SelectItem>
                </SelectContent>
              </Select>
              <Select value={newUser.status} onValueChange={(value) => setNewUser({...newUser, status: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Inactif">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddUser}>
                Ajouter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user.id)}>
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l'utilisateur
            </DialogDescription>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4">
              <Input
                placeholder="Nom complet"
                value={editingUser.name}
                onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
              />
              <Input
                placeholder="Email"
                type="email"
                value={editingUser.email}
                onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
              />
              <Select value={editingUser.role} onValueChange={(value) => setEditingUser({...editingUser, role: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Directeur Pédagogique">Directeur Pédagogique</SelectItem>
                  <SelectItem value="Enseignant">Enseignant</SelectItem>
                  <SelectItem value="Étudiant">Étudiant</SelectItem>
                  <SelectItem value="Administrateur">Administrateur</SelectItem>
                </SelectContent>
              </Select>
              <Select value={editingUser.status} onValueChange={(value) => setEditingUser({...editingUser, status: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Inactif">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditUser}>
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersManagement;
