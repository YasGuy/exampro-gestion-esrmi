
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Header = ({ user, onLogout }) => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Déconnexion",
      description: "À bientôt !",
    });
    onLogout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img 
            src="/lovable-uploads/6c32b1d0-6e4a-4d78-9bab-60675d7b1cc8.png" 
            alt="ExamPro Logo" 
            className="h-10 w-10"
          />
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Système de Gestion des Examens
            </h1>
            <p className="text-sm text-muted-foreground">
              École Supérieure de Rabat en Management et Ingénierie
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
