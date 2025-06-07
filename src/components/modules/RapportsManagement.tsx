
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Download, FileText, BarChart3, PieChart, TrendingUp, Calendar } from 'lucide-react';

const RapportsManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semestre-actuel');
  const [selectedType, setSelectedType] = useState('tous');
  const { toast } = useToast();

  const rapportsData = [
    { id: 1, type: 'Académique', title: 'Rapport de Notes - S1 2024', period: 'Semestre 1 2024', status: 'Généré', date: '2024-01-15', size: '2.5 MB' },
    { id: 2, type: 'Présence', title: 'Rapport d\'Assiduité - Décembre', period: 'Décembre 2024', status: 'En cours', date: '2024-12-01', size: '1.8 MB' },
    { id: 3, type: 'Financier', title: 'Rapport Financier - Trimestre 4', period: 'Q4 2024', status: 'Généré', date: '2024-12-31', size: '3.2 MB' },
    { id: 4, type: 'Examens', title: 'Rapport d\'Examens - Session Janvier', period: 'Janvier 2025', status: 'Généré', date: '2025-01-05', size: '4.1 MB' },
    { id: 5, type: 'Personnel', title: 'Rapport RH - Année 2024', period: 'Année 2024', status: 'Généré', date: '2024-12-30', size: '1.9 MB' },
  ];

  const statsData = [
    { title: 'Étudiants Inscrits', value: '245', change: '+12%', icon: TrendingUp, color: 'text-green-600' },
    { title: 'Taux de Réussite', value: '87%', change: '+5%', icon: BarChart3, color: 'text-blue-600' },
    { title: 'Moyenne Générale', value: '14.2', change: '+0.8', icon: PieChart, color: 'text-purple-600' },
    { title: 'Taux d\'Assiduité', value: '92%', change: '+3%', icon: Calendar, color: 'text-orange-600' },
  ];

  const handleDownloadReport = (rapport) => {
    toast({
      title: "Téléchargement",
      description: `Téléchargement de ${rapport.title} en cours...`
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Génération de rapport",
      description: "Le rapport est en cours de génération..."
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Généré': return 'bg-green-100 text-green-800';
      case 'En cours': return 'bg-yellow-100 text-yellow-800';
      case 'Erreur': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRapports = rapportsData.filter(rapport => {
    if (selectedType !== 'tous' && rapport.type.toLowerCase() !== selectedType) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Rapports et Statistiques</h2>
          <p className="text-muted-foreground">Générer et consulter les rapports de l'établissement</p>
        </div>
        <Button onClick={handleGenerateReport}>
          <FileText className="mr-2 h-4 w-4" />
          Générer un Rapport
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.color}`}>
                {stat.change} par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtres des Rapports</CardTitle>
          <CardDescription>Filtrer les rapports par période et type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sélectionner une période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semestre-actuel">Semestre Actuel</SelectItem>
                <SelectItem value="semestre-precedent">Semestre Précédent</SelectItem>
                <SelectItem value="annee-academique">Année Académique</SelectItem>
                <SelectItem value="tous">Toutes les Périodes</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Type de rapport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous les Types</SelectItem>
                <SelectItem value="académique">Académique</SelectItem>
                <SelectItem value="présence">Présence</SelectItem>
                <SelectItem value="financier">Financier</SelectItem>
                <SelectItem value="examens">Examens</SelectItem>
                <SelectItem value="personnel">Personnel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rapports Disponibles</CardTitle>
          <CardDescription>Liste des rapports générés et en cours</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Période</TableHead>
                <TableHead>Date de Génération</TableHead>
                <TableHead>Taille</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRapports.map((rapport) => (
                <TableRow key={rapport.id}>
                  <TableCell>
                    <Badge variant="outline">{rapport.type}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{rapport.title}</TableCell>
                  <TableCell>{rapport.period}</TableCell>
                  <TableCell>{rapport.date}</TableCell>
                  <TableCell>{rapport.size}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(rapport.status)}>
                      {rapport.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadReport(rapport)}
                      disabled={rapport.status !== 'Généré'}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Rapports Rapides</CardTitle>
            <CardDescription>Générer des rapports prédéfinis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              Rapport de Performance Académique
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <PieChart className="mr-2 h-4 w-4" />
              Analyse de Fréquentation
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              Évolution des Notes
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Planning des Examens
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dernières Activités</CardTitle>
            <CardDescription>Activités récentes de génération de rapports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Rapport d'Examens généré</p>
                  <p className="text-sm text-muted-foreground">Il y a 2 heures</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Terminé</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Analyse des notes en cours</p>
                  <p className="text-sm text-muted-foreground">Il y a 4 heures</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">En cours</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Rapport financier téléchargé</p>
                  <p className="text-sm text-muted-foreground">Hier à 15:30</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Téléchargé</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RapportsManagement;
