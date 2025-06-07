
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TeachersManagement = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    department: '',
    modules: []
  });
  const { toast } = useToast();

  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Dr. Mohamed Alami', email: 'mohamed.alami@esrmi.ma', department: 'Informatique', modules: ['Programmation Web', 'Base de Données'] },
    { id: 2, name: 'Prof. Fatima Bennani', email: 'fatima.bennani@esrmi.ma', department: 'Mathématiques', modules: ['Mathématiques Avancées', 'Statistiques'] },
    { id: 3, name: 'Dr. Hassan El Idrissi', email: 'hassan.elidrissi@esrmi.ma', department: 'Management', modules: ['Gestion de Projet', 'Marketing'] }
  ]);

  const availableModules = ['Programmation Web', 'Base de Données', 'Mathématiques Avancées', 'Statistiques', 'Gestion de Projet', 'Marketing', 'Réseaux', 'Algorithmique'];

  const handleAddTeacher = () => {
    if (!newTeacher.name || !newTeacher.email || !newTeacher.department) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    const teacher = {
      id: teachers.length + 1,
      ...newTeacher
    };
    setTeachers([...teachers, teacher]);
    setNewTeacher({ name: '', email: '', department: '', modules: [] });
    setIsAddDialogOpen(false);
    toast({
      title: "Succès",
      description: "Enseignant ajouté avec succès"
    });
  };

  const handleEditTeacher = () => {
    if (!editingTeacher.name || !editingTeacher.email || !editingTeacher.department) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    setTeachers(teachers.map(t => t.id === editingTeacher.id ? editingTeacher : t));
    setIsEditDialogOpen(false);
    setEditingTeacher(null);
    toast({
      title: "Succès",
      description: "Enseignant modifié avec succès"
    });
  };

  const handleDeleteTeacher = (teacherId) => {
    setTeachers(teachers.filter(t => t.id !== teacherId));
    toast({
      title: "Succès",
      description: "Enseignant supprimé avec succès"
    });
  };

  const openEditDialog = (teacher) => {
    setEditingTeacher({ ...teacher });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Enseignants</h2>
          <p className="text-muted-foreground">
            Gérer le corps professoral et leurs affectations
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un enseignant
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel enseignant</DialogTitle>
              <DialogDescription>
                Remplissez les informations de l'enseignant
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Nom complet"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
              />
              <Input
                placeholder="Email"
                type="email"
                value={newTeacher.email}
                onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
              />
              <Select value={newTeacher.department} onValueChange={(value) => setNewTeacher({...newTeacher, department: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un département" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Informatique">Informatique</SelectItem>
                  <SelectItem value="Mathématiques">Mathématiques</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="Commerce">Commerce</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddTeacher}>
                Ajouter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des enseignants</CardTitle>
          <CardDescription>
            {teachers.length} enseignants actifs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Modules assignés</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.department}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {teacher.modules.map((module, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {module}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(teacher)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteTeacher(teacher.id)}>
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
            <DialogTitle>Modifier l'enseignant</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l'enseignant
            </DialogDescription>
          </DialogHeader>
          {editingTeacher && (
            <div className="space-y-4">
              <Input
                placeholder="Nom complet"
                value={editingTeacher.name}
                onChange={(e) => setEditingTeacher({...editingTeacher, name: e.target.value})}
              />
              <Input
                placeholder="Email"
                type="email"
                value={editingTeacher.email}
                onChange={(e) => setEditingTeacher({...editingTeacher, email: e.target.value})}
              />
              <Select value={editingTeacher.department} onValueChange={(value) => setEditingTeacher({...editingTeacher, department: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un département" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Informatique">Informatique</SelectItem>
                  <SelectItem value="Mathématiques">Mathématiques</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="Commerce">Commerce</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditTeacher}>
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeachersManagement;
