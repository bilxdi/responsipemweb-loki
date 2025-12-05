// State Aplikasi
const AppState = {
    currentUser: null,
    currentView: 'login',
    collectedStones: [],
    availableStones: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    quizScore: 0,
    selectedCharacter: null,
    timeLeft: 100, // 100 DETIK
    timerInterval: null,
    isTimerFrozen: false,
    doublePointsActive: false,
    stonePlaces: {
        dashboard: null,
        question1: null,
        question2: null,
        question3: null,
        question4: null,
        question5: null
    }
};

// Data User (berdasarkan universe)
const Users = {
    'tva': {
        password: '123',
        name: 'TVA Agent',
        theme: 'tva',
        isAdmin: false,
        access: ['loki', 'mobius', 'sylvie', 'renslayer', 'miss_minutes', 'hunter_b15']
    },
    'void': {
        password: '123',
        name: 'Void Wanderer',
        theme: 'void',
        isAdmin: false,
        access: ['loki'] // Hanya Loki
    },
    'lamentis': {
        password: '123',
        name: 'Lamentis Survivor',
        theme: 'lamentis',
        isAdmin: false,
        access: ['loki', 'sylvie'] // Loki dan Sylvie
    },
    'citadel': {
        password: '123',
        name: 'He Who Remains',
        theme: 'citadel',
        isAdmin: true,
        access: ['loki', 'mobius', 'sylvie', 'renslayer', 'miss_minutes', 'hunter_b15']
    }
};

// Data Karakter dengan Deskripsi
const Characters = [
    { 
        id: 'loki', 
        name: 'Loki', 
        color: '#2E8B57',
        description: 'God of Mischief yang terperangkap di TVA. Mencari tujuan mulianya di tengah kekacauan multiverse.',
        quote: '"I am Loki of Asgard, and I am burdened with glorious purpose."'
    },
    { 
        id: 'mobius', 
        name: 'Mobius M. Mobius', 
        color: '#4682B4',
        description: 'Analis TVA yang terobsesi dengan jet ski. Ahli dalam mempelajari varian Loki.',
        quote: '"I like to think we\'re writing our own story."'
    },
    { 
        id: 'sylvie', 
        name: 'Sylvie', 
        color: '#9370DB',
        description: 'Varian Loki wanita yang hidup dalam pelarian. Punya dendam terhadap TVA.',
        quote: '"I don\'t want to rule. I just want them to stop."'
    },
    { 
        id: 'renslayer', 
        name: 'Ravonna Renslayer', 
        color: '#B22222',
        description: 'Jenderal TVA yang loyal pada misi. Perlahan mempertanyakan segala yang diketahuinya.',
        quote: '"The TVA is the only thing standing between us and total chaos."'
    },
    { 
        id: 'miss_minutes', 
        name: 'Miss Minutes', 
        color: '#FFD700',
        description: 'AI mascot TVA berbentuk jam. Menyimpan banyak rahasia tentang asal-usul TVA.',
        quote: '"Howdy! I\'m Miss Minutes, and I\'m here to guide you through the TVA!"'
    },
    { 
        id: 'hunter_b15', 
        name: 'Hunter B-15', 
        color: '#5F9EA0',
        description: 'Hunter TVA yang tangguh. Mulai mengingat masa lalunya dan mempertanyakan misinya.',
        quote: '"I\'m not just a hunter. I was someone before this."'
    }
];

// Data Batu Infinity (Power-ups) - DIPERBAIKI: JANGAN ADA DUPLIKAT
const InfinityStones = [
    { 
        id: 'space', 
        name: 'Batu Ruang', 
        color: '#4169E1',
        effect: '50/50 (Hapus 2 opsi salah)',
        symbol: 'S',
        collected: false
    },
    { 
        id: 'mind', 
        name: 'Batu Pikiran', 
        color: '#FFD700',
        effect: 'Intip Jawaban',
        symbol: 'M',
        collected: false
    },
    { 
        id: 'reality', 
        name: 'Batu Realitas', 
        color: '#DC143C',
        effect: 'Auto-Win Pertanyaan',
        symbol: 'R',
        collected: false
    },
    { 
        id: 'power', 
        name: 'Batu Kekuatan', 
        color: '#9370DB',
        effect: 'Double Point (2x Skor)',
        symbol: 'P',
        collected: false
    },
    { 
        id: 'time', 
        name: 'Batu Waktu', 
        color: '#32CD32',
        effect: 'Freeze Timer (15 detik)',
        symbol: 'T',
        collected: false
    },
    { 
        id: 'soul', 
        name: 'Batu Jiwa', 
        color: '#FF8C00',
        effect: 'Second Chance (Ulang jika salah)',
        symbol: 'J',
        collected: false
    }
];

// Pertanyaan Kuis (Bahasa Indonesia)
const QuizQuestions = [
    {
        question: "Apa kepanjangan dari TVA?",
        options: [
            "Time Variance Authority",
            "Time Violation Agency",
            "Total Variance Action"
        ],
        correctAnswer: 0,
        answerText: "Time Variance Authority"
    },
    {
        question: "Siapa nama monster awan di The Void?",
        options: [
            "Galactus",
            "Alioth",
            "Mephisto"
        ],
        correctAnswer: 1,
        answerText: "Alioth"
    },
    {
        question: "Apa kendaraan impian Mobius?",
        options: [
            "Motor",
            "Pesawat",
            "Jet Ski"
        ],
        correctAnswer: 2,
        answerText: "Jet Ski"
    },
    {
        question: "Di mana Sylvie bersembunyi?",
        options: [
            "The Void",
            "Kiamat",
            "Asgard"
        ],
        correctAnswer: 1,
        answerText: "Kiamat"
    },
    {
        question: "Siapa nama maskot jam TVA?",
        options: [
            "Miss Minutes",
            "Jam Gadang",
            "Time Tina"
        ],
        correctAnswer: 0,
        answerText: "Miss Minutes"
    },
    {
        question: "Mana yang BUKAN varian Loki?",
        options: [
            "Alligator Loki",
            "President Loki",
            "Thor Loki"
        ],
        correctAnswer: 2,
        answerText: "Thor Loki"
    },
    {
        question: "Pencipta TVA sebenarnya?",
        options: [
            "Time Keepers",
            "He Who Remains",
            "Odin"
        ],
        correctAnswer: 1,
        answerText: "He Who Remains"
    },
    {
        question: "Nomor tahanan Loki?",
        options: [
            "L1130",
            "L616",
            "L999"
        ],
        correctAnswer: 0,
        answerText: "L1130"
    },
    {
        question: "Cara mengalahkan Alioth?",
        options: [
            "Kekuatan",
            "Sihir",
            "Batu Akik"
        ],
        correctAnswer: 1,
        answerText: "Sihir"
    },
    {
        question: "Kejadian apa yang memicu Nexus Event besar saat Loki dan Sylvie terjebak di Lamentis?",
        options: [
            "Mereka saling membunuh",
            "Mereka jatuh cinta",
            "Mereka menemukan Tesseract"
        ],
        correctAnswer: 1,
        answerText: "Mereka jatuh cinta"
    }
];

// DOM Elements
const elements = {
    // Views
    loginView: document.getElementById('login-view'),
    dashboardView: document.getElementById('dashboard-view'),
    quizView: document.getElementById('quiz-view'),
    resultsView: document.getElementById('results-view'),
    adminView: document.getElementById('admin-view'),
    
    // Login
    usernameInput: document.getElementById('username'),
    passwordInput: document.getElementById('password'),
    loginBtn: document.getElementById('login-btn'),
    
    // Header
    mainHeader: document.getElementById('main-header'),
    currentUser: document.getElementById('current-user'),
    adminBadge: document.getElementById('admin-badge'),
    logoutBtn: document.getElementById('logout-btn'),
    
    // Dashboard
    charactersGrid: document.getElementById('characters-grid'),
    startQuizBtn: document.getElementById('start-quiz-btn'),
    adminDashboardBtn: document.getElementById('admin-dashboard-btn'),
    
    // Quiz
    currentQuestion: document.getElementById('current-question'),
    quizScore: document.getElementById('quiz-score'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    
    // Results
    finalScore: document.getElementById('final-score'),
    resultMessage: document.getElementById('result-message'),
    stonesCollected: document.getElementById('stones-collected'),
    retryBtn: document.getElementById('retry-btn'),
    dashboardReturnBtn: document.getElementById('dashboard-return-btn'),
    
    // Admin
    adminTableBody: document.getElementById('admin-table-body'),
    backToDashboardBtn: document.getElementById('back-to-dashboard-btn'),
    resetTimelineBtn: document.getElementById('reset-timeline-btn'),
    
    // Gauntlet & Timer
    stonesBar: document.getElementById('stones-bar'),
    snapButton: document.getElementById('snap-button'),
    timer: document.getElementById('timer'),
    timerContainer: document.getElementById('timer-container'),
    gauntletContainer: document.getElementById('gauntlet-container'),
    
    // Footer
    currentDate: document.getElementById('current-date')
};

// ==================== DRAGGABLE FUNCTIONALITY ====================

class Draggable {
    constructor(element) {
        this.element = element;
        this.isDragging = false;
        this.currentX = 0;
        this.currentY = 0;
        this.initialX = 0;
        this.initialY = 0;
        this.xOffset = 0;
        this.yOffset = 0;
        
        this.init();
    }
    
    init() {
        this.element.addEventListener('mousedown', (e) => this.dragStart(e));
        this.element.addEventListener('touchstart', (e) => this.dragStart(e.touches[0]));
        
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('touchmove', (e) => this.drag(e.touches[0]));
        
        document.addEventListener('mouseup', () => this.dragEnd());
        document.addEventListener('touchend', () => this.dragEnd());
        
        // Load saved position from localStorage
        this.loadPosition();
    }
    
    dragStart(e) {
        this.initialX = e.clientX - this.xOffset;
        this.initialY = e.clientY - this.yOffset;
        
        if (e.target === this.element || this.element.contains(e.target)) {
            this.isDragging = true;
            this.element.style.cursor = 'grabbing';
            this.element.style.zIndex = '1000';
        }
    }
    
    drag(e) {
        if (this.isDragging) {
            e.preventDefault();
            
            this.currentX = e.clientX - this.initialX;
            this.currentY = e.clientY - this.initialY;
            
            this.xOffset = this.currentX;
            this.yOffset = this.currentY;
            
            this.setTranslate(this.currentX, this.currentY, this.element);
        }
    }
    
    dragEnd() {
        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.isDragging = false;
        this.element.style.cursor = 'move';
        this.element.style.zIndex = '200';
        
        // Save position to localStorage
        this.savePosition();
    }
    
    setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
    
    savePosition() {
        const position = {
            x: this.xOffset,
            y: this.yOffset,
            id: this.element.id
        };
        localStorage.setItem(`draggable_${this.element.id}`, JSON.stringify(position));
    }
    
    loadPosition() {
        const saved = localStorage.getItem(`draggable_${this.element.id}`);
        if (saved) {
            const position = JSON.parse(saved);
            this.xOffset = position.x;
            this.yOffset = position.y;
            this.setTranslate(position.x, position.y, this.element);
        }
    }
}

// ==================== CORE APP FUNCTIONS ====================

// Inisialisasi aplikasi
function initApp() {
    // Setup event listeners
    elements.loginBtn.addEventListener('click', handleLogin);
    elements.logoutBtn.addEventListener('click', handleLogout);
    elements.startQuizBtn.addEventListener('click', startQuiz);
    elements.adminDashboardBtn.addEventListener('click', showAdminDashboard);
    elements.prevBtn.addEventListener('click', showPreviousQuestion);
    elements.nextBtn.addEventListener('click', showNextQuestion);
    elements.retryBtn.addEventListener('click', resetQuiz);
    elements.dashboardReturnBtn.addEventListener('click', returnToDashboard);
    elements.snapButton.addEventListener('click', performSnap);
    elements.backToDashboardBtn.addEventListener('click', returnToDashboardFromAdmin);
    elements.resetTimelineBtn.addEventListener('click', resetTimelineData);
    
    // Initialize draggable elements
    new Draggable(elements.gauntletContainer);
    new Draggable(elements.timerContainer);
    
    // Set tanggal di footer
    const now = new Date();
    elements.currentDate.textContent = now.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    
    // Generate kartu karakter
    generateCharacterCards();
    
    // Set view awal
    switchView('login');
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 15px;
        border-radius: 10px;
        border-left: 5px solid var(--accent-color);
        z-index: 10000;
        max-width: 300px;
        font-family: var(--font-main);
        box-shadow: 0 5px 15px rgba(0,0,0,0.5);
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// View Management
function switchView(viewName) {
    // Sembunyikan semua views
    elements.loginView.classList.remove('active');
    elements.dashboardView.classList.remove('active');
    elements.quizView.classList.remove('active');
    elements.resultsView.classList.remove('active');
    elements.adminView.classList.remove('active');
    
    // Tampilkan view yang diminta
    document.getElementById(`${viewName}-view`).classList.add('active');
    
    // Update visibilitas header
    elements.mainHeader.style.display = viewName === 'login' ? 'none' : 'flex';
    
    // Update visibilitas timer dan gauntlet
    elements.timerContainer.style.display = viewName === 'quiz' ? 'block' : 'none';
    elements.gauntletContainer.style.display = (viewName === 'dashboard' || viewName === 'quiz') ? 'flex' : 'none';
    
    AppState.currentView = viewName;
    
    // Jika ke dashboard, update UI dan place stone
    if (viewName === 'dashboard') {
        updateGauntletBar();
        updateCharacterAccess();
        // Place stone di dashboard jika belum ditempatkan
        setTimeout(() => {
            if (!AppState.stonePlaces.dashboard && AppState.collectedStones.length < 6) {
                placeStoneInLocation('dashboard');
            }
        }, 500);
    }
    
    // Jika ke quiz, place stones di beberapa pertanyaan
    if (viewName === 'quiz') {
        // Place stones di pertanyaan tertentu
        setTimeout(() => {
            const questionNumbers = [1, 3, 5, 7, 9]; // 5 pertanyaan untuk 5 batu
            questionNumbers.forEach(qNum => {
                if (!AppState.stonePlaces[`question${qNum}`] && AppState.collectedStones.length < 6) {
                    // Place stone saat pertanyaan tersebut aktif
                    if (AppState.currentQuestionIndex + 1 === qNum) {
                        placeStoneInLocation(`question${qNum}`);
                    }
                }
            });
        }, 500);
    }
    
    // Jika ke admin, load data
    if (viewName === 'admin') {
        loadAdminData();
    }
}

// Fungsi untuk menempatkan stone di lokasi tertentu
function placeStoneInLocation(location) {
    // Cari batu yang belum dikumpulkan
    const availableStones = InfinityStones.filter(stone => 
        !stone.collected && !AppState.collectedStones.includes(stone.id)
    );
    
    if (availableStones.length === 0) return;
    
    const stone = availableStones[0]; // Ambil batu pertama yang belum dikumpulkan
    
    // Buat elemen batu
    const stoneElement = document.createElement('div');
    stoneElement.className = 'hidden-stone';
    stoneElement.style.backgroundColor = stone.color;
    stoneElement.title = `${stone.name}\nKlik untuk mengumpulkan!`;
    stoneElement.dataset.stoneId = stone.id;
    stoneElement.textContent = stone.symbol;
    
    // Posisi berdasarkan lokasi
    if (location === 'dashboard') {
        // Posisi di dashboard view (random)
        const dashboardView = elements.dashboardView;
        const rect = dashboardView.getBoundingClientRect();
        const containerRect = dashboardView.getBoundingClientRect();
        
        // Pastikan posisi dalam bounds dashboard view
        const maxX = containerRect.width - 50;
        const maxY = containerRect.height - 50;
        
        const randomX = Math.max(20, Math.floor(Math.random() * maxX));
        const randomY = Math.max(20, Math.floor(Math.random() * maxY));
        
        stoneElement.style.position = 'absolute';
        stoneElement.style.left = `${randomX}px`;
        stoneElement.style.top = `${randomY}px`;
        
        dashboardView.appendChild(stoneElement);
        AppState.stonePlaces.dashboard = stone.id;
    } else if (location.startsWith('question')) {
        // Posisi di quiz view (random di dalam container quiz)
        const quizView = elements.quizView;
        const containerRect = quizView.getBoundingClientRect();
        
        const maxX = containerRect.width - 50;
        const maxY = containerRect.height - 150; // Beri ruang untuk question text
        
        const randomX = Math.max(20, Math.floor(Math.random() * maxX));
        const randomY = Math.max(100, Math.floor(Math.random() * maxY)); // Jangan terlalu atas
        
        stoneElement.style.position = 'absolute';
        stoneElement.style.left = `${randomX}px`;
        stoneElement.style.top = `${randomY}px`;
        
        quizView.appendChild(stoneElement);
        AppState.stonePlaces[location] = stone.id;
    }
    
    // Add click event
    stoneElement.addEventListener('click', (e) => {
        e.stopPropagation();
        collectStone(stone.id, stoneElement, location);
    });
}

// Kumpulkan Batu - DIPERBAIKI: Track batu yang sudah dikumpulkan
function collectStone(stoneId, element, location) {
    if (AppState.collectedStones.includes(stoneId)) return;
    
    // Update status batu di array InfinityStones
    const stoneIndex = InfinityStones.findIndex(s => s.id === stoneId);
    if (stoneIndex !== -1) {
        InfinityStones[stoneIndex].collected = true;
    }
    
    // Tambah ke batu yang dikumpulkan
    AppState.collectedStones.push(stoneId);
    AppState.availableStones.push(stoneId);
    
    // Update gauntlet bar
    updateGauntletBar();
    
    // Remove the stone element
    element.remove();
    
    // Clear stone place
    if (location === 'dashboard') {
        AppState.stonePlaces.dashboard = null;
    } else if (location.startsWith('question')) {
        AppState.stonePlaces[location] = null;
    }
    
    // Check if all stones are collected
    if (AppState.collectedStones.length === 6) {
        elements.snapButton.style.display = 'block';
        showNotification('SEMUA BATU TERKUMPUL! Snap Fingers sekarang tersedia!');
    }
    
    // Show collection message
    const stoneName = InfinityStones.find(s => s.id === stoneId).name;
    const remaining = 6 - AppState.collectedStones.length;
    showNotification(`Anda mengumpulkan ${stoneName}! ${remaining > 0 ? `${remaining} batu tersisa.` : 'Semua batu telah terkumpul!'}`);
}

// Login Handler
function handleLogin() {
    const username = elements.usernameInput.value.trim().toLowerCase();
    const password = elements.passwordInput.value;
    
    if (!username || !password) {
        showNotification('Silakan masukkan Nama Universe dan Kata Sandi Temporal');
        return;
    }
    
    if (!Users[username]) {
        showNotification('Universe tidak ditemukan dalam arsip TVA');
        return;
    }
    
    const user = Users[username];
    
    if (user.password !== password) {
        showNotification('Kata Sandi Temporal salah');
        return;
    }
    
    // Set user saat ini
    AppState.currentUser = username;
    
    // Update UI dengan info user
    elements.currentUser.textContent = user.name;
    elements.adminBadge.style.display = user.isAdmin ? 'block' : 'none';
    elements.adminDashboardBtn.style.display = user.isAdmin ? 'block' : 'none';
    
    // Terapkan tema
    applyTheme(user.theme);
    
    // Reset state kuis untuk user baru
    resetQuiz();
    
    // Switch ke dashboard view
    switchView('dashboard');
    
    showNotification(`Selamat datang, ${user.name}!`);
}

// Terapkan Tema
function applyTheme(theme) {
    // Hapus semua kelas tema
    document.body.classList.remove('theme-void', 'theme-lamentis', 'theme-citadel');
    
    // Tambah kelas tema yang sesuai
    if (theme === 'void') {
        document.body.classList.add('theme-void');
    } else if (theme === 'lamentis') {
        document.body.classList.add('theme-lamentis');
    } else if (theme === 'citadel') {
        document.body.classList.add('theme-citadel');
    }
    // Tema TVA adalah default, jadi tidak perlu kelas
}

// Generate Kartu Karakter
function generateCharacterCards() {
    elements.charactersGrid.innerHTML = '';
    
    Characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.dataset.characterId = character.id;
        
        card.innerHTML = `
            <div class="character-image" style="background-color: ${character.color}20;">
                <div style="width: 80px; height: 80px; border-radius: 50%; background-color: ${character.color}; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; font-weight: bold;">
                    ${character.name.charAt(0)}
                </div>
            </div>
            <div class="character-content">
                <div class="character-name">${character.name}</div>
                <div class="character-description">
                    ${character.description}<br><br>
                    <em>"${character.quote}"</em>
                </div>
                <div class="character-action">PILIH KARAKTER INI</div>
            </div>
            <div class="lock-indicator" style="display: none;">
                <svg width="16" height="16" viewBox="0 0 16 16">
                    <path d="M4 4a4 4 0 1 1 8 0v2h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1V4zm2 2h4V4a2 2 0 1 0-4 0v2z" fill="currentColor"/>
                </svg>
                DIPANGKAS
            </div>
        `;
        
        card.addEventListener('click', () => selectCharacter(character.id));
        elements.charactersGrid.appendChild(card);
    });
}

// Update Akses Karakter berdasarkan user
function updateCharacterAccess() {
    const user = Users[AppState.currentUser];
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
        const characterId = card.dataset.characterId;
        const hasAccess = user.access.includes(characterId);
        
        if (hasAccess) {
            card.classList.remove('locked');
            card.querySelector('.lock-indicator').style.display = 'none';
            card.style.cursor = 'pointer';
        } else {
            card.classList.add('locked');
            card.querySelector('.lock-indicator').style.display = 'flex';
            card.style.cursor = 'not-allowed';
        }
    });
    
    // Tampilkan/sembunyikan tombol start quiz berdasarkan seleksi
    elements.startQuizBtn.style.display = AppState.selectedCharacter ? 'block' : 'none';
}

// Pilih Karakter
function selectCharacter(characterId) {
    const user = Users[AppState.currentUser];
    
    // Cek apakah karakter bisa diakses
    if (!user.access.includes(characterId)) {
        showNotification('Karakter ini telah dipangkas dari timeline Anda');
        return;
    }
    
    // Deselect semua karakter
    document.querySelectorAll('.character-card').forEach(card => {
        card.style.borderColor = 'var(--border-color)';
        card.querySelector('.character-action').textContent = 'PILIH KARAKTER INI';
    });
    
    // Select karakter yang diklik
    const selectedCard = document.querySelector(`[data-character-id="${characterId}"]`);
    selectedCard.style.borderColor = 'var(--accent-color)';
    selectedCard.querySelector('.character-action').textContent = '✓ DIPILIH';
    
    AppState.selectedCharacter = characterId;
    elements.startQuizBtn.style.display = 'block';
    
    const character = Characters.find(c => c.id === characterId);
    showNotification(`Anda memilih ${character.name}!`);
}

// Update Gauntlet Bar
function updateGauntletBar() {
    elements.stonesBar.innerHTML = '';
    
    InfinityStones.forEach(stone => {
        const stoneElement = document.createElement('div');
        stoneElement.className = 'stone-in-bar';
        stoneElement.style.backgroundColor = stone.color;
        stoneElement.title = `${stone.name}\n${stone.effect}\n${AppState.availableStones.includes(stone.id) ? 'Klik untuk gunakan!' : 'Sudah digunakan atau belum dikumpulkan'}`;
        stoneElement.dataset.stoneId = stone.id;
        stoneElement.textContent = stone.symbol;
        
        if (AppState.availableStones.includes(stone.id)) {
            stoneElement.addEventListener('click', () => useStone(stone.id));
        } else {
            stoneElement.classList.add('used');
        }
        
        elements.stonesBar.appendChild(stoneElement);
    });
}

// Gunakan Batu (Power-up)
function useStone(stoneId) {
    if (!AppState.availableStones.includes(stoneId)) return;
    
    const stone = InfinityStones.find(s => s.id === stoneId);
    const question = QuizQuestions[AppState.currentQuestionIndex];
    
    switch(stoneId) {
        case 'space': // 50/50
            const wrongOptions = [0, 1, 2].filter(i => i !== question.correctAnswer);
            const optionsToHide = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 2);
            
            document.querySelectorAll('.option').forEach((opt, index) => {
                if (optionsToHide.includes(index)) {
                    opt.classList.add('hidden');
                }
            });
            break;
            
        case 'mind': // Intip Jawaban
            showNotification(`Jawaban yang benar adalah: "${question.answerText}"`);
            break;
            
        case 'reality': // Auto-Win
            AppState.userAnswers[AppState.currentQuestionIndex] = question.correctAnswer;
            if (AppState.doublePointsActive) {
                AppState.quizScore += 2;
            } else {
                AppState.quizScore++;
            }
            elements.quizScore.textContent = AppState.quizScore;
            loadQuestion();
            break;
            
        case 'power': // Double Point
            AppState.doublePointsActive = true;
            showNotification('DOUBLE POINT AKTIF! Jawaban benar berikutnya akan bernilai 2 poin.');
            break;
            
        case 'time': // Freeze Timer
            if (AppState.timerInterval && !AppState.isTimerFrozen) {
                AppState.isTimerFrozen = true;
                elements.timer.classList.add('frozen');
                AppState.timeLeft += 15;
                elements.timer.textContent = AppState.timeLeft;
                
                setTimeout(() => {
                    AppState.isTimerFrozen = false;
                    elements.timer.classList.remove('frozen');
                }, 15000);
            }
            break;
            
        case 'soul': // Second Chance
            AppState.hasSecondChance = true;
            showNotification('SECOND CHANCE AKTIF! Anda boleh menjawab lagi jika salah.');
            break;
    }
    
    // Hapus batu dari available stones
    const index = AppState.availableStones.indexOf(stoneId);
    if (index > -1) {
        AppState.availableStones.splice(index, 1);
    }
    
    // Update UI
    updateGauntletBar();
    
    // Tampilkan pesan efek
    showNotification(`${stone.name} digunakan!\nEfek: ${stone.effect}`);
}

// Fungsi Kuis
function startQuiz() {
    if (!AppState.selectedCharacter) {
        showNotification('Silakan pilih karakter terlebih dahulu');
        return;
    }
    
    // Reset state kuis
    AppState.currentQuestionIndex = 0;
    AppState.userAnswers = new Array(QuizQuestions.length).fill(null);
    AppState.quizScore = 0;
    AppState.timeLeft = 100; // 100 DETIK
    AppState.isTimerFrozen = false;
    AppState.doublePointsActive = false;
    AppState.hasSecondChance = false;
    
    // Mulai timer
    startTimer();
    
    // Load pertanyaan pertama
    loadQuestion();
    
    // Switch ke quiz view
    switchView('quiz');
}

function startTimer() {
    if (AppState.timerInterval) {
        clearInterval(AppState.timerInterval);
    }
    
    AppState.timeLeft = 100;
    elements.timer.textContent = AppState.timeLeft;
    elements.timer.classList.remove('frozen');
    
    AppState.timerInterval = setInterval(() => {
        if (!AppState.isTimerFrozen) {
            AppState.timeLeft--;
            elements.timer.textContent = AppState.timeLeft;
            
            if (AppState.timeLeft <= 0) {
                clearInterval(AppState.timerInterval);
                timeUp();
            }
        }
    }, 1000);
}

function timeUp() {
    showNotification('Waktu habis! Kuis akan diselesaikan dengan skor saat ini.');
    calculateScore();
    saveQuizResult();
    showResults();
}

function loadQuestion() {
    const question = QuizQuestions[AppState.currentQuestionIndex];
    
    // Update UI
    elements.currentQuestion.textContent = AppState.currentQuestionIndex + 1;
    elements.quizScore.textContent = AppState.quizScore;
    elements.questionText.textContent = question.question;
    
    // Clear opsi sebelumnya
    elements.optionsContainer.innerHTML = '';
    
    // Tambah opsi baru
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        if (AppState.userAnswers[AppState.currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
        }
        optionElement.textContent = `${String.fromCharCode(65 + index)}) ${option}`;
        optionElement.addEventListener('click', () => selectAnswer(index));
        elements.optionsContainer.appendChild(optionElement);
    });
    
    // Update tombol navigasi
    elements.prevBtn.disabled = AppState.currentQuestionIndex === 0;
    elements.nextBtn.textContent = AppState.currentQuestionIndex === QuizQuestions.length - 1 ? 'Selesai' : 'Selanjutnya';
    
    // Cek jika ada stone yang harus ditempatkan di pertanyaan ini
    const questionNum = AppState.currentQuestionIndex + 1;
    const locationKey = `question${questionNum}`;
    if (!AppState.stonePlaces[locationKey] && AppState.collectedStones.length < 6) {
        // Cek apakah ini pertanyaan yang ditentukan untuk stone
        if ([1, 3, 5, 7, 9].includes(questionNum)) {
            setTimeout(() => placeStoneInLocation(locationKey), 300);
        }
    }
}

function selectAnswer(answerIndex) {
    // Jika sudah menjawab dan tidak ada second chance
    if (AppState.userAnswers[AppState.currentQuestionIndex] !== null && !AppState.hasSecondChance) {
        return;
    }
    
    const question = QuizQuestions[AppState.currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    // Tampilkan jawaban yang benar/salah
    options.forEach((opt, index) => {
        opt.classList.remove('selected', 'correct', 'incorrect');
        
        if (index === question.correctAnswer) {
            opt.classList.add('correct');
        } else if (index === answerIndex) {
            opt.classList.add('incorrect');
        }
    });
    
    // Jika jawaban benar
    if (answerIndex === question.correctAnswer) {
        if (AppState.doublePointsActive) {
            AppState.quizScore += 2;
            AppState.doublePointsActive = false; // Reset setelah digunakan
        } else {
            AppState.quizScore++;
        }
        elements.quizScore.textContent = AppState.quizScore;
    } 
    // Jika jawaban salah tapi ada second chance
    else if (AppState.hasSecondChance) {
        AppState.hasSecondChance = false;
        showNotification('Second chance digunakan! Coba jawab lagi.');
        return; // Biarkan user memilih lagi
    }
    
    // Simpan jawaban
    AppState.userAnswers[AppState.currentQuestionIndex] = answerIndex;
    
    // Aktifkan tombol next
    elements.nextBtn.disabled = false;
}

function showNextQuestion() {
    // Cek jika belum menjawab
    if (AppState.userAnswers[AppState.currentQuestionIndex] === null && 
        AppState.currentQuestionIndex < QuizQuestions.length - 1) {
        showNotification('Silakan pilih jawaban sebelum melanjutkan');
        return;
    }
    
    // Hitung skor jika ini pertanyaan terakhir
    if (AppState.currentQuestionIndex === QuizQuestions.length - 1) {
        clearInterval(AppState.timerInterval);
        calculateScore();
        saveQuizResult();
        showResults();
        return;
    }
    
    // Pindah ke pertanyaan berikutnya
    AppState.currentQuestionIndex++;
    loadQuestion();
}

function showPreviousQuestion() {
    if (AppState.currentQuestionIndex > 0) {
        AppState.currentQuestionIndex--;
        loadQuestion();
    }
}

function calculateScore() {
    let score = 0;
    
    QuizQuestions.forEach((question, index) => {
        if (AppState.userAnswers[index] === question.correctAnswer) {
            score++;
        }
    });
    
    AppState.quizScore = score;
}

function saveQuizResult() {
    const user = Users[AppState.currentUser];
    const percentage = Math.round((AppState.quizScore / QuizQuestions.length) * 100);
    const status = percentage >= 60 ? 'Menang' : 'Pruned';
    
    const result = {
        username: user.name,
        universe: AppState.currentUser,
        score: percentage,
        status: status,
        timestamp: new Date().toISOString(),
        stonesCollected: AppState.collectedStones.length
    };
    
    // Ambil data yang sudah ada dari localStorage
    let quizResults = JSON.parse(localStorage.getItem('lokiQuizResults') || '[]');
    
    // Tambah hasil baru
    quizResults.push(result);
    
    // Simpan kembali ke localStorage
    localStorage.setItem('lokiQuizResults', JSON.stringify(quizResults));
}

function showResults() {
    // Hitung persentase
    const percentage = Math.round((AppState.quizScore / QuizQuestions.length) * 100);
    
    // Update UI
    elements.finalScore.textContent = `${percentage}%`;
    
    // Generate pesan hasil
    let message = '';
    if (AppState.collectedStones.length === 6) {
        message = `REALITAS DITULIS ULANG! Anda mengumpulkan semua Infinity Stones dan menggunakan Snap untuk menguasai garis waktu. Skor Anda: ${AppState.quizScore}/10 (100%).`;
    } else if (percentage >= 80) {
        message = `VARIAN LUAR BIASA! Pengetahuan Anda tentang Garis Waktu Suci mengesankan. Skor Anda: ${AppState.quizScore}/10.`;
    } else if (percentage >= 60) {
        message = `VARIAN MEMUASKAN. Anda memiliki pengetahuan dasar tentang peristiwa garis waktu. Skor Anda: ${AppState.quizScore}/10.`;
    } else {
        message = `PENYIMPANGAN GARIS WAKTU TERDETEKSI. Pengetahuan Anda memerlukan pemangkasan. Skor Anda: ${AppState.quizScore}/10.`;
    }
    
    elements.resultMessage.textContent = message;
    
    // Tampilkan batu yang dikumpulkan
    elements.stonesCollected.innerHTML = '';
    InfinityStones.forEach(stone => {
        const stoneElement = document.createElement('div');
        stoneElement.className = 'stone-result';
        stoneElement.style.backgroundColor = stone.color;
        stoneElement.textContent = AppState.collectedStones.includes(stone.id) ? '✓' : '✗';
        stoneElement.title = stone.name;
        elements.stonesCollected.appendChild(stoneElement);
    });
    
    // Switch ke results view
    switchView('results');
}

// Fungsi Snap (Ultimate)
function performSnap() {
    if (AppState.collectedStones.length < 6) return;
    
    // Kocok layar
    document.body.classList.add('shake');
    setTimeout(() => {
        document.body.classList.remove('shake');
    }, 500);
    
    // Auto-selesaikan kuis dengan skor sempurna
    QuizQuestions.forEach((_, index) => {
        AppState.userAnswers[index] = QuizQuestions[index].correctAnswer;
    });
    
    AppState.quizScore = QuizQuestions.length;
    
    // Hentikan timer
    clearInterval(AppState.timerInterval);
    
    // Simpan hasil dan tampilkan
    saveQuizResult();
    showResults();
    
    showNotification('SNAP! Realitas telah ditulis ulang...');
}

// Fungsi Admin
function showAdminDashboard() {
    switchView('admin');
}

function loadAdminData() {
    const quizResults = JSON.parse(localStorage.getItem('lokiQuizResults') || '[]');
    
    elements.adminTableBody.innerHTML = '';
    
    if (quizResults.length === 0) {
        elements.adminTableBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 30px;">
                    Tidak ada data varian yang menyelesaikan penilaian.
                </td>
            </tr>
        `;
        return;
    }
    
    // Tampilkan data terbaru di atas
    quizResults.reverse().forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.username}</td>
            <td>${result.universe}</td>
            <td>${result.score}%</td>
            <td class="status-${result.status.toLowerCase()}">${result.status}</td>
        `;
        elements.adminTableBody.appendChild(row);
    });
}

function resetTimelineData() {
    if (confirm('Anda yakin ingin mereset semua data garis waktu? Tindakan ini tidak dapat dibatalkan.')) {
        localStorage.removeItem('lokiQuizResults');
        
        // Hapus semua data posisi draggable
        localStorage.removeItem('draggable_gauntlet-container');
        localStorage.removeItem('draggable_timer-container');
        
        loadAdminData();
        showNotification('Semua data garis waktu telah direset.');
    }
}

// Fungsi Utility
function resetQuiz() {
    // Reset state kuis tapi pertahankan batu yang dikumpulkan
    AppState.currentQuestionIndex = 0;
    AppState.userAnswers = new Array(QuizQuestions.length).fill(null);
    AppState.quizScore = 0;
    AppState.selectedCharacter = null;
    AppState.timeLeft = 100;
    AppState.isTimerFrozen = false;
    AppState.doublePointsActive = false;
    AppState.hasSecondChance = false;
    
    // Reset stone places untuk kuis baru
    AppState.stonePlaces = {
        dashboard: AppState.stonePlaces.dashboard, // Pertahankan stone dashboard
        question1: null,
        question2: null,
        question3: null,
        question4: null,
        question5: null
    };
    
    // Hentikan timer
    if (AppState.timerInterval) {
        clearInterval(AppState.timerInterval);
    }
    
    // Reset UI seleksi karakter
    document.querySelectorAll('.character-card').forEach(card => {
        card.style.borderColor = 'var(--border-color)';
        if (!card.classList.contains('locked')) {
            card.querySelector('.character-action').textContent = 'PILIH KARAKTER INI';
        }
    });
    
    // Sembunyikan tombol start quiz
    elements.startQuizBtn.style.display = 'none';
    
    // Update gauntlet bar
    updateGauntletBar();
    
    // Switch ke dashboard
    switchView('dashboard');
}

function returnToDashboard() {
    resetQuiz();
    switchView('dashboard');
}

function returnToDashboardFromAdmin() {
    switchView('dashboard');
}

function handleLogout() {
    // Reset app state
    AppState.currentUser = null;
    AppState.collectedStones = [];
    AppState.availableStones = [];
    AppState.currentQuestionIndex = 0;
    AppState.userAnswers = [];
    AppState.quizScore = 0;
    AppState.selectedCharacter = null;
    AppState.timeLeft = 100;
    AppState.stonePlaces = {
        dashboard: null,
        question1: null,
        question2: null,
        question3: null,
        question4: null,
        question5: null
    };
    
    // Reset status batu
    InfinityStones.forEach(stone => {
        stone.collected = false;
    });
    
    // Hentikan timer
    if (AppState.timerInterval) {
        clearInterval(AppState.timerInterval);
    }
    
    // Reset UI
    elements.usernameInput.value = '';
    elements.passwordInput.value = '';
    elements.snapButton.style.display = 'none';
    
    // Hapus semua batu dari UI
    document.querySelectorAll('.hidden-stone').forEach(stone => stone.remove());
    
    // Reset tema
    document.body.classList.remove('theme-void', 'theme-lamentis', 'theme-citadel');
    
    // Switch ke login view
    switchView('login');
}

// Inisialisasi app saat DOM dimuat
document.addEventListener('DOMContentLoaded', initApp);