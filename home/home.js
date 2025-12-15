document.addEventListener("DOMContentLoaded", function () {
    let charactersData = [];
    let selectedCharacterId = null;

    const grid = document.getElementById('userGrid');
    const btnStartFalse = document.getElementById('btnStartFalse');
    const btnStartTrue = document.getElementById('btnStartTrue');
    
    // Ambil data karakter dari API dinamis
    fetch('../api.php')
        .then(response => response.json())
        .then(data => {
            charactersData = data;
            renderCharacterGrid();
        })
        .catch(error => {
            console.error('Error fetching character data:', error);
            grid.innerHTML = "<p style='color: red; text-align: center;'>Gagal memuat data karakter.</p>";
        });

    function renderCharacterGrid() {
        grid.innerHTML = '';

        let charsToRender = charactersData;

        // LOGIKA FILTER UNTUK SETIAP PERAN
        if (session.role === 'variant') {
            // 1. Temukan karakter varian spesifik yang cocok dengan username
            const variantLoki = charactersData.find(char => char.nama_karakter.toLowerCase().includes(session.user.toLowerCase().trim()));
            
            // 2. Ambil semua karakter pendukung (ID 8 ke atas)
            const supportChars = charactersData.filter(char => Number(char.id_karakter) > 7);

            // 3. Gabungkan karakter pendukung dengan varian Loki yang spesifik.
            charsToRender = variantLoki ? [...supportChars, variantLoki] : supportChars; // Jika varian tidak ada, hanya tampilkan support
        } else if (session.role === 'user') {
            // Untuk user biasa, tampilkan hanya karakter yang relevan (Loki Ori + Pendukung)
            const relevantIds = [1, 8, 9, 10, 11, 12];
            // Menggunakan Number() untuk konversi yang lebih aman dan membandingkan dengan string
            charsToRender = charactersData.filter(char => relevantIds.includes(Number(char.id_karakter)));
        }

        // PENCEGAHAN ERROR: Jika setelah filter tidak ada karakter yang bisa ditampilkan, tampilkan pesan.
        if (charsToRender.length === 0) {
            grid.innerHTML = "<p style='color: yellow; text-align: center;'>Tidak ada karakter yang dapat ditampilkan untuk pengguna ini.</p>";
            return; // Hentikan eksekusi agar tidak error
        }

        charsToRender.forEach(char => {
            const imageName = char.image_file || 'default.png';
            
            const card = document.createElement('div');
            card.className = 'card';
            
            card.innerHTML = `
                <img src="../assets/char/${imageName}" class="card-img" onerror="this.src='../assets/char/default.png'">
                <div class="card-body">
                    <h3>${char.nama_karakter}</h3>
                    <p class="desc-short">${char.deskripsi_karakter.substring(0, 100)}...</p>
                    <div class="btn-read" onclick="openDetail(event, ${char.id_karakter})">Baca Selengkapnya</div>
                    <div class="btn-select" data-id="${char.id_karakter}">Pilih Karakter</div>
                </div>
            `;
            
            const selectButton = card.querySelector('.btn-select');
            selectButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Mencegah event lain terpicu

                // Hapus status 'selected' dari semua tombol
                document.querySelectorAll('.btn-select.selected').forEach(btn => btn.classList.remove('selected'));
                // Tambahkan status 'selected' ke tombol yang diklik
                selectButton.classList.add('selected');

                selectedCharacterId = selectButton.dataset.id;
                btnStartFalse.style.display = 'none';
                btnStartTrue.style.display = 'flex';
            });

            grid.appendChild(card);
        });
    }

    // Tambahkan event listener untuk tombol "Mulai Quiz"
    btnStartTrue.addEventListener('click', () => {
        if (selectedCharacterId) {
            // Arahkan ke index.php di dalam folder quiz
            window.location.href = `../quiz/index.php`;
        } else {
            alert("Silakan pilih karakter terlebih dahulu.");
        }
    });

    // Fungsi untuk menampilkan detail karakter (mirip di admin)
    window.openDetail = (event, id) => {
        event.stopPropagation(); // Mencegah event lain terpicu (misal: pemilihan karakter)
        
        const char = charactersData.find(c => c.id_karakter == id);
        if (char) {
            const imageName = char.image_file || 'default.png';
            document.getElementById('detailImg').src = `../assets/char/${imageName}`;
            document.getElementById('detailName').textContent = char.nama_karakter;
            document.getElementById('detailDesc').textContent = char.deskripsi_karakter;
            document.getElementById('modalDetail').style.display = 'flex'; // Tampilkan modal
        }
    };

    // Fungsi untuk menutup modal (digunakan oleh tombol di modal)
    window.closeModal = (id) => {
        document.getElementById(id).style.display = 'none';
    };
});