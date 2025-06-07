
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StudentsManagement from '@/components/modules/StudentsManagement';
import TeachersManagement from '@/components/modules/TeachersManagement';
import ModulesManagement from '@/components/modules/ModulesManagement';
import ExamsManagement from '@/components/modules/ExamsManagement';
import { useToast } from '@/hooks/use-toast';

const DirecteurDashboard = ({ activeModule }) => {
  const [isExamDialogOpen, setIsExamDialogOpen] = useState(false);
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
  const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newExam, setNewExam] = useState({
    module: '',
    date: '',
    time: '',
    room: ''
  });

  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    filiere: '',
    group: ''
  });

  const [newModule, setNewModule] = useState({
    name: '',
    code: '',
    teacher: '',
    credits: '',
    semester: ''
  });

  if (activeModule === 'students') return <StudentsManagement />;
  if (activeModule === 'teachers') return <TeachersManagement />;
  if (activeModule === 'modules') return <ModulesManagement />;
  if (activeModule === 'exams') return <ExamsManagement />;

  const handleScheduleExam = () => {
    if (!newExam.module || !newExam.date || !newExam.time || !newExam.room) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Succès",
      description: "Examen planifié avec succès"
    });
    setNewExam({ module: '', date: '', time: '', room: '' });
    setIsExamDialogOpen(false);
  };

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.filiere || !newStudent.group) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Succès",
      description: "Étudiant ajouté avec succès"
    });
    setNewStudent({ name: '', email: '', filiere: '', group: '' });
    setIsStudentDialogOpen(false);
  };

  const handleCreateModule = () => {
    if (!newModule.name || !newModule.code || !newModule.teacher || !newModule.credits || !newModule.semester) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Succès",
      description: "Module créé avec succès"
    });
    setNewModule({ name: '', code: '', teacher: '', credits: '', semester: '' });
    setIsModuleDialogOpen(false);
  };

  // Dashboard overview
  const stats = [
    { title: 'Étudiants', value: '245', description: 'Total inscrits' },
    { title: 'Enseignants', value: '28', description: 'Corps professoral' },
    { title: 'Modules', value: '67', description: 'Cours actifs' },
    { title: 'Examens à venir', value: '12', description: 'Cette semaine' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tableau de bord Directeur</h2>
        <p className="text-muted-foreground">
          Vue d'ensemble de la gestion académique
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>
              Opérations courantes de gestion
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => setIsExamDialogOpen(true)}
            >
              Planifier un nouvel examen
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => setIsStudentDialogOpen(true)}
            >
              Ajouter un étudiant
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => setIsModuleDialogOpen(true)}
            >
              Créer un module
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Examens récents</CardTitle>
            <CardDescription>
              Derniers examens programmés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Mathématiques Avancées</p>
                  <p className="text-sm text-muted-foreground">15 Janvier 2025</p>
                </div>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  Programmé
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Gestion de Projet</p>
                  <p className="text-sm text-muted-foreground">18 Janvier 2025</p>
                </div>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  En attente
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Exam Dialog */}
      <Dialog open={isExamDialogOpen} onOpenChange={setIsExamDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Planifier un nouvel examen</DialogTitle>
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
                <SelectItem value="Mathématiques Avancées">Mathématiques Avancées</SelectItem>
                <SelectItem value="Programmation Web">Programmation Web</SelectItem>
                <SelectItem value="Base de Données">Base de Données</SelectItem>
                <SelectItem value="Gestion de Projet">Gestion de Projet</SelectItem>
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
            <Input
              placeholder="Salle (ex: A201)"
              value={newExam.room}
              onChange={(e) => setNewExam({...newExam, room: e.target.value})}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExamDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleScheduleExam}>
              Planifier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Student Dialog */}
      <Dialog open={isStudentDialogOpen} onOpenChange={setIsStudentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un étudiant</DialogTitle>
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
            <Button variant="outline" onClick={() => setIsStudentDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddStudent}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Module Dialog */}
      <Dialog open={isModuleDialogOpen} onOpenChange={setIsModuleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer un module</DialogTitle>
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
                <SelectItem value="Dr. Mohamed Alami">Dr. Mohamed Alami</SelectItem>
                <SelectItem value="Prof. Fatima Bennani">Prof. Fatima Bennani</SelectItem>
                <SelectItem value="Dr. Hassan El Idrissi">Dr. Hassan El Idrissi</SelectItem>
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
            <Button variant="outline" onClick={() => setIsModuleDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateModule}>
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DirecteurDashboard;
