document.addEventListener("DOMContentLoaded", function () {
    // Setup
    const navbar = document.getElementById("mainNavbar");
    const navbarSnapBtn = document.getElementById("navbarSnapBtn");
    const btnKeluar = document.getElementById("btnKeluar");
    const userGreeting = document.getElementById("userGreeting");
    const btnStartTrue = document.getElementById("btnStartTrue");
    const btnStartFalse = document.getElementById("btnStartFalse");
    
    // State
    let selectedCharacter = null;
    let usedStones = [];

    // Check login status
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = "../index.html";
        return;
    }

    // Update UI
    userGreeting.textContent = `Hai, ${currentUser}!`;
    updateNavbarStones();

    // --- DATA LENGKAP VARIAN LOKI (Update Final) ---
    // Ganti variable 'lokiData' yang lama dengan 'lokiVariants' ini
    // Pastikan folder 'char' ada di dalam folder 'assets'
    const lokiVariants = {
        'default': { 
            name: "Loki Laufeyson",
            shortDesc: "God of Mischief, ahli sihir.",
            fullDesc: "Loki adalah God of Mischief, putra angkat Odin dan saudara angkat Thor. Dia adalah ahli sihir dan ilusionis yang terampil, sering menggunakan kecerdasannya untuk menipu musuhnya.",
            abilities: ["Illusion Manipulation", "Master Tactician", "Shape-shifting", "Mind Influence"],
            // Mengarah ke file: Loki_-_Loki.png
            imgCard: "../assets/char/Loki_-_Loki.png", 
            imgModal: "../assets/char/Loki_-_Loki.png"
        },
        'sylvie': { 
            name: "Sylvie Laufeydottir",
            shortDesc: "Varian perempuan, ahli enchantment.",
            fullDesc: "Sylvie adalah varian Loki perempuan yang menghabiskan sebagian besar hidupnya melarikan diri dari TVA. Dia memiliki kemampuan enchantment yang kuat dan tekad yang kuat untuk membalas dendam.",
            abilities: ["Enchantment", "Shapeshifting", "Telekinesis", "Genius Intellect"],
            // Mengarah ke file: Loki_-_Sylvie_Laufeydottir.png
            imgCard: "../assets/char/Loki_-_Sylvie_Laufeydottir.png",
            imgModal: "../assets/char/Loki_-_Sylvie_Laufeydottir.png"
        },
        'classic': { 
            name: "Classic Loki",
            shortDesc: "Master ilusi yang selamat dari Thanos.",
            fullDesc: "Varian Loki yang selamat dari pertemuan dengan Thanos dengan menciptakan ilusi kematiannya sendiri. Dia menghabiskan berabad-abad dalam pengasingan sebelum membantu Loki dan Sylvie.",
            abilities: ["Advanced Illusion", "Telekinesis", "Perfect Shapeshifting", "Intense Intelligence"],
            // Mengarah ke file: Loki_-_Classic_Loki.png
            imgCard: "../assets/char/Loki_-_Classic_Loki.png",
            imgModal: "../assets/char/Loki_-_Classic_Loki.png"
        },
        'boastful': { 
            name: "Boastful Loki",
            shortDesc: "Loki yang memegang palu (palsu?).",
            fullDesc: "Setelah ditangkap dan diadili oleh TVA, realitasnya dihancurkan, dan dia sendiri 'dipangkas' (pruned), yang berarti dia dikirim ke Void.",
            abilities: ["Superhuman Strength", "Conjuration", "Illusion Casting", "Master Manipulator"],
            // Mengarah ke file: Loki_-_Boastful_Loki.png
            imgCard: "../assets/char/Loki_-_Boastful_Loki.png",
            imgModal: "../assets/char/Loki_-_Boastful_Loki.png"
        },
        'alligator': { 
            name: "Alligator Loki",
            shortDesc: "Loki berbentuk buaya.",
            fullDesc: "Alasan TVA menangkap Alligator Loki dari garis waktu suci adalah karena dia memakan kucing tetangga yang salah. Tindakan kecil ini menyebabkan percabangan yang signifikan.",
            abilities: ["Enhanced Intelligence", "Superalligator Speed", "Superalligator Strength", "Sharp Teeth"],
            // Mengarah ke file: Loki_-_Alligator_Loki.png
            imgCard: "../assets/char/Loki_-_Alligator_Loki.png",
            imgModal: "../assets/char/Loki_-_Alligator_Loki.png"
        },
        'kid': { 
            name: "Kid Loki",
            shortDesc: "Raja Void yang membunuh Thor.",
            fullDesc: "Kid Loki melakukan tindakan yang sangat mengejutkan dan mengerikan yang menyebabkan pencabangan Garis Waktu Suci: ia membunuh saudara angkatnya, Thor.",
            abilities: ["Illusion Magic", "Beast Taming", "Conjuration", "Killed Thor"],
            // Mengarah ke file: Loki_-_Kid_Loki.png
            imgCard: "../assets/char/Loki_-_Kid_Loki.png",
            imgModal: "../assets/char/Loki_-_Kid_Loki.png"
        },
        'president': { 
            name: "President Loki",
            shortDesc: "Pemenang pemilu yang licik.",
            fullDesc: "President Loki berasal dari garis waktu alternatif di mana ia berhasil menjadi presiden, yang menyebabkan terciptanya 'Nexus Event' yang menyimpang dari Sacred Timeline.",
            abilities: ["Basic Magic", "Cold Immunity", "Genius Intellect", "Mastery of Manipulation"],
            // Mengarah ke file: Loki_-_President_Loki.png
            imgCard: "../assets/char/Loki_-_President_Loki.png",
            imgModal: "../assets/char/Loki_-_President_Loki.png"
        }
    };

    // --- LOGIKA UPDATE TAMPILAN (HOME & MODAL) ---
    // Gunakan 'default' jika user tidak ada di list
    const userData = lokiVariants[currentUser] || lokiVariants['default'];

    if (userData) {
        // 1. Update Kartu di Halaman Depan
        const cardImg = document.getElementById("dynamicLokiImg"); 
        const cardName = document.getElementById("dynamicLokiName");
        const cardDesc = document.getElementById("dynamicLokiDesc");

        if(cardImg) cardImg.src = userData.imgCard;
        if(cardName) cardName.textContent = userData.name;
        if(cardDesc) cardDesc.textContent = userData.shortDesc;

        // 2. Update Isi Modal Detail (Baca Selengkapnya)
        const modalImg = document.getElementById("dyn-img");
        const modalTitle = document.getElementById("dyn-title");
        const modalDesc = document.getElementById("dyn-desc");
        
        // Gunakan imgCard jika imgModal kosong/tidak ada
        if(modalImg) modalImg.src = userData.imgModal || userData.imgCard; 
        if(modalTitle) modalTitle.textContent = userData.name;
        if(modalDesc) modalDesc.textContent = userData.fullDesc;

        // 3. Update Ability Buttons
        if(userData.abilities) {
            for(let i = 0; i < 4; i++) {
                const abilityBtn = document.getElementById(`dyn-ability-${i+1}`);
                if(abilityBtn) {
                    // Isi teks ability, atau strip (-) jika kosong
                    abilityBtn.textContent = userData.abilities[i] || "-";
                }
            }
        }
        
        // Efek visual tambahan (Opsional)
        if(cardImg && currentUser !== 'default') {
             cardImg.style.filter = "sepia(20%) contrast(1.1)";
        }
    }

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

    // Pilih karakter
    window.selectCharacter = function(el) {
        document.querySelectorAll('.btn-select').forEach(b => {
            b.classList.remove('selected');
            b.innerText = "Pilih Karakter Ini";
            b.disabled = false;
        });
        el.classList.add('selected');
        el.innerText = "✓ TERPILIH";
        el.disabled = true;
        
        btnStartFalse.style.display = 'none';
        btnStartTrue.style.display = 'flex';
        selectedCharacter = el.closest('.card').querySelector('h3').textContent;
        
        showAlert(`Karakter "${selectedCharacter}" Terpilih!`, "success");
    };

    // Mulai quiz
    btnStartTrue.addEventListener("click", () => {
        if (selectedCharacter) {
            window.location.href = "../quiz/index.html";
        } else {
            showAlert("Pilih karakter terlebih dahulu!", "warning");
        }
    });

    // Logout
    btnKeluar.addEventListener("click", () => {
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem('loki_stones');
        window.location.href = "../index.html";
    });

    // Modal functions
    window.openModal = (id) => {
        document.getElementById(id).style.display = 'flex';
    };
    
    window.closeModal = (id) => {
        document.getElementById(id).style.display = 'none';
    };
    
    // Close modal ketika klik diluar
    window.onclick = (e) => {
        if(e.target.classList.contains('modal-overlay')) {
            e.target.style.display = 'none';
        }
    };
});