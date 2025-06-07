
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, GraduationCap, Users, BookOpen, Award } from 'lucide-react';

const FilieresManagement = () => {
  const [filieres, setFilieres] = useState([
    { 
      id: 1, 
      name: 'Génie Informatique', 
      code: 'GI', 
      diplome: 'Ingénieur d\'État',
      duree: 5,
      coordinateur: 'Dr. Mohamed Alami',
      etudiants: 85,
      modules: 32,
      description: 'Formation complète en informatique et technologies de l\'information',
      status: 'Active'
    },
    { 
      id: 2, 
      name: 'Management', 
      code: 'MNG', 
      diplome: 'Master',
      duree: 2,
      coordinateur: 'Prof. Fatima Bennani',
      etudiants: 67,
      modules: 24,
      description: 'Spécialisation en gestion d\'entreprise et management stratégique',
      status: 'Active'
    },
    { 
      id: 3, 
      name: 'Commerce International', 
      code: 'CI', 
      diplome: 'Licence Professionnelle',
      duree: 3,
      coordinateur: 'Dr. Hassan El Idrissi',
      etudiants: 93,
      modules: 28,
      description: 'Formation en commerce international et relations d\'affaires',
      status: 'Active'
    },
    { 
      id: 4, 
      name: 'Génie Civil', 
      code: 'GC', 
      diplome: 'Ingénieur d\'État',
      duree: 5,
      coordinateur: 'Ing. Ahmed Benmoussa',
      etudiants: 0,
      modules: 35,
      description: 'Formation en ingénierie civile et construction',
      status: 'En Préparation'
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFiliere, setEditingFiliere] = useState(null);
  const [newFiliere, setNewFiliere] = useState({
    name: '',
    code: '',
    diplome: '',
    duree: '',
    coordinateur: '',
    description: '',
    status: 'Active'
  });

  const { toast } = useToast();

  const handleAddFiliere = () => {
    if (!newFiliere.name || !newFiliere.code || !newFiliere.diplome || !newFiliere.duree || !newFiliere.coordinateur) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    const filiere = {
      id: Date.now(),
      ...newFiliere,
      duree: parseInt(newFiliere.duree),
      etudiants: 0,
      modules: 0
    };

    setFilieres([...filieres, filiere]);
    setNewFiliere({ name: '', code: '', diplome: '', duree: '', coordinateur: '', description: '', status: 'Active' });
    setIsDialogOpen(false);
    toast({
      title: "Succès",
      description: "Filière ajoutée avec succès"
    });
  };

  const handleEditFiliere = () => {
    setFilieres(filieres.map(f => f.id === editingFiliere.id ? { ...editingFiliere, duree: parseInt(editingFiliere.duree) } : f));
    setEditingFiliere(null);
    setIsDialogOpen(false);
    toast({
      title: "Succès",
      description: "Filière modifiée avec succès"
    });
  };

  const handleDeleteFiliere = (id) => {
    setFilieres(filieres.filter(f => f.id !== id));
    toast({
      title: "Succès",
      description: "Filière supprimée avec succès"
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'En Préparation': return 'bg-yellow-100 text-yellow-800';
      case 'Suspendue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalEtudiants = filieres.reduce((sum, f) => sum + f.etudiants, 0);
  const filieresActives = filieres.filter(f => f.status === 'Active').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Filières</h2>
          <p className="text-muted-foreground">Gérer les filières et programmes d'études</p>
        </div>
        <Button onClick={() => { setEditingFiliere(null); setIsDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une Filière
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Filières</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filieres.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Filières Actives</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filieresActives}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Étudiants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEtudiants}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modules Totaux</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filieres.reduce((sum, f) => sum + f.modules, 0)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Filières</CardTitle>
          <CardDescription>Gérer toutes les filières de l'établissement</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Diplôme</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead>Coordinateur</TableHead>
                <TableHead>Étudiants</TableHead>
                <TableHead>Modules</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filieres.map((filiere) => (
                <TableRow key={filiere.id}>
                  <TableCell className="font-medium">{filiere.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{filiere.code}</Badge>
                  </TableCell>
                  <TableCell>{filiere.diplome}</TableCell>
                  <TableCell>{filiere.duree} ans</TableCell>
                  <TableCell>{filiere.coordinateur}</TableCell>
                  <TableCell>{filiere.etudiants}</TableCell>
                  <TableCell>{filiere.modules}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(filiere.status)}>
                      {filiere.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => { setEditingFiliere(filiere); setIsDialogOpen(true); }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteFiliere(filiere.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingFiliere ? 'Modifier la Filière' : 'Ajouter une Filière'}</DialogTitle>
            <DialogDescription>
              Remplissez les informations de la filière
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Nom de la filière"
              value={editingFiliere ? editingFiliere.name : newFiliere.name}
              onChange={(e) => editingFiliere 
                ? setEditingFiliere({...editingFiliere, name: e.target.value})
                : setNewFiliere({...newFiliere, name: e.target.value})
              }
            />
            <Input
              placeholder="Code (ex: GI)"
              value={editingFiliere ? editingFiliere.code : newFiliere.code}
              onChange={(e) => editingFiliere 
                ? setEditingFiliere({...editingFiliere, code: e.target.value})
                : setNewFiliere({...newFiliere, code: e.target.value})
              }
            />
            <Select 
              value={editingFiliere ? editingFiliere.diplome : newFiliere.diplome} 
              onValueChange={(value) => editingFiliere 
                ? setEditingFiliere({...editingFiliere, diplome: value})
                : setNewFiliere({...newFiliere, diplome: value})
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Type de diplôme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Licence">Licence</SelectItem>
                <SelectItem value="Licence Professionnelle">Licence Professionnelle</SelectItem>
                <SelectItem value="Master">Master</SelectItem>
                <SelectItem value="Ingénieur d'État">Ingénieur d'État</SelectItem>
                <SelectItem value="Doctorat">Doctorat</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Durée (en années)"
              type="number"
              value={editingFiliere ? editingFiliere.duree : newFiliere.duree}
              onChange={(e) => editingFiliere 
                ? setEditingFiliere({...editingFiliere, duree: e.target.value})
                : setNewFiliere({...newFiliere, duree: e.target.value})
              }
            />
            <Input
              placeholder="Coordinateur"
              value={editingFiliere ? editingFiliere.coordinateur : newFiliere.coordinateur}
              onChange={(e) => editingFiliere 
                ? setEditingFiliere({...editingFiliere, coordinateur: e.target.value})
                : setNewFiliere({...newFiliere, coordinateur: e.target.value})
              }
            />
            <Textarea
              placeholder="Description de la filière"
              value={editingFiliere ? editingFiliere.description : newFiliere.description}
              onChange={(e) => editingFiliere 
                ? setEditingFiliere({...editingFiliere, description: e.target.value})
                : setNewFiliere({...newFiliere, description: e.target.value})
              }
            />
            <Select 
              value={editingFiliere ? editingFiliere.status : newFiliere.status} 
              onValueChange={(value) => editingFiliere 
                ? setEditingFiliere({...editingFiliere, status: value})
                : setNewFiliere({...newFiliere, status: value})
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="En Préparation">En Préparation</SelectItem>
                <SelectItem value="Suspendue">Suspendue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={editingFiliere ? handleEditFiliere : handleAddFiliere}>
              {editingFiliere ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FilieresManagement;
