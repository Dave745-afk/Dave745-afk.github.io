<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CinéClan - Créez des Films en Famille</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
            position: relative;
        }
        
        .logo {
            font-family: 'Orbitron', sans-serif;
            font-size: 4rem;
            font-weight: 900;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24);
            background-size: 400% 400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradient 3s ease infinite;
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
            margin-bottom: 10px;
        }
        
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .subtitle {
            font-size: 1.2rem;
            color: white;
            opacity: 0.9;
            margin-bottom: 20px;
        }
        
        .main-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 40px;
        }
        
        .game-setup, .game-play {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 30px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .section-title {
            font-size: 1.8rem;
            color: white;
            margin-bottom: 25px;
            text-align: center;
            font-weight: 700;
        }
        
        .roles-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .role-card {
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
            border-radius: 15px;
            padding: 20px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        
        .role-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15));
        }
        
        .role-card.selected {
            background: linear-gradient(145deg, #ff6b6b, #ff5252);
            transform: scale(1.05);
        }
        
        .role-icon {
            font-size: 2.5rem;
            margin-bottom: 10px;
            display: block;
        }
        
        .role-name {
            font-weight: 600;
            color: white;
            font-size: 1rem;
            margin-bottom: 5px;
        }
        
        .role-description {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.3;
        }
        
        .btn {
            background: linear-gradient(145deg, #ff6b6b, #ff5252);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 10px;
            box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
        }
        
        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(255, 107, 107, 0.4);
        }
        
        .btn:active {
            transform: translateY(0);
        }
        
        .game-screen {
            display: none;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 30px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            margin-top: 20px;
        }
        
        .challenge-card {
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .challenge-title {
            font-size: 1.5rem;
            color: #ff6b6b;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .challenge-description {
            color: white;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        
        .player-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        
        .current-player {
            font-size: 1.2rem;
            font-weight: 600;
            color: #4ecdc4;
        }
        
        .score {
            font-size: 1.1rem;
            color: white;
        }
        
        .timer {
            font-size: 1.5rem;
            font-weight: 700;
            color: #ff6b6b;
            font-family: 'Orbitron', sans-serif;
        }
        
        .actions {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            justify-content: center;
        }
        
        .feature-highlight {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 40px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            margin-top: 40px;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .feature-item {
            text-align: center;
            color: white;
            padding: 20px;
        }
        
        .feature-icon {
            font-size: 3rem;
            margin-bottom: 15px;
            color: #4ecdc4;
        }
        
        .feature-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .feature-desc {
            opacity: 0.9;
            line-height: 1.5;
        }
        
        @media (max-width: 768px) {
            .main-content {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .logo {
                font-size: 2.5rem;
            }
            
            .roles-grid {
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="logo">CinéClan</h1>
            <p class="subtitle">🎬 Créez des films épiques en famille ! 🎬</p>
        </div>
        
        <div id="setup-screen">
            <div class="main-content">
                <div class="game-setup">
                    <h2 class="section-title">🎭 Choisissez vos Rôles</h2>
                    <div class="roles-grid" id="roles-grid">
                        <div class="role-card" data-role="realisateur">
                            <span class="role-icon">🎬</span>
                            <div class="role-name">Réalisateur</div>
                            <div class="role-description">Dirige l'équipe et prend les décisions créatives</div>
                        </div>
                        <div class="role-card" data-role="scenariste">
                            <span class="role-icon">✍️</span>
                            <div class="role-name">Scénariste</div>
                            <div class="role-description">Crée les dialogues et l'histoire</div>
                        </div>
                        <div class="role-card" data-role="cameraman">
                            <span class="role-icon">📹</span>
                            <div class="role-name">Cameraman</div>
                            <div class="role-description">Cadre les scènes et gère l'image</div>
                        </div>
                        <div class="role-card" data-role="acteur">
                            <span class="role-icon">🎭</span>
                            <div class="role-name">Acteur Principal</div>
                            <div class="role-description">Interprète le rôle principal</div>
                        </div>
                        <div class="role-card" data-role="monteur">
                            <span class="role-icon">🎞️</span>
                            <div class="role-name">Monteur</div>
                            <div class="role-description">Assemble les séquences</div>
                        </div>
                        <div class="role-card" data-role="producteur">
                            <span class="role-icon">💰</span>
                            <div class="role-name">Producteur</div>
                            <div class="role-description">Gère le budget et le planning</div>
                        </div>
                    </div>
                    <div style="text-align: center;">
                        <button class="btn" onclick="startGame()">🚀 Commencer le Tournage</button>
                    </div>
                </div>
                
                <div class="game-play">
                    <h2 class="section-title">🎯 Comment Jouer</h2>
                    <div style="color: white; line-height: 1.8;">
                        <p><strong>🎬 Objectif :</strong> Créer ensemble des films en surmontant des défis de production !</p>
                        <br>
                        <p><strong>🎭 Chaque rôle a ses pouvoirs :</strong></p>
                        <ul style="margin-left: 20px; margin-top: 10px;">
                            <li>🎬 <strong>Réalisateur</strong> : Prend les décisions finales</li>
                            <li>✍️ <strong>Scénariste</strong> : Invente les dialogues</li>
                            <li>📹 <strong>Cameraman</strong> : Décrit les plans</li>
                            <li>🎭 <strong>Acteur</strong> : Joue les scènes</li>
                            <li>🎞️ <strong>Monteur</strong> : Organise les séquences</li>
                            <li>💰 <strong>Producteur</strong> : Gère les ressources</li>
                        </ul>
                        <br>
                        <p><strong>🏆 Gagnez des points</strong> en résolvant les défis ensemble !</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="game-screen" class="game-screen">
            <div class="player-info">
                <div class="current-player">👤 Joueur actuel : <span id="current-player-name">Réalisateur</span></div>
                <div class="score">🏆 Score : <span id="team-score">0</span></div>
                <div class="timer">⏱️ <span id="timer">30</span>s</div>
            </div>
            
            <div class="challenge-card">
                <h3 class="challenge-title" id="challenge-title">🎬 Défi de Production</h3>
                <p class="challenge-description" id="challenge-description">Prêt pour votre premier défi ?</p>
                
                <div class="actions">
                    <button class="btn" onclick="resolveChallenge('success')">✅ Réussi !</button>
                    <button class="btn" onclick="resolveChallenge('partial')">⚠️ Partiel</button>
                    <button class="btn" onclick="resolveChallenge('fail')">❌ Échec</button>
                    <button class="btn" onclick="nextPlayer()">➡️ Joueur Suivant</button>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <button class="btn" onclick="newGame()">🔄 Nouveau Film</button>
                <button class="btn" onclick="backToSetup()">⬅️ Retour</button>
            </div>
        </div>
        
        <div class="feature-highlight">
            <h2 class="section-title">🌟 Pourquoi CinéClan ?</h2>
            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon">🎪</div>
                    <h3 class="feature-title">Créativité Sans Limites</h3>
                    <p class="feature-desc">Chaque partie génère des histoires uniques et mémorables</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">👨‍👩‍👧‍👦</div>
                    <h3 class="feature-title">Parfait en Famille</h3>
                    <p class="feature-desc">De 3 à 8 joueurs, de 8 à 88 ans !</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🎓</div>
                    <h3 class="feature-title">Éducatif & Amusant</h3>
                    <p class="feature-desc">Apprenez les métiers du cinéma en vous amusant</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">⚡</div>
                    <h3 class="feature-title">Parties Dynamiques</h3>
                    <p class="feature-desc">15-45 minutes de pur divertissement</p>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        let selectedRoles = [];
        let currentPlayerIndex = 0;
        let gameScore = 0;
        let timerInterval;
        let currentTimer = 30;
        
        const roles = {
            realisateur: { name: "Réalisateur", icon: "🎬" },
            scenariste: { name: "Scénariste", icon: "✍️" },
            cameraman: { name: "Cameraman", icon: "📹" },
            acteur: { name: "Acteur Principal", icon: "🎭" },
            monteur: { name: "Monteur", icon: "🎞️" },
            producteur: { name: "Producteur", icon: "💰" }
        };
        
        const challenges = [
            {
                title: "🎬 Scène d'Action Épique",
                description: "Le héros doit échapper à une explosion ! Le réalisateur décrit la scène, l'acteur joue, le cameraman décrit les plans, et le monteur explique le rythme.",
                roles: ["realisateur", "acteur", "cameraman", "monteur"]
            },
            {
                title: "💰 Budget Serré",
                description: "Il ne reste que 1000€ pour finir le film ! Le producteur doit négocier, le scénariste adapter l'histoire, et l'équipe trouver des solutions créatives.",
                roles: ["producteur", "scenariste", "realisateur"]
            },
            {
                title: "🌧️ Météo Capricieuse",
                description: "Il pleut pendant le tournage en extérieur ! Comment adapter la scène ? Le réalisateur doit décider, le cameraman s'adapter, l'acteur improviser.",
                roles: ["realisateur", "cameraman", "acteur"]
            },
            {
                title: "🎭 Dialogue Improvisé",
                description: "L'acteur principal a oublié son texte ! Le scénariste doit créer un nouveau dialogue sur le vif, l'acteur l'interpréter avec émotion.",
                roles: ["scenariste", "acteur"]
            },
            {
                title: "🎞️ Montage de Dernière Minute",
                description: "Le film sort demain ! Le monteur doit expliquer comment assembler les scènes, le réalisateur valider, le producteur gérer le stress.",
                roles: ["monteur", "realisateur", "producteur"]
            },
            {
                title: "⭐ Casting Surprise",
                description: "Une star arrive sur le plateau ! Comment intégrer ce nouveau personnage ? Tous les rôles doivent collaborer pour adapter le scénario.",
                roles: ["realisateur", "scenariste", "producteur", "acteur"]
            }
        ];
        
        // Gestion de la sélection des rôles
        document.querySelectorAll('.role-card').forEach(card => {
            card.addEventListener('click', function() {
                const role = this.getAttribute('data-role');
                
                if (this.classList.contains('selected')) {
                    this.classList.remove('selected');
                    selectedRoles = selectedRoles.filter(r => r !== role);
                } else {
                    this.classList.add('selected');
                    selectedRoles.push(role);
                }
                
                // Animation de sélection
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
        });
        
        function startGame() {
            if (selectedRoles.length < 2) {
                alert('🎬 Sélectionnez au moins 2 rôles pour commencer !');
                return;
            }
            
            document.getElementById('setup-screen').style.display = 'none';
            document.getElementById('game-screen').style.display = 'block';
            
            gameScore = 0;
            currentPlayerIndex = 0;
            updateGameDisplay();
            generateNewChallenge();
            startTimer();
        }
        
        function updateGameDisplay() {
            const currentRole = selectedRoles[currentPlayerIndex];
            const roleInfo = roles[currentRole];
            document.getElementById('current-player-name').textContent = roleInfo.icon + ' ' + roleInfo.name;
            document.getElementById('team-score').textContent = gameScore;
        }
        
        function generateNewChallenge() {
            const availableChallenges = challenges.filter(challenge => 
                challenge.roles.some(role => selectedRoles.includes(role))
            );
            
            const challenge = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
            
            document.getElementById('challenge-title').textContent = challenge.title;
            document.getElementById('challenge-description').textContent = challenge.description;
            
            // Animation d'apparition
            const challengeCard = document.querySelector('.challenge-card');
            challengeCard.style.transform = 'scale(0.95)';
            challengeCard.style.opacity = '0.7';
            setTimeout(() => {
                challengeCard.style.transform = 'scale(1)';
                challengeCard.style.opacity = '1';
            }, 300);
        }
        
        function startTimer() {
            currentTimer = 30;
            updateTimerDisplay();
            
            timerInterval = setInterval(() => {
                currentTimer--;
                updateTimerDisplay();
                
                if (currentTimer <= 0) {
                    clearInterval(timerInterval);
                    alert('⏰ Temps écoulé ! Passez au joueur suivant.');
                    nextPlayer();
                }
            }, 1000);
        }
        
        function updateTimerDisplay() {
            const timerElement = document.getElementById('timer');
            timerElement.textContent = currentTimer;
            
            if (currentTimer <= 10) {
                timerElement.style.color = '#ff6b6b';
                timerElement.classList.add('pulse');
            } else {
                timerElement.style.color = '#4ecdc4';
                timerElement.classList.remove('pulse');
            }
        }
        
        function resolveChallenge(result) {
            clearInterval(timerInterval);
            
            let points = 0;
            let message = '';
            
            switch(result) {
                case 'success':
                    points = 3;
                    message = '🎉 Excellent ! Votre équipe a brillé !';
                    break;
                case 'partial':
                    points = 1;
                    message = '👍 Pas mal ! Vous vous améliorez !';
                    break;
                case 'fail':
                    points = 0;
                    message = '😅 Ça arrive aux meilleurs ! Prochaine fois !';
                    break;
            }
            
            gameScore += points;
            alert(message + ` (+${points} points)`);
            
            updateGameDisplay();
            generateNewChallenge();
            nextPlayer();
        }
        
        function nextPlayer() {
            clearInterval(timerInterval);
            currentPlayerIndex = (currentPlayerIndex + 1) % selectedRoles.length;
            updateGameDisplay();
            startTimer();
        }
        
        function newGame() {
            gameScore = 0;
            currentPlayerIndex = 0;
            clearInterval(timerInterval);
            updateGameDisplay();
            generateNewChallenge();
            startTimer();
        }
        
        function backToSetup() {
            clearInterval(timerInterval);
            document.getElementById('setup-screen').style.display = 'block';
            document.getElementById('game-screen').style.display = 'none';
        }
        
        // Animation de démarrage
        window.addEventListener('load', function() {
            document.querySelectorAll('.role-card').forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
    </script>
</body>
</html>
