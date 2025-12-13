document.addEventListener("DOMContentLoaded", function () {
    // 1. CEK LOGIN
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser || currentUser !== 'admin') {
        alert("⛔ AKSES DITOLAK: Halaman ini khusus Admin!");
        window.location.href = "../index.html"; 
        return;
    }
    document.getElementById('adminUsername').textContent = currentUser;

    document.getElementById('btnLogout').addEventListener('click', () => {
        sessionStorage.removeItem('currentUser');
        window.location.href = "../index.html";
    });

    // 2. DATABASE (SAMA DENGAN HOME)
    const STORAGE_KEY = 'loki_db_integrated_v1';
    
    // Data Initial
    const initialData = [
        { id: 1, name: "Loki Laufeyson", shortDesc: "God of Mischief.", image: "Loki_-_Loki.png", abilities: ["Sorcery"] }
    ];

    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    }

    function getData() { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    function saveData(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); renderGrid(); }

    // 3. RENDER GRID (STRUKTUR SAMA DGN HOME AGAR RAPI)
    function renderGrid() {
        const grid = document.getElementById('adminGrid');
        grid.innerHTML = '';
        const chars = getData();

        chars.forEach(char => {
            const imgPath = `../assets/char/${char.image}`;
            
            // HTML Structure: .card (dari style.css utama)
            const cardHTML = `
                <div class="card">
                    <img src="${imgPath}" class="card-img" style="object-position: top center;" onerror="this.src='https://via.placeholder.com/375x250?text=No+Image'">
                    
                    <div class="card-body">
                        <h3>${char.name}</h3>
                        <p class="desc-short">${char.shortDesc}</p>
                        
                        <div class="btn-read" onclick="openDetail(${char.id})">Baca Selengkapnya</div>
                        
                        <div class="admin-card-actions">
                            <div class="btn-admin-action btn-edit" onclick="openEdit(${char.id})">Edit</div>
                            <div class="btn-admin-action btn-delete" onclick="openDelete(${char.id})">Hapus</div>
                        </div>
                    </div>
                </div>
            `;
            grid.innerHTML += cardHTML;
        });
    }

    // 4. MODAL LOGIC
    window.openModal = (id) => document.getElementById(id).style.display = 'flex';
    window.closeModal = (id) => document.getElementById(id).style.display = 'none';

    // DRAG & DROP
    const dropArea = document.getElementById('dragDropArea');
    const fileInput = document.getElementById('fileInput');
    const imgInputText = document.getElementById('inpImage');

    if(dropArea) {
        dropArea.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', function() { if(this.files[0]) imgInputText.value = this.files[0].name; });
        dropArea.addEventListener('dragover', (e) => { e.preventDefault(); dropArea.style.borderColor = '#fff'; });
        dropArea.addEventListener('dragleave', () => { dropArea.style.borderColor = '#555'; });
        dropArea.addEventListener('drop', (e) => { e.preventDefault(); if(e.dataTransfer.files[0]) imgInputText.value = e.dataTransfer.files[0].name; });
    }

    // TAMBAH & EDIT
    const modalTitle = document.getElementById('modalTitle');
    const btnSave = document.getElementById('btnSaveForm');
    const inpId = document.getElementById('editCharId');
    const inpName = document.getElementById('inpName');
    const inpShort = document.getElementById('inpShortDesc');
    const inpLong = document.getElementById('inpLongDesc');

    document.getElementById('btnShowAddModal').addEventListener('click', () => {
        modalTitle.textContent = "Tambah Karakter";
        btnSave.textContent = "Tambah";
        inpId.value = ''; inpName.value = ''; inpShort.value = ''; inpLong.value = ''; imgInputText.value = '';
        openModal('modalForm');
    });

    window.openEdit = (id) => {
        const char = getData().find(c => c.id === id);
        if(char) {
            modalTitle.textContent = "Edit Karakter";
            btnSave.textContent = "Edit";
            inpId.value = char.id;
            inpName.value = char.name;
            inpShort.value = char.shortDesc;
            inpLong.value = char.longDesc;
            imgInputText.value = char.image;
            openModal('modalForm');
        }
    };

    btnSave.addEventListener('click', () => {
        const id = inpId.value;
        const newChar = {
            id: id ? parseInt(id) : Date.now(),
            name: inpName.value,
            shortDesc: inpShort.value,
            longDesc: inpLong.value,
            image: imgInputText.value,
            abilities: id ? (getData().find(c => c.id == id)?.abilities || ["Ability"]) : ["New Ability 1", "New Ability 2"]
        };

        if(!newChar.name || !newChar.image) { alert("Data tidak lengkap!"); return; }

        let data = getData();
        if(id) {
            const idx = data.findIndex(c => c.id == id);
            if(idx !== -1) data[idx] = newChar;
        } else {
            data.push(newChar);
        }
        saveData(data);
        closeModal('modalForm');
    });

    // DELETE
    window.openDelete = (id) => {
        document.getElementById('deleteId').value = id;
        openModal('modalDelete');
    };

    document.getElementById('btnConfirmDelete').addEventListener('click', () => {
        const id = parseInt(document.getElementById('deleteId').value);
        const data = getData().filter(c => c.id !== id);
        saveData(data);
        closeModal('modalDelete');
    });

    // DETAIL (Pake Class Style.css)
    window.openDetail = (id) => {
        const char = getData().find(c => c.id === id);
        if(char) {
            document.getElementById('detailImg').src = `../assets/char/${char.image}`;
            document.getElementById('detailName').textContent = char.name;
            document.getElementById('detailDesc').textContent = char.longDesc;
            
            const abilityGrid = document.getElementById('detailAbilities');
            abilityGrid.innerHTML = '';
            
            if(char.abilities) {
                char.abilities.forEach(ab => {
                    const div = document.createElement('div');
                    div.className = 'ability-box'; // Class dari style.css
                    div.textContent = ab;
                    abilityGrid.appendChild(div);
                });
            }
            openModal('modalDetail');
        }
    };

    renderGrid();
});