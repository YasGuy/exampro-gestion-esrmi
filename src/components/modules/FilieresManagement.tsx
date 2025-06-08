
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { filiereService, Filiere } from '@/services/filiereService';

const FilieresManagement = () => {
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingFiliere, setEditingFiliere] = useState<Filiere | null>(null);
  const [loading, setLoading] = useState(true);
  const [newFiliere, setNewFiliere] = useState({
    name: '',
    code: '',
    description: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchFilieres();
  }, []);

  const fetchFilieres = async () => {
    try {
      const data = await filiereService.getAll();
      setFilieres(data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les filières",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddFiliere = async () => {
    if (!newFiliere.name || !newFiliere.code) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir le nom et le code de la filière",
        variant: "destructive"
      });
      return;
    }

    try {
      await filiereService.create(newFiliere);
      toast({
        title: "Succès",
        description: "Filière créée avec succès"
      });
      setNewFiliere({ name: '', code: '', description: '' });
      setIsAddDialogOpen(false);
      fetchFilieres();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la création de la filière",
        variant: "destructive"
      });
    }
  };

  const handleEditFiliere = async () => {
    if (!editingFiliere) return;

    try {
      await filiereService.update(editingFiliere.id, editingFiliere);
      toast({
        title: "Succès",
        description: "Filière modifiée avec succès"
      });
      setIsEditDialogOpen(false);
      setEditingFiliere(null);
      fetchFilieres();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la modification de la filière",
        variant: "destructive"
      });
    }
  };

  const handleDeleteFiliere = async (id: number) => {
    try {
      await filiereService.delete(id);
      toast({
        title: "Succès",
        description: "Filière supprimée avec succès"
      });
      fetchFilieres();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression de la filière",
        variant: "destructive"
      });
    }
  };

  const openEditDialog = (filiere: Filiere) => {
    setEditingFiliere({ ...filiere });
    setIsEditDialogOpen(true);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Filières</h2>
          <p className="text-muted-foreground">
            Gérer les filières d'études et leurs programmes
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une filière
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle filière</DialogTitle>
              <DialogDescription>
                Remplissez les informations de la filière
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Nom de la filière"
                value={newFiliere.name}
                onChange={(e) => setNewFiliere({...newFiliere, name: e.target.value})}
              />
              <Input
                placeholder="Code de la filière (ex: GI, MG, COM)"
                value={newFiliere.code}
                onChange={(e) => setNewFiliere({...newFiliere, code: e.target.value.toUpperCase()})}
              />
              <Textarea
                placeholder="Description de la filière"
                value={newFiliere.description}
                onChange={(e) => setNewFiliere({...newFiliere, description: e.target.value})}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddFiliere}>
                Ajouter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des filières</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filieres.length}</div>
            <p className="text-xs text-muted-foreground">
              Programmes d'études actifs
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des filières</CardTitle>
          <CardDescription>
            {filieres.length} filières enregistrées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date de création</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filieres.map((filiere) => (
                <TableRow key={filiere.id}>
                  <TableCell className="font-medium">{filiere.name}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {filiere.code}
                    </span>
                  </TableCell>
                  <TableCell>{filiere.description || 'Aucune description'}</TableCell>
                  <TableCell>{new Date(filiere.created_at).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(filiere)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteFiliere(filiere.id)}>
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
            <DialogTitle>Modifier la filière</DialogTitle>
            <DialogDescription>
              Modifiez les informations de la filière
            </DialogDescription>
          </DialogHeader>
          {editingFiliere && (
            <div className="space-y-4">
              <Input
                placeholder="Nom de la filière"
                value={editingFiliere.name}
                onChange={(e) => setEditingFiliere({...editingFiliere, name: e.target.value})}
              />
              <Input
                placeholder="Code de la filière"
                value={editingFiliere.code}
                onChange={(e) => setEditingFiliere({...editingFiliere, code: e.target.value.toUpperCase()})}
              />
              <Textarea
                placeholder="Description de la filière"
                value={editingFiliere.description || ''}
                onChange={(e) => setEditingFiliere({...editingFiliere, description: e.target.value})}
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditFiliere}>
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FilieresManagement;
