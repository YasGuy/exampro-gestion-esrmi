
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ModulesManagement = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [newModule, setNewModule] = useState({
    name: '',
    code: '',
    teacher: '',
    credits: '',
    semester: ''
  });
  const { toast } = useToast();

  const [modules, setModules] = useState([
    { id: 1, name: 'Programmation Web', code: 'INFO301', teacher: 'Dr. Mohamed Alami', credits: 6, semester: 'S3' },
    { id: 2, name: 'Mathématiques Avancées', code: 'MATH201', teacher: 'Prof. Fatima Bennani', credits: 4, semester: 'S2' },
    { id: 3, name: 'Gestion de Projet', code: 'MGT401', teacher: 'Dr. Hassan El Idrissi', credits: 5, semester: 'S4' },
    { id: 4, name: 'Base de Données', code: 'INFO202', teacher: 'Dr. Mohamed Alami', credits: 5, semester: 'S2' }
  ]);

  const availableTeachers = ['Dr. Mohamed Alami', 'Prof. Fatima Bennani', 'Dr. Hassan El Idrissi', 'Dr. Salma Berrada'];

  const handleAddModule = () => {
    if (!newModule.name || !newModule.code || !newModule.teacher || !newModule.credits || !newModule.semester) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    const module = {
      id: modules.length + 1,
      ...newModule,
      credits: parseInt(newModule.credits)
    };
    setModules([...modules, module]);
    setNewModule({ name: '', code: '', teacher: '', credits: '', semester: '' });
    setIsAddDialogOpen(false);
    toast({
      title: "Succès",
      description: "Module ajouté avec succès"
    });
  };

  const handleEditModule = () => {
    if (!editingModule.name || !editingModule.code || !editingModule.teacher || !editingModule.credits || !editingModule.semester) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    const updatedModule = {
      ...editingModule,
      credits: parseInt(editingModule.credits)
    };
    setModules(modules.map(m => m.id === editingModule.id ? updatedModule : m));
    setIsEditDialogOpen(false);
    setEditingModule(null);
    toast({
      title: "Succès",
      description: "Module modifié avec succès"
    });
  };

  const handleDeleteModule = (moduleId) => {
    setModules(modules.filter(m => m.id !== moduleId));
    toast({
      title: "Succès",
      description: "Module supprimé avec succès"
    });
  };

  const openEditDialog = (module) => {
    setEditingModule({ ...module, credits: module.credits.toString() });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Modules</h2>
          <p className="text-muted-foreground">
            Gérer les modules et leurs affectations
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un module
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau module</DialogTitle>
              <DialogDescription>
                Remplissez les informations du module
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Nom du module"
                value={newModule.name}
                onChange={(e) => setNewModule({...newModule, name: e.target.value})}
              />
              <Input
                placeholder="Code du module (ex: INFO301)"
                value={newModule.code}
                onChange={(e) => setNewModule({...newModule, code: e.target.value})}
              />
              <Select value={newModule.teacher} onValueChange={(value) => setNewModule({...newModule, teacher: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un enseignant" />
                </SelectTrigger>
                <SelectContent>
                  {availableTeachers.map((teacher) => (
                    <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Nombre de crédits"
                type="number"
                value={newModule.credits}
                onChange={(e) => setNewModule({...newModule, credits: e.target.value})}
              />
              <Select value={newModule.semester} onValueChange={(value) => setNewModule({...newModule, semester: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un semestre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S1">S1</SelectItem>
                  <SelectItem value="S2">S2</SelectItem>
                  <SelectItem value="S3">S3</SelectItem>
                  <SelectItem value="S4">S4</SelectItem>
                  <SelectItem value="S5">S5</SelectItem>
                  <SelectItem value="S6">S6</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddModule}>
                Ajouter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(module)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteModule(module.id)}>
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
            <DialogTitle>Modifier le module</DialogTitle>
            <DialogDescription>
              Modifiez les informations du module
            </DialogDescription>
          </DialogHeader>
          {editingModule && (
            <div className="space-y-4">
              <Input
                placeholder="Nom du module"
                value={editingModule.name}
                onChange={(e) => setEditingModule({...editingModule, name: e.target.value})}
              />
              <Input
                placeholder="Code du module (ex: INFO301)"
                value={editingModule.code}
                onChange={(e) => setEditingModule({...editingModule, code: e.target.value})}
              />
              <Select value={editingModule.teacher} onValueChange={(value) => setEditingModule({...editingModule, teacher: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un enseignant" />
                </SelectTrigger>
                <SelectContent>
                  {availableTeachers.map((teacher) => (
                    <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Nombre de crédits"
                type="number"
                value={editingModule.credits}
                onChange={(e) => setEditingModule({...editingModule, credits: e.target.value})}
              />
              <Select value={editingModule.semester} onValueChange={(value) => setEditingModule({...editingModule, semester: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un semestre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S1">S1</SelectItem>
                  <SelectItem value="S2">S2</SelectItem>
                  <SelectItem value="S3">S3</SelectItem>
                  <SelectItem value="S4">S4</SelectItem>
                  <SelectItem value="S5">S5</SelectItem>
                  <SelectItem value="S6">S6</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditModule}>
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModulesManagement;
