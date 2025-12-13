document.addEventListener("DOMContentLoaded", function () {
    // Setup
    const quizSection = document.getElementById("quizSection");
    const navbar = document.getElementById("mainNavbar");
    const navbarSnapBtn = document.getElementById("navbarSnapBtn");
    const userGreeting = document.getElementById("userGreeting");
    const btnKeluar = document.getElementById("btnKeluar");
    
    // State
    let selectedAnswers = Array(10).fill(null);
    let currentQuestionIndex = 0;
    let score = 0;
    let usedStones = [];
    let timeStoneActive = false;

    // Check login status
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = "../index.html";
        return;
    }

    // Update UI
    userGreeting.textContent = `Hai, ${currentUser}!`;
    updateNavbarStones();

    // Questions
    const questions = [
        { q: "Apa kepanjangan dari TVA?", options: ["A) Time Variance Authority", "B) Time Violation Agency", "C) Total Variance Action"], answer: 0 },
        { q: "Siapa nama monster awan di The Void?", options: ["A) Galactus", "B) Alioth", "C) Mephisto"], answer: 1 },
        { q: "Apa kendaraan impian Mobius?", options: ["A) Motor", "B) Pesawat", "C) Jet Ski"], answer: 2 },
        { q: "Di mana Sylvie bersembunyi?", options: ["A) The Void", "B) Kiamat (Apocalypses)", "C) Asgard"], answer: 1 },
        { q: "Siapa nama maskot jam TVA?", options: ["A) Miss Minutes", "B) Jam Gadang", "C) Time Tina"], answer: 0 },
        { q: "Mana yang BUKAN varian Loki?", options: ["A) Alligator Loki", "B) President Loki", "C) Thor Loki"], answer: 2 },
        { q: "Pencipta TVA sebenarnya?", options: ["A) Time Keepers", "B) He Who Remains", "C) Odin"], answer: 1 },
        { q: "Nomor tahanan Loki?", options: ["A) L1130", "B) L616", "C) L999"], answer: 0 },
        { q: "Cara mengalahkan Alioth?", options: ["A) Kekuatan", "B) Sihir (Enchantment)", "C) Batu Akik"], answer: 1 },
        { q: "Kejadian apa yang memicu Nexus Event di Lamentis?", options: ["A) Saling membunuh", "B) Jatuh cinta", "C) Menemukan Tesseract"], answer: 1 }
    ];

    // Stone locations
    const stoneLocations = {
        1: { id: 'power', img: '../assets/source/Power_Stone_VFX.png', name: 'Power Stone' },
        2: { id: 'time', img: '../assets/source/Time_Stone_VFX.png', name: 'Time Stone' },
        4: { id: 'reality', img: '../assets/source/Reality_Stone_VFX.png', name: 'Reality Stone' },
        6: { id: 'space', img: '../assets/source/Space_Stone_VFX.png', name: 'Space Stone' },
        7: { id: 'mind', img: '../assets/source/Mind_Stone_VFX.png', name: 'Mind Stone' },
        8: { id: 'soul', img: '../assets/source/Soul_Stone_VFX.png', name: 'Soul Stone' }
    };

    // Fungsi alert
    function showAlert(message, type = "error") {
        const alertDiv = document.getElementById("validationAlert");
        if(alertDiv) {
            alertDiv.textContent = message;
            alertDiv.className = `validation-alert ${type}`;
            alertDiv.style.display = 'block';
            setTimeout(() => { alertDiv.style.display = 'none'; }, 3000);
        } else {
            alert(message);
        }
    }

    // Update navbar stones
    function updateNavbarStones() {
        const collectedStones = JSON.parse(localStorage.getItem('loki_stones') || '[]');
        
        ['power','space','reality','soul','time','mind'].forEach(id => {
            const el = document.getElementById(`nav-${id}`);
            if(el) {
                el.classList.remove('locked', 'unlocked', 'used');
                if(collectedStones.includes(id)) {
                    if(usedStones.includes(id)) {
                        el.classList.add('used');
                    } else {
                        el.classList.add('unlocked');
                    }
                } else {
                    el.classList.add('locked');
                }
            }
        });

        // SNAP BUTTON LOGIC
        if (collectedStones.length === 6 && usedStones.length === 0 && navbarSnapBtn) {
            navbarSnapBtn.style.display = "block"; 
        } else if (navbarSnapBtn) {
            navbarSnapBtn.style.display = "none";
        }
    }

    // Event SNAP
    if(navbarSnapBtn) {
        navbarSnapBtn.addEventListener("click", () => {
            // Flash Effect
            document.body.style.transition = "filter 0.5s";
            document.body.style.filter = "brightness(5) contrast(2)"; 
            
            setTimeout(() => {
                document.body.style.filter = "none";
                
                // Redirect ke result dengan snap
                window.location.href = "../result/index.html?snap=true";
                
                // RESET TOTAL (Hangus)
                localStorage.removeItem('loki_stones');
                usedStones = [];
                updateNavbarStones(); 
            }, 1000);
        });
    }

    // Load question
    function loadQuestion() {
        const q = questions[currentQuestionIndex];
        document.getElementById("questionNumber").textContent = `Pertanyaan ${currentQuestionIndex + 1} dari ${questions.length}`;
        document.getElementById("questionText").textContent = q.q;
        
        const container = document.getElementById("optionsContainer");
        container.innerHTML = ""; 

        q.options.forEach((opt, index) => {
            const btn = document.createElement("button");
            btn.className = "option-btn";
            btn.textContent = opt;
            btn.onclick = () => selectAnswer(index);
            container.appendChild(btn);
        });

        document.getElementById("quizFeedback").style.display = 'none';
        document.getElementById("correctAnswerText").style.display = 'none';
        
        // Update progress bar
        const pct = ((currentQuestionIndex + 1) / questions.length) * 100;
        document.getElementById("quizProgressBar").style.width = pct + "%";
        
        // Check stone spawn
        checkStoneSpawn(currentQuestionIndex);

        // Restore previous selection
        if (selectedAnswers[currentQuestionIndex] !== null) {
            const btns = document.querySelectorAll('.option-btn');
            btns[selectedAnswers[currentQuestionIndex]].classList.add('selected');
            checkAnswer(false);
        }
    }

    // Select answer
    function selectAnswer(index) {
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('selected', 'wrong-answer', 'correct-answer');
            btn.disabled = false;
        });
        
        document.querySelectorAll('.option-btn')[index].classList.add('selected');
        selectedAnswers[currentQuestionIndex] = index;
        document.getElementById("btnNextQuiz").disabled = false;
        
        setTimeout(() => checkAnswer(true), 100);
    }

    // Check answer
    function checkAnswer(showFeedback = true) {
        if (selectedAnswers[currentQuestionIndex] === null) return;
        
        const q = questions[currentQuestionIndex];
        const isCorrect = selectedAnswers[currentQuestionIndex] === q.answer;
        
        // Update button styles
        document.querySelectorAll('.option-btn').forEach((btn, idx) => {
            if(idx === q.answer) btn.classList.add('correct-answer');
            if(idx === selectedAnswers[currentQuestionIndex] && !isCorrect) btn.classList.add('wrong-answer');
            btn.disabled = true;
            btn.style.cursor = 'not-allowed';
        });

        if (showFeedback) {
            const feedback = document.getElementById("quizFeedback");
            feedback.style.display = 'block';
            
            if (isCorrect) {
                let points = timeStoneActive ? 2 : 1;
                score += points; 
                feedback.textContent = timeStoneActive ? "TIME STONE! +2 Poin" : "BENAR! +1 Poin";
                feedback.className = "quiz-feedback correct";
                timeStoneActive = false; 
            } else {
                feedback.textContent = "SALAH!";
                feedback.className = "quiz-feedback incorrect";
                if(timeStoneActive) { 
                    showAlert("Efek Time Stone hangus!", "warning"); 
                    timeStoneActive = false; 
                }
            }
            
            document.getElementById("scoreDisplay").textContent = `Skor: ${score}/${questions.length}`;
        }
    }

    // Next question
    document.getElementById("btnNextQuiz").addEventListener("click", () => {
        // VALIDASI: HARUS JAWAB DULU
        if (selectedAnswers[currentQuestionIndex] === null) {
            showAlert("Pilih jawaban terlebih dahulu!", "warning");
            return;
        }

        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            // Quiz selesai, redirect ke result
            const finalScore = Math.round((score / questions.length) * 100);
            window.location.href = `../result/index.html?score=${finalScore}`;
        }
    });
    
    // Previous question
    document.getElementById("btnPrevQuiz").addEventListener("click", () => {
        if(currentQuestionIndex > 0) { 
            currentQuestionIndex--; 
            loadQuestion(); 
        }
    });

    // Check stone spawn
    function checkStoneSpawn(idx) {
        const area = document.getElementById("stoneSpawnArea");
        area.innerHTML = "";
        
        if(stoneLocations[idx]) {
            const data = stoneLocations[idx];
            const collected = JSON.parse(localStorage.getItem('loki_stones') || '[]');
            
            if(!collected.includes(data.id)) {
                const img = document.createElement("img");
                img.src = data.img;
                img.className = "collectable-stone";
                img.onclick = function() { 
                    this.style.transform = "scale(0) rotate(360deg)";
                    this.style.opacity = "0";
                    
                    setTimeout(() => {
                        this.remove();
                        const nowCollected = JSON.parse(localStorage.getItem('loki_stones') || '[]');
                        if(!nowCollected.includes(data.id)) {
                            nowCollected.push(data.id);
                            localStorage.setItem('loki_stones', JSON.stringify(nowCollected));
                            updateNavbarStones(); 
                            showAlert(`${data.name.toUpperCase()} DIDAPATKAN!`, "success");
                        }
                    }, 500);
                };
                area.appendChild(img);
            }
        }
    }

    // Power up logic
    window.activatePowerUp = function(stoneId) {
        const collected = JSON.parse(localStorage.getItem('loki_stones') || '[]');
        if(!collected.includes(stoneId)) {
            showAlert("Batu belum ditemukan!", "error");
            return;
        }
        
        if(usedStones.includes(stoneId)) {
            showAlert("Kekuatan batu habis!", "warning");
            return;
        }

        let success = false;
        
        if(stoneId === 'power') { 
            if(selectedAnswers[currentQuestionIndex] !== null) {
                showAlert("Sudah dijawab!", "warning");
                return;
            }
            selectAnswer(questions[currentQuestionIndex].answer); 
            showAlert("POWER STONE AKTIF!", "powerup"); 
            success = true;
        } 
        else if(stoneId === 'space') {
            if(selectedAnswers[currentQuestionIndex] !== null) {
                showAlert("Sudah dijawab!", "warning");
                return;
            }
            const correctIdx = questions[currentQuestionIndex].answer;
            const options = document.querySelectorAll('.option-btn');
            let removed = 0;
            
            [0,1,2].sort(()=>Math.random()-0.5).forEach(idx => { 
                if(idx !== correctIdx && removed < 2) { 
                    options[idx].classList.add('option-hidden'); 
                    removed++; 
                }
            });
            
            showAlert("SPACE STONE AKTIF!", "powerup"); 
            success = true;
        } 
        else if(stoneId === 'reality') {
            if(selectedAnswers[currentQuestionIndex] !== null) return;
            
            const correctIdx = questions[currentQuestionIndex].answer;
            document.querySelectorAll('.option-btn').forEach((btn, idx) => { 
                btn.innerHTML += ` <span style='color: #ffffffff; font-size:16px'>(${idx === correctIdx ? "95%" : Math.floor(Math.random()*30)+"%"})</span>`; 
            });
            
            showAlert("REALITY STONE AKTIF!", "powerup"); 
            success = true;
        } 
        else if(stoneId === 'time') {
            if(selectedAnswers[currentQuestionIndex] !== null) {
                showAlert("Terlambat!", "warning");
                return;
            }
            timeStoneActive = true; 
            showAlert("TIME STONE AKTIF!", "powerup"); 
            success = true;
        } 
        else if(stoneId === 'soul') {
            const myAns = selectedAnswers[currentQuestionIndex];
            const realAns = questions[currentQuestionIndex].answer;
            
            if(myAns !== null && myAns !== realAns) {
                score++; 
                document.getElementById("scoreDisplay").textContent = `Skor: ${score}/${questions.length}`;
                document.querySelectorAll('.option-btn')[myAns].classList.remove('wrong-answer');
                document.querySelectorAll('.option-btn')[realAns].classList.add('correct-answer');
                
                document.getElementById("quizFeedback").textContent = "SOUL STONE: DIKOREKSI!";
                document.getElementById("quizFeedback").className = "quiz-feedback correct";
                selectedAnswers[currentQuestionIndex] = realAns; 
                
                showAlert("SOUL STONE AKTIF!", "powerup"); 
                success = true;
            } else {
                showAlert("Hanya jika SALAH!", "warning");
            }
        } 
        else if(stoneId === 'mind') {
            if(currentQuestionIndex === 0) {
                showAlert("Tidak ada soal sebelumnya.", "warning");
                return;
            }
            
            const prevIdx = currentQuestionIndex - 1;
            if(selectedAnswers[prevIdx] !== questions[prevIdx].answer) {
                score++; 
                selectedAnswers[prevIdx] = questions[prevIdx].answer;
                document.getElementById("scoreDisplay").textContent = `Skor: ${score}/${questions.length}`;
                showAlert("MIND STONE AKTIF!", "powerup"); 
                success = true;
            } else { 
                showAlert("Masa lalu sudah benar.", "warning"); 
                success = true; 
            }
        }

        if(success) { 
            usedStones.push(stoneId); 
            updateNavbarStones();
        }
    };

    // Logout
    btnKeluar.addEventListener("click", () => {
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem('loki_stones');
        window.location.href = "../index.html";
    });

    // Load first question
    loadQuestion();
});