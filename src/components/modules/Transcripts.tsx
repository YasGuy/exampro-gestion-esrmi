
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Award, Calendar } from 'lucide-react';

const Transcripts = ({ user }) => {
  const [transcripts] = useState([
    {
      id: 1,
      semester: 'S5',
      year: '2024-2025',
      status: 'Validé',
      average: 15.2,
      credits: 30,
      rank: 8,
      totalStudents: 45,
      modules: [
        { name: 'Programmation Web', code: 'WEB301', credits: 6, grade: 16 },
        { name: 'Base de Données', code: 'DB301', credits: 5, grade: 14 },
        { name: 'Réseaux', code: 'NET301', credits: 4, grade: 15 },
        { name: 'Gestion de Projet', code: 'GP301', credits: 5, grade: 17 },
        { name: 'Anglais Technique', code: 'ENG301', credits: 3, grade: 14 },
        { name: 'Mathématiques', code: 'MATH301', credits: 6, grade: 18 },
        { name: 'Stage', code: 'STAGE301', credits: 1, grade: 15 }
      ]
    },
    {
      id: 2,
      semester: 'S4',
      year: '2024-2025',
      status: 'Validé',
      average: 14.8,
      credits: 30,
      rank: 12,
      totalStudents: 47,
      modules: [
        { name: 'Algorithmique Avancée', code: 'ALGO201', credits: 6, grade: 18 },
        { name: 'Systèmes d\'Exploitation', code: 'OS201', credits: 5, grade: 13 },
        { name: 'Architecture', code: 'ARCH201', credits: 4, grade: 12 },
        { name: 'Analyse', code: 'MATH201', credits: 6, grade: 16 },
        { name: 'Communication', code: 'COM201', credits: 3, grade: 14 },
        { name: 'Probabilités', code: 'PROB201', credits: 4, grade: 15 },
        { name: 'Projet', code: 'PROJ201', credits: 2, grade: 17 }
      ]
    },
    {
      id: 3,
      semester: 'S3',
      year: '2023-2024',
      status: 'Validé',
      average: 13.9,
      credits: 30,
      rank: 15,
      totalStudents: 48,
      modules: [
        { name: 'Programmation Orientée Objet', code: 'POO101', credits: 6, grade: 15 },
        { name: 'Structure de Données', code: 'SD101', credits: 5, grade: 14 },
        { name: 'Mathématiques Discrètes', code: 'MD101', credits: 5, grade: 12 },
        { name: 'Électronique', code: 'ELEC101', credits: 4, grade: 13 },
        { name: 'Physique', code: 'PHY101', credits: 4, grade: 14 },
        { name: 'Français', code: 'FR101', credits: 3, grade: 16 },
        { name: 'Introduction à l\'informatique', code: 'INFO101', credits: 3, grade: 13 }
      ]
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Validé': return 'bg-green-100 text-green-800 border-green-200';
      case 'En cours': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Échec': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMention = (average) => {
    if (average >= 16) return 'Très Bien';
    if (average >= 14) return 'Bien';
    if (average >= 12) return 'Assez Bien';
    if (average >= 10) return 'Passable';
    return 'Insuffisant';
  };

  const totalCredits = transcripts.reduce((sum, transcript) => sum + transcript.credits, 0);
  const overallAverage = transcripts.reduce((sum, transcript, index) => {
    return sum + (transcript.average * transcript.credits);
  }, 0) / totalCredits;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Relevés de Notes</h2>
        <p className="text-muted-foreground">
          Historique complet de votre parcours académique
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moyenne générale</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallAverage.toFixed(2)}/20</div>
            <p className="text-xs text-muted-foreground">
              {getMention(overallAverage)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crédits obtenus</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCredits}</div>
            <p className="text-xs text-muted-foreground">
              Crédits ECTS
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Semestres validés</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transcripts.length}</div>
            <p className="text-xs text-muted-foreground">
              Sur 6 semestres
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meilleur semestre</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.max(...transcripts.map(t => t.average)).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              {transcripts.find(t => t.average === Math.max(...transcripts.map(t => t.average)))?.semester}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {transcripts.map((transcript) => (
          <Card key={transcript.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{transcript.semester} - {transcript.year}</CardTitle>
                  <CardDescription>
                    Moyenne: {transcript.average}/20 • Crédits: {transcript.credits} • 
                    Rang: {transcript.rank}/{transcript.totalStudents}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(transcript.status)}>
                    {transcript.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Module</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Crédits</TableHead>
                    <TableHead>Note</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transcript.modules.map((module, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{module.name}</TableCell>
                      <TableCell>{module.code}</TableCell>
                      <TableCell>{module.credits}</TableCell>
                      <TableCell>
                        <span className={`font-bold ${
                          module.grade >= 16 ? 'text-green-600' :
                          module.grade >= 12 ? 'text-blue-600' :
                          module.grade >= 10 ? 'text-orange-600' : 'text-red-600'
                        }`}>
                          {module.grade}/20
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actions disponibles</CardTitle>
          <CardDescription>
            Téléchargements et documents officiels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <Button className="justify-start" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Télécharger le relevé complet
            </Button>
            <Button className="justify-start" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Certificat de scolarité
            </Button>
            <Button className="justify-start" variant="outline">
              <Award className="h-4 w-4 mr-2" />
              Attestation de réussite
            </Button>
            <Button className="justify-start" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Supplément au diplôme
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transcripts;
