<?php
session_start();
// Jika tidak ada sesi login, kembalikan ke halaman login
if (!isset($_SESSION['user'])) {
    header("Location: ../index.php");
    exit();
}
$username = htmlspecialchars($_SESSION['user']);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loki Multiverse - Home</title>
    <link rel="stylesheet" href="../style.css">
    <link rel="icon" href="../assets/favicon.ico" type="image/x-icon">
</head>
<body>
    <div class="validation-alert" id="validationAlert" style="display: none;"></div>

    <div class="navbar" id="mainNavbar">
        <div class="nav-left">
            <b class="brand-title">Loki Multiverse</b>
            <div class="stones-container">
                <img src="../assets/source/Power_Stone_VFX.png" class="stone locked" id="nav-power">
                <img src="../assets/source/Space_Stone_VFX.png" class="stone locked" id="nav-space">
                <img src="../assets/source/Reality_Stone_VFX.png" class="stone locked" id="nav-reality">
                <img src="../assets/source/Soul_Stone_VFX.png" class="stone locked" id="nav-soul">
                <img src="../assets/source/Time_Stone_VFX.png" class="stone locked" id="nav-time">
                <img src="../assets/source/Mind_Stone_VFX.png" class="stone locked" id="nav-mind">
            </div>
            <div id="navbarSnapBtn" class="nav-snap-btn" style="display: none;">SNAP!</div>
        </div>
        <div class="nav-right">
            <div class="user-greeting" id="userGreeting" style="color:white;">Hai, <?php echo $username; ?>!</div>
            <a href="../logout.php" class="btn-keluar" id="btnKeluar">Keluar</a>
        </div>
    </div>

    <div id="homePage">
        <div class="main-content" style="width:100%; display:flex; flex-direction: column; align-items: center;">
            <div class="header-section" style="text-align:center; margin-bottom: 30px;">
                <h1 class="title-gold" style="font-size:36px; color:#ffd966;">PILIH KARAKTER LOKI</h1>
                <p class="subtitle" style="color:#ccc;">Pilih karakter untuk memulai quiz. Kumpulkan 6 Infinity Stones!</p>
            </div>

            <div class="character-grid" id="userGrid">
                </div>
            
            <div class="buttonmulai-container" style="margin-top:40px; width:100%; max-width:500px;">
                <div class="haspickedfalse" id="btnStartFalse" style="width:100%; height:60px; background:#333; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#777; font-weight:bold;">
                    PILIH KARAKTER DULU
                </div>
                <div class="haspickedtrue" id="btnStartTrue" style="display: none; width:100%; height:60px; background:linear-gradient(90deg, #ffd966, #f5972d); border-radius:10px; align-items:center; justify-content:center; color:#1e1e1e; font-weight:bold; cursor:pointer;">
                    MULAI QUIZ
                </div>
            </div>
        </div>
    </div>

    <!-- Modal untuk Detail Karakter (Kembali ke Modal) -->
    <div class="modal-overlay" id="modalDetail" style="display:none;">
        <div class="detailcard" style="position:relative;">
            <img src="" id="detailImg" class="detailcard-child" onerror="this.src='../assets/char/default.png'">
            <div class="detail-content">
                <div class="char-name" id="detailName">Nama Karakter</div>
                <div class="char-desc" id="detailDesc">Deskripsi lengkap karakter akan muncul di sini.</div>
                <div class="ability" id="detailAbilities">
                    <!-- Kosong karena tidak ada data ability -->
                </div>
                <div class="buttonmain-close" onclick="closeModal('modalDetail')">Tutup</div>
            </div>
        </div>
    </div>

    <script>
        // Mengirim data sesi PHP ke JavaScript untuk logika di sisi klien
        const session = { user: '<?php echo $_SESSION['user']; ?>', role: '<?php echo $_SESSION['role']; ?>' };
    </script>
    <script src="home.js"></script> <!-- Mengganti script.js ke home.js -->
</body>
</html>