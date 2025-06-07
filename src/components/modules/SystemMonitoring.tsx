import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Server, 
  Database, 
  Shield, 
  Users, 
  Activity, 
  HardDrive, 
  Cpu, 
  MonitorSpeaker, 
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const SystemMonitoring = () => {
  const [systemStatus] = useState({
    database: { status: 'operational', uptime: '99.9%', responseTime: '45ms' },
    webServer: { status: 'operational', uptime: '99.8%', responseTime: '120ms' },
    authentication: { status: 'operational', uptime: '100%', responseTime: '30ms' },
    fileStorage: { status: 'warning', uptime: '98.5%', responseTime: '200ms' }
  });

  const [systemMetrics] = useState({
    cpu: { usage: 65, cores: 8, temperature: 72 },
    memory: { usage: 78, total: 32, used: 25 },
    disk: { usage: 45, total: 500, used: 225 },
    network: { incoming: 1.2, outgoing: 0.8 }
  });

  const [activeUsers] = useState([
    { role: 'Étudiants', count: 189, peak: 245 },
    { role: 'Enseignants', count: 23, peak: 28 },
    { role: 'Directeurs', count: 2, peak: 3 },
    { role: 'Administrateurs', count: 1, peak: 2 }
  ]);

  const [recentLogs] = useState([
    { 
      id: 1, 
      timestamp: '2025-01-07 14:30:15', 
      level: 'INFO', 
      message: 'Connexion utilisateur: student.john@esrmi.ac.ma',
      service: 'Auth'
    },
    { 
      id: 2, 
      timestamp: '2025-01-07 14:28:42', 
      level: 'WARNING', 
      message: 'Tentative de connexion échouée pour: unknown@domain.com',
      service: 'Auth'
    },
    { 
      id: 3, 
      timestamp: '2025-01-07 14:25:11', 
      level: 'INFO', 
      message: 'Sauvegarde automatique de la base de données terminée',
      service: 'Database'
    },
    { 
      id: 4, 
      timestamp: '2025-01-07 14:20:33', 
      level: 'ERROR', 
      message: 'Erreur temporaire de connexion au serveur de fichiers',
      service: 'FileStorage'
    },
    { 
      id: 5, 
      timestamp: '2025-01-07 14:15:07', 
      level: 'INFO', 
      message: 'Mise à jour des notes pour le module MATH301',
      service: 'Application'
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <CheckCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'INFO': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'WARNING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ERROR': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Surveillance Système</h2>
            <p className="text-muted-foreground">
              Monitoring en temps réel de l'infrastructure ExamPro
            </p>
          </div>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
        </div>
      </div>

      {/* System Services Status */}
      <Card>
        <CardHeader>
          <CardTitle>État des Services</CardTitle>
          <CardDescription>
            Statut en temps réel des composants système
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center space-x-3">
                <Database className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Base de données</p>
                  <p className="text-sm text-muted-foreground">{systemStatus.database.responseTime}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(systemStatus.database.status)}
                <Badge className={getStatusColor(systemStatus.database.status)}>
                  {systemStatus.database.uptime}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center space-x-3">
                <Server className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Serveur Web</p>
                  <p className="text-sm text-muted-foreground">{systemStatus.webServer.responseTime}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(systemStatus.webServer.status)}
                <Badge className={getStatusColor(systemStatus.webServer.status)}>
                  {systemStatus.webServer.uptime}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Authentification</p>
                  <p className="text-sm text-muted-foreground">{systemStatus.authentication.responseTime}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(systemStatus.authentication.status)}
                <Badge className={getStatusColor(systemStatus.authentication.status)}>
                  {systemStatus.authentication.uptime}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center space-x-3">
                <HardDrive className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Stockage</p>
                  <p className="text-sm text-muted-foreground">{systemStatus.fileStorage.responseTime}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(systemStatus.fileStorage.status)}
                <Badge className={getStatusColor(systemStatus.fileStorage.status)}>
                  {systemStatus.fileStorage.uptime}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* System Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Métriques Système</CardTitle>
            <CardDescription>
              Utilisation des ressources serveur
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">CPU ({systemMetrics.cpu.cores} cores)</span>
                </div>
                <span className="text-sm font-medium">{systemMetrics.cpu.usage}%</span>
              </div>
              <Progress value={systemMetrics.cpu.usage} className="h-2" />
              <p className="text-xs text-muted-foreground">Température: {systemMetrics.cpu.temperature}°C</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <MonitorSpeaker className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Mémoire</span>
                </div>
                <span className="text-sm font-medium">{systemMetrics.memory.used}/{systemMetrics.memory.total} GB</span>
              </div>
              <Progress value={systemMetrics.memory.usage} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Disque</span>
                </div>
                <span className="text-sm font-medium">{systemMetrics.disk.used}/{systemMetrics.disk.total} GB</span>
              </div>
              <Progress value={systemMetrics.disk.usage} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Réseau</span>
                </div>
                <span className="text-sm font-medium">↓{systemMetrics.network.incoming} MB/s ↑{systemMetrics.network.outgoing} MB/s</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card>
          <CardHeader>
            <CardTitle>Utilisateurs Actifs</CardTitle>
            <CardDescription>
              Connexions en temps réel par rôle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeUsers.map((userGroup, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{userGroup.role}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold">{userGroup.count}</span>
                    <p className="text-xs text-muted-foreground">Pic: {userGroup.peak}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Journaux Système</CardTitle>
          <CardDescription>
            Événements et activités récentes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentLogs.map((log) => (
              <div key={log.id} className="flex items-start justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge className={getLevelColor(log.level)} variant="outline">
                      {log.level}
                    </Badge>
                    <span className="text-sm font-medium">{log.service}</span>
                    <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                  </div>
                  <p className="text-sm">{log.message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline">
              Voir tous les journaux
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemMonitoring;
