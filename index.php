<?php
session_start();
require_once 'koneksi.php';

$error_message = '';
$success_message = '';

// Proses LOGIN
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Menggabungkan pengecekan login ke dalam satu query untuk efisiensi
    $sql = "
        (SELECT username, password, 'admin' as role FROM admin WHERE username = ?)
        UNION
        (SELECT username, password, 'variant' as role FROM variant WHERE username = ?)
        UNION
        (SELECT username, password, 'user' as role FROM user WHERE username = ?)
        LIMIT 1
    ";

    $stmt = $koneksi->prepare($sql);
    $stmt->bind_param("sss", $username, $username, $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $account = $result->fetch_assoc();

        // Membandingkan password plain text (Sangat tidak disarankan untuk produksi)
        if ($password === $account['password']) {
            $_SESSION['user'] = $username;
            $_SESSION['role'] = $account['role'];
            
            if ($account['role'] === 'admin') {
                header("Location: admin/dashboard.php");
            } else {
                header("Location: home/index.php");
            }
            exit();
        }
    }

    $error_message = 'Username atau password salah!';
}

// Proses REGISTRASI
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['register'])) {
    $username = $_POST['reg_username'];
    $password = $_POST['reg_password'];
    $confirm_password = $_POST['reg_confirm_password'];

    if ($password !== $confirm_password) {
        $error_message = "Password dan konfirmasi tidak cocok!";
    } else {
        $stmt_check = $koneksi->prepare("SELECT id FROM user WHERE username = ?");
        $stmt_check->bind_param("s", $username);
        $stmt_check->execute();
        $result_check = $stmt_check->get_result();

        if ($result_check->num_rows > 0) {
            $error_message = "Username '" . htmlspecialchars($username) . "' sudah terdaftar.";
        } else {
            $stmt_insert = $koneksi->prepare("INSERT INTO user (username, password) VALUES (?, ?)");
            $stmt_insert->bind_param("ss", $username, $password);
            
            if ($stmt_insert->execute()) {
                $success_message = "Registrasi berhasil! Silakan login.";
            } else {
                $error_message = "Registrasi gagal: " . $stmt_insert->error;
            }
            $stmt_insert->close();
        }
        $stmt_check->close();
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loki Multiverse - Login</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <div class="validation-alert" id="validationAlert" style="display: none; animation: slideIn 0.3s ease-out;">
        <?php if (!empty($error_message)) echo htmlspecialchars($error_message); ?>
        <?php if (!empty($success_message)) echo htmlspecialchars($success_message); ?>
    </div>

    <div class="page-container" id="loginPage">
        <form class="form-card" method="POST" action="index.php">
            <div class="loki-multiverse">LOKI MULTIVERSE</div>
            <div class="sub-title">Masukkan Akun untuk Login</div>
            <div class="input-wrapper">
                <input type="text" class="custom-input" name="username" placeholder="Username" required>
            </div>
            <div class="input-wrapper">
                <input type="password" class="custom-input" name="password" placeholder="Password" required>
            </div>
            <div class="login-info" style="color: #ff6b6b; text-align: center; font-size: 14px; min-height: 20px; padding-top: 5px; display: <?php echo (isset($_POST['login']) && !empty($error_message)) ? 'block' : 'none'; ?>;">
                <?php if (isset($error_message) && !empty($error_message)) echo htmlspecialchars($error_message); ?>
            </div>
            <button type="submit" name="login" class="buttonmain">MASUK KE MULTIVERSE</button>
            <div class="link-bawah" id="linkKeRegister">Belum Punya Akun? Register</div>
        </form>
    </div>

    <div class="page-container" id="registerPage" style="display: none;">
        <form class="form-card" method="POST" action="index.php">
            <div class="loki-multiverse">LOKI MULTIVERSE</div>
            <div class="sub-title">Buat Akun Baru</div>
            <div class="input-wrapper">
                <input type="text" class="custom-input" name="reg_username" placeholder="Username" required>
            </div>
            <div class="input-wrapper">
                <input type="password" class="custom-input" name="reg_password" placeholder="Password" required>
            </div>
            <div class="input-wrapper">
                <input type="password" class="custom-input" name="reg_confirm_password" placeholder="Konfirmasi Password" required>
            </div>
            <button type="submit" name="register" class="buttonmain register-btn">DAFTAR SEKARANG</button>
            <div class="link-bawah" id="linkKeLogin">Sudah Punya Akun? Login</div>
        </form>
    </div>

    <script>
        // Skrip sederhana untuk beralih antara form login dan register
        document.addEventListener("DOMContentLoaded", function () {
            const loginPage = document.getElementById("loginPage");
            const registerPage = document.getElementById("registerPage");
            const linkToRegister = document.getElementById("linkKeRegister");
            const linkToLogin = document.getElementById("linkKeLogin");

            function showPage(page) {
                loginPage.style.display = 'none';
                registerPage.style.display = 'none';
                page.style.display = 'flex';
            }

            linkToRegister.addEventListener("click", () => showPage(registerPage));
            linkToLogin.addEventListener("click", () => showPage(loginPage));

            // Tampilkan alert dari PHP jika ada pesan
            const alertDiv = document.getElementById("validationAlert");
            if (alertDiv.textContent.trim() !== "") {
                alertDiv.style.display = 'block';
                const isSuccess = <?php echo json_encode(!empty($success_message)); ?>;
                alertDiv.className = isSuccess ? 'validation-alert success' : 'validation-alert error';
                setTimeout(() => { alertDiv.style.display = 'none'; }, 3000);
            }
        });
    </script>
</body>
</html>