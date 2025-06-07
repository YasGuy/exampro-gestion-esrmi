
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Calendar, Edit, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ExamsManagement = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [newExam, setNewExam] = useState({
    module: '',
    date: '',
    time: '',
    room: '',
    teacher: '',
    students: '',
    status: 'En attente'
  });
  const { toast } = useToast();

  const [exams, setExams] = useState([
    { 
      id: 1, 
      module: 'Mathématiques Avancées', 
      date: '2025-01-15', 
      time: '09:00-11:00', 
      room: 'A201', 
      teacher: 'Prof. Fatima Bennani',
      students: 45,
      status: 'Programmé'
    },
    { 
      id: 2, 
      module: 'Gestion de Projet', 
      date: '2025-01-18', 
      time: '14:00-16:00', 
      room: 'B105', 
      teacher: 'Dr. Hassan El Idrissi',
      students: 38,
      status: 'Confirmé'
    },
    { 
      id: 3, 
      module: 'Base de Données', 
      date: '2025-01-22', 
      time: '10:00-12:00', 
      room: 'C302', 
      teacher: 'Dr. Mohamed Alami',
      students: 42,
      status: 'En attente'
    }
  ]);

  const availableModules = ['Mathématiques Avancées', 'Programmation Web', 'Base de Données', 'Gestion de Projet', 'Réseaux', 'Algorithmique'];
  const availableTeachers = ['Dr. Mohamed Alami', 'Prof. Fatima Bennani', 'Dr. Hassan El Idrissi'];
  const availableRooms = ['A201', 'A202', 'B105', 'B106', 'C302', 'C303'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Programmé': return 'bg-green-100 text-green-800';
      case 'Confirmé': return 'bg-blue-100 text-blue-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddExam = () => {
    if (!newExam.module || !newExam.date || !newExam.time || !newExam.room || !newExam.teacher || !newExam.students) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    const exam = {
      id: exams.length + 1,
      ...newExam,
      students: parseInt(newExam.students)
    };
    setExams([...exams, exam]);
    setNewExam({ module: '', date: '', time: '', room: '', teacher: '', students: '', status: 'En attente' });
    setIsAddDialogOpen(false);
    toast({
      title: "Succès",
      description: "Examen programmé avec succès"
    });
  };

  const handleEditExam = () => {
    if (!editingExam.module || !editingExam.date || !editingExam.time || !editingExam.room || !editingExam.teacher || !editingExam.students) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    const updatedExam = {
      ...editingExam,
      students: parseInt(editingExam.students)
    };
    setExams(exams.map(e => e.id === editingExam.id ? updatedExam : e));
    setIsEditDialogOpen(false);
    setEditingExam(null);
    toast({
      title: "Succès",
      description: "Examen modifié avec succès"
    });
  };

  const handleDeleteExam = (examId) => {
    setExams(exams.filter(e => e.id !== examId));
    toast({
      title: "Succès",
      description: "Examen supprimé avec succès"
    });
  };

  const openEditDialog = (exam) => {
    setEditingExam({ ...exam, students: exam.students.toString() });
    setIsEditDialogOpen(true);
  };

  const handleViewCalendar = () => {
    setIsCalendarOpen(true);
    toast({
      title: "Planning général",
      description: "Fonctionnalité de calendrier à implémenter"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Examens</h2>
          <p className="text-muted-foreground">
            Planifier et gérer les examens
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleViewCalendar}>
            <Calendar className="mr-2 h-4 w-4" />
            Planning général
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Programmer un examen
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Programmer un nouvel examen</DialogTitle>
                <DialogDescription>
                  Remplissez les détails de l'examen
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Select value={newExam.module} onValueChange={(value) => setNewExam({...newExam, module: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un module" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableModules.map((module) => (
                      <SelectItem key={module} value={module}>{module}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={newExam.date}
                  onChange={(e) => setNewExam({...newExam, date: e.target.value})}
                />
                <Input
                  placeholder="Horaire (ex: 09:00-11:00)"
                  value={newExam.time}
                  onChange={(e) => setNewExam({...newExam, time: e.target.value})}
                />
                <Select value={newExam.room} onValueChange={(value) => setNewExam({...newExam, room: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une salle" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRooms.map((room) => (
                      <SelectItem key={room} value={room}>{room}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={newExam.teacher} onValueChange={(value) => setNewExam({...newExam, teacher: value})}>
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
                  placeholder="Nombre d'étudiants"
                  type="number"
                  value={newExam.students}
                  onChange={(e) => setNewExam({...newExam, students: e.target.value})}
                />
                <Select value={newExam.status} onValueChange={(value) => setNewExam({...newExam, status: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="En attente">En attente</SelectItem>
                    <SelectItem value="Programmé">Programmé</SelectItem>
                    <SelectItem value="Confirmé">Confirmé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddExam}>
                  Programmer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Examens programmés</CardTitle>
          <CardDescription>
            {exams.length} examens dans le planning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Horaire</TableHead>
                <TableHead>Salle</TableHead>
                <TableHead>Enseignant</TableHead>
                <TableHead>Étudiants</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell className="font-medium">{exam.module}</TableCell>
                  <TableCell>{new Date(exam.date).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>{exam.time}</TableCell>
                  <TableCell>{exam.room}</TableCell>
                  <TableCell>{exam.teacher}</TableCell>
                  <TableCell>{exam.students}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                      {exam.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(exam)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteExam(exam.id)}>
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
            <DialogTitle>Modifier l'examen</DialogTitle>
            <DialogDescription>
              Modifiez les détails de l'examen
            </DialogDescription>
          </DialogHeader>
          {editingExam && (
            <div className="space-y-4">
              <Select value={editingExam.module} onValueChange={(value) => setEditingExam({...editingExam, module: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un module" />
                </SelectTrigger>
                <SelectContent>
                  {availableModules.map((module) => (
                    <SelectItem key={module} value={module}>{module}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={editingExam.date}
                onChange={(e) => setEditingExam({...editingExam, date: e.target.value})}
              />
              <Input
                placeholder="Horaire (ex: 09:00-11:00)"
                value={editingExam.time}
                onChange={(e) => setEditingExam({...editingExam, time: e.target.value})}
              />
              <Select value={editingExam.room} onValueChange={(value) => setEditingExam({...editingExam, room: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une salle" />
                </SelectTrigger>
                <SelectContent>
                  {availableRooms.map((room) => (
                    <SelectItem key={room} value={room}>{room}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={editingExam.teacher} onValueChange={(value) => setEditingExam({...editingExam, teacher: value})}>
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
                placeholder="Nombre d'étudiants"
                type="number"
                value={editingExam.students}
                onChange={(e) => setEditingExam({...editingExam, students: e.target.value})}
              />
              <Select value={editingExam.status} onValueChange={(value) => setEditingExam({...editingExam, status: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="Programmé">Programmé</SelectItem>
                  <SelectItem value="Confirmé">Confirmé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditExam}>
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamsManagement;
