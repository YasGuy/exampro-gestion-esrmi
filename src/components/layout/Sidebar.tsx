
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  User, 
  Calendar, 
  FileText, 
  Edit,
  Plus,
  Search
} from 'lucide-react';

const Sidebar = ({ user, activeModule, onModuleChange }) => {
  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Tableau de bord', icon: User }
    ];

    switch (user.role) {
      case 'directeur':
        return [
          ...baseItems,
          { id: 'students', label: 'Étudiants', icon: User },
          { id: 'teachers', label: 'Enseignants', icon: User },
          { id: 'modules', label: 'Modules', icon: FileText },
          { id: 'filieres', label: 'Filières', icon: FileText },
          { id: 'rooms', label: 'Salles', icon: Plus },
          { id: 'exams', label: 'Examens', icon: Calendar },
          { id: 'reports', label: 'Rapports', icon: FileText }
        ];
      case 'enseignant':
        return [
          ...baseItems,
          { id: 'my-modules', label: 'Mes Modules', icon: FileText },
          { id: 'grades', label: 'Notes', icon: Edit },
          { id: 'exam-schedule', label: 'Planning Examens', icon: Calendar }
        ];
      case 'etudiant':
        return [
          ...baseItems,
          { id: 'my-grades', label: 'Mes Notes', icon: FileText },
          { id: 'my-schedule', label: 'Mon Planning', icon: Calendar },
          { id: 'transcripts', label: 'Relevés', icon: FileText }
        ];
      case 'administrateur':
        return [
          ...baseItems,
          { id: 'users', label: 'Utilisateurs', icon: User },
          { id: 'system', label: 'Système', icon: Plus }
        ];
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white shadow-lg h-screen">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-primary">ExamPro</h2>
        <p className="text-sm text-muted-foreground mt-1">ESRmi</p>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </p>
          <p className="text-sm font-medium">{user.name}</p>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeModule === item.id ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  activeModule === item.id && 'bg-primary text-primary-foreground'
                )}
                onClick={() => onModuleChange(item.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
