
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, MapPin, Users, Monitor } from 'lucide-react';

const SallesManagement = () => {
  const [salles, setSalles] = useState([
    { id: 1, name: 'Amphithéâtre A', type: 'Amphithéâtre', capacity: 200, equipment: ['Projecteur', 'Micro'], building: 'Bâtiment A', floor: 'RDC', status: 'Disponible' },
    { id: 2, name: 'Salle TD 101', type: 'TD', capacity: 30, equipment: ['Tableau'], building: 'Bâtiment B', floor: '1er', status: 'Occupée' },
    { id: 3, name: 'Labo Info 1', type: 'Laboratoire', capacity: 25, equipment: ['Ordinateurs', 'Projecteur'], building: 'Bâtiment C', floor: '2ème', status: 'Maintenance' },
    { id: 4, name: 'Salle Conf 201', type: 'Conférence', capacity: 50, equipment: ['Projecteur', 'Vidéoconférence'], building: 'Bâtiment A', floor: '2ème', status: 'Disponible' },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSalle, setEditingSalle] = useState(null);
  const [newSalle, setNewSalle] = useState({
    name: '',
    type: '',
    capacity: '',
    equipment: [],
    building: '',
    floor: '',
    status: 'Disponible'
  });

  const { toast } = useToast();

  const handleAddSalle = () => {
    if (!newSalle.name || !newSalle.type || !newSalle.capacity || !newSalle.building) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    const salle = {
      id: Date.now(),
      ...newSalle,
      capacity: parseInt(newSalle.capacity)
    };

    setSalles([...salles, salle]);
    setNewSalle({ name: '', type: '', capacity: '', equipment: [], building: '', floor: '', status: 'Disponible' });
    setIsDialogOpen(false);
    toast({
      title: "Succès",
      description: "Salle ajoutée avec succès"
    });
  };

  const handleEditSalle = () => {
    setSalles(salles.map(s => s.id === editingSalle.id ? { ...editingSalle, capacity: parseInt(editingSalle.capacity) } : s));
    setEditingSalle(null);
    setIsDialogOpen(false);
    toast({
      title: "Succès",
      description: "Salle modifiée avec succès"
    });
  };

  const handleDeleteSalle = (id) => {
    setSalles(salles.filter(s => s.id !== id));
    toast({
      title: "Succès",
      description: "Salle supprimée avec succès"
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'Occupée': return 'bg-red-100 text-red-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const equipmentOptions = ['Projecteur', 'Micro', 'Tableau', 'Ordinateurs', 'Vidéoconférence', 'Climatisation'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Salles</h2>
          <p className="text-muted-foreground">Gérer les salles de classe et équipements</p>
        </div>
        <Button onClick={() => { setEditingSalle(null); setIsDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une Salle
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Salles</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salles.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salles Disponibles</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salles.filter(s => s.status === 'Disponible').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacité Totale</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salles.reduce((sum, s) => sum + s.capacity, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Maintenance</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salles.filter(s => s.status === 'Maintenance').length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Salles</CardTitle>
          <CardDescription>Gérer toutes les salles de l'établissement</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capacité</TableHead>
                <TableHead>Bâtiment</TableHead>
                <TableHead>Étage</TableHead>
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
                  <TableCell>{salle.building}</TableCell>
                  <TableCell>{salle.floor}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {salle.equipment.map((eq, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {eq}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(salle.status)}>
                      {salle.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => { setEditingSalle(salle); setIsDialogOpen(true); }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteSalle(salle.id)}
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingSalle ? 'Modifier la Salle' : 'Ajouter une Salle'}</DialogTitle>
            <DialogDescription>
              Remplissez les informations de la salle
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Nom de la salle"
              value={editingSalle ? editingSalle.name : newSalle.name}
              onChange={(e) => editingSalle 
                ? setEditingSalle({...editingSalle, name: e.target.value})
                : setNewSalle({...newSalle, name: e.target.value})
              }
            />
            <Select 
              value={editingSalle ? editingSalle.type : newSalle.type} 
              onValueChange={(value) => editingSalle 
                ? setEditingSalle({...editingSalle, type: value})
                : setNewSalle({...newSalle, type: value})
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Type de salle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Amphithéâtre">Amphithéâtre</SelectItem>
                <SelectItem value="TD">TD</SelectItem>
                <SelectItem value="TP">TP</SelectItem>
                <SelectItem value="Laboratoire">Laboratoire</SelectItem>
                <SelectItem value="Conférence">Conférence</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Capacité"
              type="number"
              value={editingSalle ? editingSalle.capacity : newSalle.capacity}
              onChange={(e) => editingSalle 
                ? setEditingSalle({...editingSalle, capacity: e.target.value})
                : setNewSalle({...newSalle, capacity: e.target.value})
              }
            />
            <Input
              placeholder="Bâtiment"
              value={editingSalle ? editingSalle.building : newSalle.building}
              onChange={(e) => editingSalle 
                ? setEditingSalle({...editingSalle, building: e.target.value})
                : setNewSalle({...newSalle, building: e.target.value})
              }
            />
            <Input
              placeholder="Étage"
              value={editingSalle ? editingSalle.floor : newSalle.floor}
              onChange={(e) => editingSalle 
                ? setEditingSalle({...editingSalle, floor: e.target.value})
                : setNewSalle({...newSalle, floor: e.target.value})
              }
            />
            <Select 
              value={editingSalle ? editingSalle.status : newSalle.status} 
              onValueChange={(value) => editingSalle 
                ? setEditingSalle({...editingSalle, status: value})
                : setNewSalle({...newSalle, status: value})
              }
            >
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={editingSalle ? handleEditSalle : handleAddSalle}>
              {editingSalle ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SallesManagement;
