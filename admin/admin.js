document.addEventListener("DOMContentLoaded", function () {
    const API_URL = 'api_admin.php';

    // RENDER GRID
    function renderGrid() {
        fetch(`${API_URL}?action=read`)
            .then(response => response.json())
            .then(chars => {
                const grid = document.getElementById('adminGrid');
                grid.innerHTML = '';
                chars.forEach(char => {
                    const imgPath = `../assets/char/${char.image_file || 'default.png'}`;
                    const cardHTML = `
                        <div class="card">
                            <img src="${imgPath}" class="card-img" style="object-position: top center;" onerror="this.src='../assets/char/default.png'">
                            <div class="card-body">
                                <h3>${char.nama_karakter}</h3>
                                <p class="desc-short">${char.deskripsi_karakter.substring(0, 100)}...</p>
                                <div class="btn-read" onclick="openDetail(${char.id_karakter})">Baca Selengkapnya</div>
                                <div class="admin-card-actions">
                                    <div class="btn-admin-action btn-edit" onclick="openEdit(${char.id_karakter})">Edit</div>
                                    <div class="btn-admin-action btn-delete" onclick="openDelete(${char.id_karakter})">Hapus</div>
                                </div>
                            </div>
                        </div>
                    `;
                    grid.innerHTML += cardHTML;
                });
            });
    }

    // MODAL LOGIC
    window.openModal = (id) => document.getElementById(id).style.display = 'flex';
    window.closeModal = (id) => document.getElementById(id).style.display = 'none';

    // TAMBAH & EDIT
    const modalTitle = document.getElementById('modalTitle');
    const btnSave = document.getElementById('btnSaveForm');
    const inpId = document.getElementById('editCharId');
    const inpName = document.getElementById('inpName');
    const inpLong = document.getElementById('inpLongDesc');
    const inpImageFile = document.getElementById('inpImageFile');

    document.getElementById('btnShowAddModal').addEventListener('click', () => {
        modalTitle.textContent = "Tambah Karakter";
        btnSave.textContent = "Tambah";
        inpId.value = '';
        inpName.value = '';
        inpLong.value = '';
        inpImageFile.value = '';
        openModal('modalForm');
    });

    window.openEdit = (id) => {
        fetch(`${API_URL}?action=read_single&id=${id}`)
            .then(response => response.json())
            .then(char => {
                if (char) {
                    modalTitle.textContent = "Edit Karakter";
                    btnSave.textContent = "Edit";
                    inpId.value = char.id_karakter;
                    inpName.value = char.nama_karakter;
                    inpLong.value = char.deskripsi_karakter;
                    inpImageFile.value = char.image_file;
                    openModal('modalForm');
                }
            });
    };

    btnSave.addEventListener('click', () => {
        const formData = new FormData();
        const action = inpId.value ? 'update' : 'create';
        formData.append('action', action);
        formData.append('id', inpId.value);
        formData.append('nama_karakter', inpName.value);
        formData.append('deskripsi_karakter', inpLong.value);
        formData.append('image_file', inpImageFile.value);

        if (!inpName.value.trim() || !inpLong.value.trim() || !inpImageFile.value.trim()) {
            alert("Nama Karakter, Deskripsi, dan Nama File Gambar tidak boleh kosong!");
            return;
        }

        fetch(API_URL, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(result => {
                alert(result.message);
                if (result.success) {
                    closeModal('modalForm');
                    renderGrid();
                }
            });
    });

    // DELETE
    window.openDelete = (id) => {
        document.getElementById('deleteId').value = id;
        openModal('modalDelete');
    };

    document.getElementById('btnConfirmDelete').addEventListener('click', () => {
        const id = document.getElementById('deleteId').value;
        const formData = new FormData();
        formData.append('action', 'delete');
        formData.append('id', id);

        fetch(API_URL, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(result => {
                alert(result.message);
                if (result.success) {
                    closeModal('modalDelete');
                    renderGrid();
                }
            });
    });

    // DETAIL (Pake Class Style.css)
    window.openDetail = (id) => {
        fetch(`${API_URL}?action=read_single&id=${id}`)
            .then(response => response.json())
            .then(char => {
                document.getElementById('detailImg').src = `../assets/char/${char.image_file || 'default.png'}`;
                document.getElementById('detailName').textContent = char.nama_karakter;
                document.getElementById('detailDesc').textContent = char.deskripsi_karakter;
                document.getElementById('detailAbilities').innerHTML = ''; // Kosongkan karena tidak ada data ability
                openModal('modalDetail');
            });
    };

    renderGrid();
});