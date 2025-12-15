<?php
header('Content-Type: application/json');
require '../koneksi.php';

$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

switch ($action) {
    case 'create':
        $nama = $_POST['nama_karakter'];
        $deskripsi = $_POST['deskripsi_karakter'];
        $image_file = $_POST['image_file'];
        $stmt = $koneksi->prepare("INSERT INTO karakter (nama_karakter, deskripsi_karakter, image_file) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $nama, $deskripsi, $image_file);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Karakter berhasil ditambahkan.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Gagal menambahkan karakter: ' . $stmt->error]);
        }
        break;

    case 'read':
        $result = $koneksi->query("SELECT * FROM karakter ORDER BY id_karakter");
        $characters = [];
        while ($row = $result->fetch_assoc()) {
            $characters[] = $row;
        }
        echo json_encode($characters);
        break;

    case 'read_single':
        $id = intval($_GET['id']);
        $stmt = $koneksi->prepare("SELECT * FROM karakter WHERE id_karakter = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        echo json_encode($result->fetch_assoc());
        break;

    case 'update':
        $id = intval($_POST['id']);
        $nama = $_POST['nama_karakter'];
        $deskripsi = $_POST['deskripsi_karakter'];
        $image_file = $_POST['image_file'];
        $stmt = $koneksi->prepare("UPDATE karakter SET nama_karakter = ?, deskripsi_karakter = ?, image_file = ? WHERE id_karakter = ?");
        $stmt->bind_param("sssi", $nama, $deskripsi, $image_file, $id);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Karakter berhasil diperbarui.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Gagal memperbarui karakter: ' . $stmt->error]);
        }
        break;

    case 'delete':
        $id = intval($_POST['id']);
        $stmt = $koneksi->prepare("DELETE FROM karakter WHERE id_karakter = ?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Karakter berhasil dihapus.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Gagal menghapus karakter: ' . $stmt->error]);
        }
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Aksi tidak valid.']);
        break;
}
?>