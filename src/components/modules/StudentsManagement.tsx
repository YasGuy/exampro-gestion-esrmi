
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StudentsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    filiere: '',
    group: ''
  });
  const { toast } = useToast();
  
  const [students, setStudents] = useState([
    { id: 1, name: 'Ahmed Benali', email: 'ahmed.benali@esrmi.ma', filiere: 'Génie Informatique', group: 'GI-2A' },
    { id: 2, name: 'Fatima Zohra', email: 'fatima.zohra@esrmi.ma', filiere: 'Management', group: 'MG-1B' },
    { id: 3, name: 'Youssef El Mansouri', email: 'youssef.elmansouri@esrmi.ma', filiere: 'Génie Informatique', group: 'GI-3A' },
    { id: 4, name: 'Aicha Berrada', email: 'aicha.berrada@esrmi.ma', filiere: 'Management', group: 'MG-2A' }
  ]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.filiere || !newStudent.group) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    const student = {
      id: students.length + 1,
      ...newStudent
    };
    setStudents([...students, student]);
    setNewStudent({ name: '', email: '', filiere: '', group: '' });
    setIsAddDialogOpen(false);
    toast({
      title: "Succès",
      description: "Étudiant ajouté avec succès"
    });
  };

  const handleEditStudent = () => {
    if (!editingStudent.name || !editingStudent.email || !editingStudent.filiere || !editingStudent.group) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    setStudents(students.map(s => s.id === editingStudent.id ? editingStudent : s));
    setIsEditDialogOpen(false);
    setEditingStudent(null);
    toast({
      title: "Succès",
      description: "Étudiant modifié avec succès"
    });
  };

  const handleDeleteStudent = (studentId) => {
    setStudents(students.filter(s => s.id !== studentId));
    toast({
      title: "Succès",
      description: "Étudiant supprimé avec succès"
    });
  };

  const openEditDialog = (student) => {
    setEditingStudent({ ...student });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Étudiants</h2>
          <p className="text-muted-foreground">
            Gérer les étudiants et leurs affectations
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un étudiant
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel étudiant</DialogTitle>
              <DialogDescription>
                Remplissez les informations de l'étudiant
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Nom complet"
                value={newStudent.name}
                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
              />
              <Input
                placeholder="Email"
                type="email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
              />
              <Select value={newStudent.filiere} onValueChange={(value) => setNewStudent({...newStudent, filiere: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une filière" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Génie Informatique">Génie Informatique</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="Commerce">Commerce</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Groupe (ex: GI-2A)"
                value={newStudent.group}
                onChange={(e) => setNewStudent({...newStudent, group: e.target.value})}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddStudent}>
                Ajouter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(student)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteStudent(student.id)}>
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
            <DialogTitle>Modifier l'étudiant</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l'étudiant
            </DialogDescription>
          </DialogHeader>
          {editingStudent && (
            <div className="space-y-4">
              <Input
                placeholder="Nom complet"
                value={editingStudent.name}
                onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
              />
              <Input
                placeholder="Email"
                type="email"
                value={editingStudent.email}
                onChange={(e) => setEditingStudent({...editingStudent, email: e.target.value})}
              />
              <Select value={editingStudent.filiere} onValueChange={(value) => setEditingStudent({...editingStudent, filiere: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une filière" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Génie Informatique">Génie Informatique</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="Commerce">Commerce</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Groupe (ex: GI-2A)"
                value={editingStudent.group}
                onChange={(e) => setEditingStudent({...editingStudent, group: e.target.value})}
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditStudent}>
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentsManagement;
