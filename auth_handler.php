<?php
// File ini di-include oleh index.php untuk menangani logika login dan registrasi

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
    // Bind username yang sama ke tiga placeholder (?)
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
            exit(); // Penting untuk menghentikan eksekusi setelah redirect
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
        // Cek apakah username sudah ada di tabel user, admin, atau variant
        $stmt_check = $koneksi->prepare("SELECT id FROM user WHERE username = ?");
        $stmt_check->bind_param("s", $username);
        $stmt_check->execute();
        $result_check = $stmt_check->get_result();

        if ($result_check->num_rows > 0) {
            $error_message = "Username '" . htmlspecialchars($username) . "' sudah terdaftar. Silakan gunakan username lain.";
        } else {
            // Jika belum ada, lakukan insert
            // PERINGATAN: Menyimpan password sebagai plain text sangat tidak aman.
            // Seharusnya menggunakan: $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            // dan menyimpannya ke database.
            $stmt_insert = $koneksi->prepare("INSERT INTO user (username, password) VALUES (?, ?)");
            $stmt_insert->bind_param("ss", $username, $password);
            
            if ($stmt_insert->execute()) {
                $success_message = "Registrasi berhasil! Silakan login.";
            } else {
                $error_message = "Registrasi gagal, terjadi kesalahan pada server: " . $stmt_insert->error;
            }
            $stmt_insert->close();
        }
        $stmt_check->close();
    }
}
?>