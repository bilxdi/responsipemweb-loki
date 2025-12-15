<?php
$servername = "localhost";
$username = "root"; 
$password = ""; 
$database = "loki"; 

$koneksi = new mysqli($servername, $username, $password, $database);

if ($koneksi->connect_error) {
    die("Koneksi database gagal: " . $koneksi->connect_error);
}

?>