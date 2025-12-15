<?php
header('Content-Type: application/json');
require 'koneksi.php';
session_start();

$role = $_SESSION['role'] ?? 'guest';
$username = $_SESSION['user'] ?? '';

$characters = [];

// Logika yang paling andal: Selalu kirim SEMUA karakter.
// Biarkan JavaScript di sisi klien yang menentukan apa yang akan ditampilkan.
$sql = "SELECT id_karakter, nama_karakter, deskripsi_karakter, image_file FROM karakter ORDER BY nama_karakter";
if ($result = $koneksi->query($sql)) {
    $characters = $result->fetch_all(MYSQLI_ASSOC);
}

echo json_encode($characters);
?>