import React, { useState, useEffect } from 'react';
import { Home, BookOpen, BarChart3, Settings, Moon, Sun, Download, Brain, Zap } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation d'initialisation simple
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Navigation principale
  const Navigation = () => (
    <nav className="flex justify-center space-x-2 mb-6 p-2 bg-muted/50 rounded-lg">
      <Button
        variant={currentView === 'home' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setCurrentView('home')}
        className="flex items-center space-x-2"
      >
        <Home className="w-4 h-4" />
        <span>Accueil</span>
      </Button>
      <Button
        variant={currentView === 'subjects' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setCurrentView('subjects')}
        className="flex items-center space-x-2"
      >
        <BookOpen className="w-4 h-4" />
        <span>Matières</span>
      </Button>
      <Button
        variant={currentView === 'stats' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setCurrentView('stats')}
        className="flex items-center space-x-2"
      >
        <BarChart3 className="w-4 h-4" />
        <span>Statistiques</span>
      </Button>
      <Button
        variant={currentView === 'settings' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setCurrentView('settings')}
        className="flex items-center space-x-2"
      >
        <Settings className="w-4 h-4" />
        <span>Paramètres</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleDarkMode}
        className="ml-4"
      >
        {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </Button>
    </nav>
  );

  // Page d'accueil
  const HomePage = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-primary" />
            <Zap className="w-6 h-6 text-yellow-500" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">Bienvenue sur SmartRévise</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Votre application éducative intelligente pour réviser efficacement, même hors connexion. 
          Découvrez des résumés, fiches de révision, quiz interactifs et cartes mentales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="w-5 h-5 text-blue-500" />
              <span>Mode Hors Ligne</span>
            </CardTitle>
            <CardDescription>Tous vos contenus disponibles sans connexion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Disponible hors ligne</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-green-500" />
              <span>Contenus Éducatifs</span>
            </CardTitle>
            <CardDescription>Résumés, fiches et quiz interactifs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2 text-center text-sm">
              <Badge variant="secondary">Primaire</Badge>
              <Badge variant="secondary">Collège</Badge>
              <Badge variant="secondary">Lycée</Badge>
              <Badge variant="secondary">Université</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-purple-500" />
              <span>Synthèse Vocale</span>
            </CardTitle>
            <CardDescription>Écoutez vos cours avec la lecture audio</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => alert('Test TTS')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Activer la lecture
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Votre Progression</CardTitle>
            <CardDescription>Continuez là où vous vous êtes arrêté</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Mathématiques - Algèbre</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Pages simplifiées
  const SubjectsPage = () => (
    <div className="max-w-4xl mx-auto text-center py-12">
      <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
      <h2 className="text-2xl font-bold mb-2">Matières</h2>
      <p className="text-muted-foreground">
        Vos matières et chapitres seront affichés ici.
      </p>
    </div>
  );

  const StatsPage = () => (
    <div className="max-w-4xl mx-auto text-center py-12">
      <BarChart3 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
      <h2 className="text-2xl font-bold mb-2">Statistiques</h2>
      <p className="text-muted-foreground">
        Vos statistiques de progression et performances seront affichées ici.
      </p>
    </div>
  );

  const SettingsPage = () => (
    <div className="max-w-4xl mx-auto text-center py-12">
      <Settings className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
      <h2 className="text-2xl font-bold mb-2">Paramètres</h2>
      <p className="text-muted-foreground">
        Configurez votre application selon vos préférences.
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Chargement de SmartRévise...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* En-tête avec logo */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-primary" />
              <Zap className="w-6 h-6 text-yellow-500" />
            </div>
            <h1 className="text-xl font-bold">SmartRévise</h1>
          </div>
        </header>

        {/* Navigation */}
        <Navigation />

        {/* Contenu principal */}
        <main>
          {currentView === 'home' && <HomePage />}
          {currentView === 'subjects' && <SubjectsPage />}
          {currentView === 'stats' && <StatsPage />}
          {currentView === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}

export default App;

