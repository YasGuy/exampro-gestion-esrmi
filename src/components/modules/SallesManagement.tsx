
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { salleService, Salle } from '@/services/salleService';

const SallesManagement = () => {
  const [salles, setSalles] = useState<Salle[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSalle, setEditingSalle] = useState<Salle | null>(null);
  const [loading, setLoading] = useState(true);
  const [newSalle, setNewSalle] = useState({
    name: '',
    capacity: '',
    type: '',
    equipment: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchSalles();
  }, []);

  const fetchSalles = async () => {
    try {
      const data = await salleService.getAll();
      setSalles(data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les salles",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddSalle = async () => {
    if (!newSalle.name || !newSalle.capacity || !newSalle.type) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    try {
      await salleService.create({
        ...newSalle,
        capacity: parseInt(newSalle.capacity)
      });
      toast({
        title: "Succès",
        description: "Salle créée avec succès"
      });
      setNewSalle({ name: '', capacity: '', type: '', equipment: '' });
      setIsAddDialogOpen(false);
      fetchSalles();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la création de la salle",
        variant: "destructive"
      });
    }
  };

  const handleEditSalle = async () => {
    if (!editingSalle) return;

    try {
      await salleService.update(editingSalle.id, editingSalle);
      toast({
        title: "Succès",
        description: "Salle modifiée avec succès"
      });
      setIsEditDialogOpen(false);
      setEditingSalle(null);
      fetchSalles();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la modification de la salle",
        variant: "destructive"
      });
    }
  };

  const handleDeleteSalle = async (id: number) => {
    try {
      await salleService.delete(id);
      toast({
        title: "Succès",
        description: "Salle supprimée avec succès"
      });
      fetchSalles();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression de la salle",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'Occupée': return 'bg-red-100 text-red-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openEditDialog = (salle: Salle) => {
    setEditingSalle({ ...salle });
    setIsEditDialogOpen(true);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Salles</h2>
          <p className="text-muted-foreground">
            Gérer les salles de classe et leurs équipements
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une salle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle salle</DialogTitle>
              <DialogDescription>
                Remplissez les informations de la salle
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Nom de la salle (ex: A201)"
                value={newSalle.name}
                onChange={(e) => setNewSalle({...newSalle, name: e.target.value})}
              />
              <Input
                placeholder="Capacité"
                type="number"
                value={newSalle.capacity}
                onChange={(e) => setNewSalle({...newSalle, capacity: e.target.value})}
              />
              <Select value={newSalle.type} onValueChange={(value) => setNewSalle({...newSalle, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Type de salle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Amphithéâtre">Amphithéâtre</SelectItem>
                  <SelectItem value="Salle de cours">Salle de cours</SelectItem>
                  <SelectItem value="Laboratoire">Laboratoire</SelectItem>
                  <SelectItem value="Salle informatique">Salle informatique</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Équipements (optionnel)"
                value={newSalle.equipment}
                onChange={(e) => setNewSalle({...newSalle, equipment: e.target.value})}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddSalle}>
                Ajouter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des salles</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salles.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salles disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {salles.filter(s => s.status === 'Disponible').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacité totale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {salles.reduce((sum, salle) => sum + salle.capacity, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des salles</CardTitle>
          <CardDescription>
            {salles.length} salles enregistrées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capacité</TableHead>
                <TableHead>Équipements</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salles.map((salle) => (
                <TableRow key={salle.id}>
                  <TableCell className="font-medium">{salle.name}</TableCell>
                  <TableCell>{salle.type}</TableCell>
                  <TableCell>{salle.capacity}</TableCell>
                  <TableCell>{salle.equipment || 'Aucun'}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(salle.status)}`}>
                      {salle.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(salle)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteSalle(salle.id)}>
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
            <DialogTitle>Modifier la salle</DialogTitle>
            <DialogDescription>
              Modifiez les informations de la salle
            </DialogDescription>
          </DialogHeader>
          {editingSalle && (
            <div className="space-y-4">
              <Input
                placeholder="Nom de la salle"
                value={editingSalle.name}
                onChange={(e) => setEditingSalle({...editingSalle, name: e.target.value})}
              />
              <Input
                placeholder="Capacité"
                type="number"
                value={editingSalle.capacity.toString()}
                onChange={(e) => setEditingSalle({...editingSalle, capacity: parseInt(e.target.value)})}
              />
              <Select value={editingSalle.type} onValueChange={(value) => setEditingSalle({...editingSalle, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Type de salle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Amphithéâtre">Amphithéâtre</SelectItem>
                  <SelectItem value="Salle de cours">Salle de cours</SelectItem>
                  <SelectItem value="Laboratoire">Laboratoire</SelectItem>
                  <SelectItem value="Salle informatique">Salle informatique</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Équipements"
                value={editingSalle.equipment || ''}
                onChange={(e) => setEditingSalle({...editingSalle, equipment: e.target.value})}
              />
              <Select value={editingSalle.status} onValueChange={(value) => setEditingSalle({...editingSalle, status: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Disponible">Disponible</SelectItem>
                  <SelectItem value="Occupée">Occupée</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditSalle}>
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SallesManagement;
