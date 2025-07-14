import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Smartphone, Download, Trash2, RefreshCw, Moon, Sun, Globe, User, Bell, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import tts from '../lib/textToSpeech';
import contentManager from '../lib/contentManager';

const SettingsView = () => {
  const [ttsSettings, setTtsSettings] = useState({
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
    voice: null,
    enabled: true
  });
  const [availableVoices, setAvailableVoices] = useState([]);
  const [appSettings, setAppSettings] = useState({
    darkMode: false,
    notifications: true,
    autoDownload: false,
    offlineMode: true,
    language: 'fr'
  });
  const [storageInfo, setStorageInfo] = useState({
    totalSize: '0 MB',
    downloadedModules: 0,
    totalModules: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
    loadVoices();
    loadStorageInfo();
  }, []);

  const loadSettings = () => {
    try {
      // Charger les paramètres TTS
      const savedTtsSettings = localStorage.getItem('smartrevise_tts_settings');
      if (savedTtsSettings) {
        const parsed = JSON.parse(savedTtsSettings);
        setTtsSettings(prev => ({ ...prev, ...parsed }));
      }

      // Charger les paramètres de l'application
      const savedAppSettings = localStorage.getItem('smartrevise_app_settings');
      if (savedAppSettings) {
        const parsed = JSON.parse(savedAppSettings);
        setAppSettings(prev => ({ ...prev, ...parsed }));
      }

      // Détecter le mode sombre actuel
      const isDark = document.documentElement.classList.contains('dark');
      setAppSettings(prev => ({ ...prev, darkMode: isDark }));
      
    } catch (error) {
      console.error('Erreur lors du chargement des paramètres:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadVoices = async () => {
    try {
      await tts.init();
      const voices = tts.getAvailableVoices();
      setAvailableVoices(voices.french);
      
      if (voices.current) {
        setTtsSettings(prev => ({ ...prev, voice: voices.current }));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des voix:', error);
    }
  };

  const loadStorageInfo = async () => {
    try {
      const stats = await contentManager.getContentStats();
      setStorageInfo({
        totalSize: stats.totalSize,
        downloadedModules: stats.downloadedModules,
        totalModules: stats.totalModules
      });
    } catch (error) {
      console.error('Erreur lors du chargement des informations de stockage:', error);
    }
  };

  const saveTtsSettings = (newSettings) => {
    const updatedSettings = { ...ttsSettings, ...newSettings };
    setTtsSettings(updatedSettings);
    
    // Appliquer les paramètres au système TTS
    tts.setSettings(updatedSettings);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('smartrevise_tts_settings', JSON.stringify(updatedSettings));
  };

  const saveAppSettings = (newSettings) => {
    const updatedSettings = { ...appSettings, ...newSettings };
    setAppSettings(updatedSettings);
    
    // Appliquer le mode sombre
    if (newSettings.darkMode !== undefined) {
      if (newSettings.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    // Sauvegarder dans localStorage
    localStorage.setItem('smartrevise_app_settings', JSON.stringify(updatedSettings));
  };

  const testTts = async () => {
    try {
      await tts.test();
    } catch (error) {
      console.error('Erreur lors du test TTS:', error);
    }
  };

  const handleVoiceChange = (voiceName) => {
    const selectedVoice = availableVoices.find(v => v.name === voiceName);
    if (selectedVoice) {
      saveTtsSettings({ voice: selectedVoice });
    }
  };

  const clearAllData = () => {
    if (confirm('Êtes-vous sûr de vouloir effacer toutes les données ? Cette action est irréversible.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const exportData = () => {
    const data = {
      modules: localStorage.getItem('smartrevise_modules'),
      chapters: localStorage.getItem('smartrevise_chapters'),
      userData: localStorage.getItem('smartrevise_user_data'),
      statistics: localStorage.getItem('smartrevise_statistics'),
      settings: {
        tts: localStorage.getItem('smartrevise_tts_settings'),
        app: localStorage.getItem('smartrevise_app_settings')
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smartrevise_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement des paramètres...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Paramètres</h2>
        <Badge variant="outline">Version 1.0</Badge>
      </div>

      {/* Synthèse vocale */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5" />
            <span>Synthèse vocale</span>
          </CardTitle>
          <CardDescription>
            Configurez la lecture audio des contenus
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="tts-enabled">Activer la synthèse vocale</Label>
            <Switch
              id="tts-enabled"
              checked={ttsSettings.enabled}
              onCheckedChange={(checked) => saveTtsSettings({ enabled: checked })}
            />
          </div>

          {ttsSettings.enabled && (
            <>
              <div className="space-y-2">
                <Label>Voix</Label>
                <Select
                  value={ttsSettings.voice?.name || ''}
                  onValueChange={handleVoiceChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une voix" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVoices.map((voice) => (
                      <SelectItem key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Vitesse de lecture: {ttsSettings.rate.toFixed(1)}x</Label>
                <Slider
                  value={[ttsSettings.rate]}
                  onValueChange={([value]) => saveTtsSettings({ rate: value })}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Hauteur de la voix: {ttsSettings.pitch.toFixed(1)}</Label>
                <Slider
                  value={[ttsSettings.pitch]}
                  onValueChange={([value]) => saveTtsSettings({ pitch: value })}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Volume: {Math.round(ttsSettings.volume * 100)}%</Label>
                <Slider
                  value={[ttsSettings.volume]}
                  onValueChange={([value]) => saveTtsSettings({ volume: value })}
                  min={0}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <Button onClick={testTts} variant="outline" className="w-full">
                <Volume2 className="w-4 h-4 mr-2" />
                Tester la voix
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Apparence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5" />
            <span>Apparence</span>
          </CardTitle>
          <CardDescription>
            Personnalisez l'interface de l'application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {appSettings.darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <Label htmlFor="dark-mode">Mode sombre</Label>
            </div>
            <Switch
              id="dark-mode"
              checked={appSettings.darkMode}
              onCheckedChange={(checked) => saveAppSettings({ darkMode: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <Label>Langue</Label>
            </div>
            <Select
              value={appSettings.language}
              onValueChange={(value) => saveAppSettings({ language: value })}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stockage et données */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Stockage et données</span>
          </CardTitle>
          <CardDescription>
            Gérez vos modules téléchargés et vos données
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{storageInfo.totalSize}</div>
              <div className="text-sm text-muted-foreground">Espace utilisé</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">
                {storageInfo.downloadedModules}/{storageInfo.totalModules}
              </div>
              <div className="text-sm text-muted-foreground">Modules téléchargés</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <Label htmlFor="auto-download">Téléchargement automatique</Label>
            </div>
            <Switch
              id="auto-download"
              checked={appSettings.autoDownload}
              onCheckedChange={(checked) => saveAppSettings({ autoDownload: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-4 h-4" />
              <Label htmlFor="offline-mode">Mode hors ligne prioritaire</Label>
            </div>
            <Switch
              id="offline-mode"
              checked={appSettings.offlineMode}
              onCheckedChange={(checked) => saveAppSettings({ offlineMode: checked })}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Button onClick={exportData} variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Exporter mes données
            </Button>
            <Button onClick={clearAllData} variant="destructive" className="w-full">
              <Trash2 className="w-4 h-4 mr-2" />
              Effacer toutes les données
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </CardTitle>
          <CardDescription>
            Configurez les rappels et notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Activer les notifications</Label>
            <Switch
              id="notifications"
              checked={appSettings.notifications}
              onCheckedChange={(checked) => saveAppSettings({ notifications: checked })}
            />
          </div>

          {appSettings.notifications && (
            <>
              <div className="flex items-center justify-between">
                <Label htmlFor="daily-reminder">Rappel quotidien</Label>
                <Switch id="daily-reminder" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="review-reminder">Rappel de révision</Label>
                <Switch id="review-reminder" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="streak-reminder">Rappel de série</Label>
                <Switch id="streak-reminder" defaultChecked />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* À propos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>À propos</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">SmartRévise</h3>
            <p className="text-sm text-muted-foreground">
              Application éducative intelligente pour réviser efficacement, même hors connexion.
            </p>
            <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>Développé avec ❤️</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="text-xs text-muted-foreground text-center">
            <p>Toutes vos données sont stockées localement sur votre appareil.</p>
            <p>Aucune information personnelle n'est transmise à des serveurs externes.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsView;

