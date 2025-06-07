
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock users for demonstration
  const mockUsers = {
    'directeur@esrmi.ma': { 
      role: 'directeur', 
      name: 'Dr. Ahmed Bennani',
      password: 'directeur123'
    },
    'enseignant@esrmi.ma': { 
      role: 'enseignant', 
      name: 'Prof. Fatima Alami',
      password: 'enseignant123'
    },
    'etudiant@esrmi.ma': { 
      role: 'etudiant', 
      name: 'Youssef El Mansouri',
      password: 'etudiant123'
    },
    'admin@esrmi.ma': { 
      role: 'administrateur', 
      name: 'Hassan Admin',
      password: 'admin123'
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers[email];
    if (user && user.password === password) {
      onLogin({
        email,
        name: user.name,
        role: user.role
      });
      toast({
        title: "Connexion réussie",
        description: `Bienvenue ${user.name}`,
      });
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Connexion</CardTitle>
        <CardDescription className="text-center">
          Connectez-vous à votre compte ExamPro
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre.email@esrmi.ma"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>
        
        <div className="mt-6 text-sm text-center text-muted-foreground">
          <p className="font-medium mb-2">Comptes de démonstration :</p>
          <div className="space-y-1 text-xs">
            <p><strong>Directeur:</strong> directeur@esrmi.ma / directeur123</p>
            <p><strong>Enseignant:</strong> enseignant@esrmi.ma / enseignant123</p>
            <p><strong>Étudiant:</strong> etudiant@esrmi.ma / etudiant123</p>
            <p><strong>Admin:</strong> admin@esrmi.ma / admin123</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
