document.addEventListener("DOMContentLoaded", function () {
    // --- SETUP ---
    const userGreeting = document.getElementById("userGreeting");
    const btnKeluar = document.getElementById("btnKeluar");
    const btnStartTrue = document.getElementById("btnStartTrue");
    const btnStartFalse = document.getElementById("btnStartFalse");
    const navbarSnapBtn = document.getElementById("navbarSnapBtn");

    // --- CEK LOGIN ---
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = "../index.html";
        return;
    }
    userGreeting.textContent = `Hai, ${currentUser}!`;

    // --- 1. DATA DARI ADMIN ---
    const STORAGE_KEY = 'loki_db_integrated_v1'; 
    const defaultData = [{ id: 1, name: "Loki Laufeyson", shortDesc: "God of Mischief.", image: "Loki_-_Loki.png", abilities: ["Sorcery"] }];

    function getCharacters() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultData;
    }

    // --- 2. FILTER LOGIC (Varian vs Umum) ---
    // List Nama Varian Loki (Karakter yang saling menggantikan)
    const lokiVariantNames = [
        "Loki Laufeyson", "Sylvie Laufeydottir", "Classic Loki", 
        "Boastful Loki", "Alligator Loki", "Kid Loki", "President Loki"
    ];

    // Mapping User -> Nama Karakter
    const userMapping = {
        'default': 'Loki Laufeyson',
        'sylvie': 'Sylvie',
        'classic': 'Classic',
        'boastful': 'Boastful',
        'alligator': 'Alligator',
        'kid': 'Kid',
        'president': 'President'
    };

    // --- 3. RENDER GRID ---
    function renderUserGrid() {
        const grid = document.getElementById('userGrid');
        grid.innerHTML = '';
        const allChars = getCharacters();

        // Tentukan Kata Kunci Karakter User
        const myCharKeyword = userMapping[currentUser] || 'Loki Laufeyson';

        // FILTER: Tampilkan jika (Ini Karakter User) ATAU (Bukan Varian Loki)
        const visibleChars = allChars.filter(char => {
            const isMyChar = char.name.toLowerCase().includes(myCharKeyword.toLowerCase());
            const isVariant = lokiVariantNames.some(vName => char.name.includes(vName));
            return isMyChar || !isVariant;
        });

        if (visibleChars.length === 0) {
            grid.innerHTML = '<p style="color:white;">Tidak ada data karakter.</p>';
            return;
        }

        visibleChars.forEach(char => {
            const imgPath = `../assets/char/${char.image}`;
            
            // Cek Highlight
            const isMyChar = char.name.toLowerCase().includes(myCharKeyword.toLowerCase());
            const borderStyle = isMyChar ? "border: 2px solid #ffd966; box-shadow: 0 0 20px rgba(255, 217, 102, 0.4);" : "";
            const badge = isMyChar ? `` : "";

            // HTML menggunakan class dari style.css (.card, .buttonmain, dll)
            // Style inline ditambahkan sedikit untuk object-position agar kepala tidak kepotong
            const cardHTML = `
                <div class="card" style="${borderStyle}">
                    <img src="${imgPath}" class="card-img" style="object-position: top center;" onerror="this.src='https://via.placeholder.com/375x250?text=No+Image'">
                    
                    <div class="card-body">
                        ${badge}
                        <h3>${char.name}</h3>
                        <p class="desc-short" style="color:#ccc; font-size:14px; margin-bottom:10px;">${char.shortDesc}</p>
                        
                        <div class="btn-read" style="color:#f5972d; text-decoration:underline; cursor:pointer; font-weight:bold; margin-bottom:15px;" onclick="openDetail(${char.id})">Baca Selengkapnya</div>
                        
                        <div class="btn-select" style="
                            width:100%; padding:10px; background:linear-gradient(90deg, #ffd966, #f5972d); 
                            border-radius:8px; color:#1e1e1e; font-weight:bold; text-align:center; cursor:pointer;
                            transition: transform 0.2s;" 
                            onclick="selectCharacter(this, '${char.name}')">
                            Pilih Karakter Ini
                        </div>
                    </div>
                </div>
            `;
            grid.innerHTML += cardHTML;
        });
    }

    // --- 4. SELECT CHARACTER ---
    let selectedCharacterName = null;

    window.selectCharacter = function(btn, charName) {
        // Reset Style
        document.querySelectorAll('.btn-select').forEach(b => {
            b.style.background = "linear-gradient(90deg, #ffd966, #f5972d)";
            b.style.color = "#1e1e1e";
            b.textContent = "Pilih Karakter Ini";
        });

        // Active Style
        btn.style.background = "#3c1800";
        btn.style.color = "#ffd966";
        btn.style.border = "1px solid #ffd966";
        btn.textContent = "✓ TERPILIH";
        
        selectedCharacterName = charName;
        
        // Show Start Button
        btnStartFalse.style.display = 'none';
        btnStartTrue.style.display = 'flex';
        
        showAlert(`Kamu memilih ${charName}!`, "success");
    };

    btnStartTrue.addEventListener("click", () => {
        if (selectedCharacterName) {
            sessionStorage.setItem('selectedChar', selectedCharacterName);
            window.location.href = "../quiz/index.html";
        }
    });

    // --- 5. MODAL DETAIL ---
    window.openModal = (id) => document.getElementById(id).style.display = 'flex';
    window.closeModal = (id) => document.getElementById(id).style.display = 'none';

    window.openDetail = (id) => {
        const char = getCharacters().find(c => c.id === id);
        if(char) {
            document.getElementById('detailImg').src = `../assets/char/${char.image}`;
            document.getElementById('detailName').textContent = char.name;
            document.getElementById('detailDesc').textContent = char.longDesc;
            
            const abilityGrid = document.getElementById('detailAbilities');
            abilityGrid.innerHTML = '';
            
            if(char.abilities && char.abilities.length > 0) {
                char.abilities.forEach(ab => {
                    const div = document.createElement('div');
                    // Style ability box inline agar rapi tanpa css tambahan
                    div.style.cssText = "background:#3c1800; border:2px solid #ffd966; border-radius:10px; padding:10px; color:white; font-size:14px; display:flex; align-items:center;";
                    div.innerHTML = `<span style="color:#ffd966; margin-right:8px; font-size:20px;">•</span> ${ab}`;
                    abilityGrid.appendChild(div);
                });
            } else {
                abilityGrid.innerHTML = '<div style="color:#aaa;">Tidak ada data kemampuan.</div>';
            }
            openModal('modalDetail');
        }
    };

    window.onclick = (e) => {
        if(e.target.id === 'modalDetail') e.target.style.display = 'none';
    };

    // --- UTILS ---
    btnKeluar.addEventListener("click", () => {
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem('loki_stones');
        window.location.href = "../index.html";
    });

    function showAlert(message, type = "success") {
        const alertDiv = document.getElementById("validationAlert");
        if(alertDiv) {
            alertDiv.textContent = message;
            alertDiv.className = `validation-alert ${type}`;
            alertDiv.style.display = 'block';
            setTimeout(() => { alertDiv.style.display = 'none'; }, 2000);
        } else {
            alert(message);
        }
    }

    updateNavbarStones();
    function updateNavbarStones() {
        const collectedStones = JSON.parse(localStorage.getItem('loki_stones') || '[]');
        const stoneIds = ['power','space','reality','soul','time','mind'];
        stoneIds.forEach(id => {
            const el = document.getElementById(`nav-${id}`);
            if(el) {
                if(collectedStones.includes(id)) {
                    el.classList.remove('locked'); el.classList.add('unlocked'); el.style.filter = "grayscale(0%)";
                } else {
                    el.classList.add('locked'); el.style.filter = "grayscale(100%) opacity(0.5)";
                }
            }
        });
        if (collectedStones.length === 6 && navbarSnapBtn) {
            navbarSnapBtn.style.display = "block";
            navbarSnapBtn.addEventListener('click', () => window.location.href = "../result/index.html?snap=true");
        }
    }

    renderUserGrid();
});