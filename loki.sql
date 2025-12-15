-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 14 Des 2025 pada 17.06
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `loki`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', '12345678');

-- --------------------------------------------------------

--
-- Struktur dari tabel `karakter`
--

CREATE TABLE `karakter` (
  `id_karakter` int(11) NOT NULL,
  `nama_karakter` varchar(100) NOT NULL,
  `deskripsi_karakter` text DEFAULT NULL,
  `image_file` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `karakter`
--

INSERT INTO `karakter` (`id_karakter`, `nama_karakter`, `deskripsi_karakter`, `image_file`) VALUES
(1, 'Loki Laufeyson', 'Varian Loki utama dalam serial ini. Pertemuannya dengan varian lain yang menamai dirinya **sylvie** mengubah pandangannya tentang takdir. Dalam perjalanannya bersama TVA, Loki mulai berkembang dari sosok egois menjadi lebih reflektif dan peduli terhadap orang lain.', 'Loki_Laufeyson.png'),
(2, 'Sylvie Laufeydottir', 'Varian perempuan Loki yang keras kepala, berani, dan penuh tekad. Sejak kecil diburu TVA, Sylvie tumbuh dengan dendam terhadap mereka. Ia ingin menghancurkan TVA demi kebebasan kehendak dan keadilan atas masa lalunya.', 'Sylvie_Laufeydottir.png'),
(3, 'Classic Loki', 'Varian Loki tua yang berasal dari garis waktu berbeda. Mengenakan kostum klasik khas komik Marvel. Ia sangat kuat dalam sihir ilusi dan menyesal karena hidup menyendiri setelah berpura-pura mati untuk menghindari Thanos.', 'Classic_Loki.png'),
(4, 'Boastful Loki', 'Varian Loki yang sombong dan haus pengakuan. Ia mengklaim telah mengalahkan Iron Man dan Captain America. Menggunakan palu mirip Mjolnir, namun lebih dikenal karena sikapnya yang berlebihan daripada kecerdasannya.', 'Boastful_Loki.png'),
(5, 'Alligator Loki', 'Varian Loki berbentuk buaya. Walaupun tidak bisa berbicara, ia tetap licik dan berbahaya. Dikenal karena menyerang varian Loki lain, termasuk menggigit tangan Thor di garis waktunya.', 'Alligator_Loki.png'),
(6, 'Kid Loki', 'Varian Loki dalam wujud anak-anak. Ia membunuh Thor di dunianya, sehingga dianggap berbahaya dan dibuang ke Void. Menjadi pemimpin kelompok Loki varian karena kecerdasannya.', 'Kid_Loki.png'),
(7, 'President Loki', 'Varian Loki yang berambisi memerintah dan menjadi presiden di Void. Licik, manipulatif, dan tidak dapat dipercaya. Mewakili sisi Loki yang paling haus kekuasaan tanpa rasa tanggung jawab.', 'President_Loki.png'),
(8, 'He Who Remains', 'Pengendali TVA dan pencipta Sacred Timeline. Ia adalah varian dari Kang the Conqueror yang memenangkan perang multiverse melawan varian lainnya, termasuk varian yang haus kuasa dan ingin menjadi seorang **president**.', 'He_Who_Remains.png'),
(9, 'Hunter B-15', 'Agen TVA yang tegas dan kuat. Ia telah memangkas banyak sekali varian, dari yang lemah hingga yang paling sombong dan **boastful**. Setelah mengetahui kebenaran bahwa para agen adalah varian, ia mulai membantu Loki membongkar kebohongan TVA.', 'Hunter_B15.png'),
(10, 'Miss Minutes', 'Maskot digital TVA berbentuk jam kartun. Ia tahu segalanya tentang Sacred Timeline, dari masa lalu yang **classic** hingga masa depan. Berfungsi sebagai pemandu informasi sekaligus alat He Who Remains untuk mengontrol TVA.', 'Miss_Minutes.png'),
(11, 'Mobius M. Mobius', 'Agen TVA yang ramah dan penuh empati. Ia percaya bahwa setiap varian, bahkan seekor **alligator** sekalipun, memiliki peran dalam takdir. Ia memiliki ketertarikan pada jet ski dan menjadi sekutu penting Loki.', 'Mobius_MMobius.png'),
(12, 'Ravonna Renslayer', 'Hakim tinggi TVA yang berwibawa dan ambisius. Ia sangat setia pada sistem TVA dan rela melakukan apa saja untuk menjaga timeline, bahkan jika itu berarti memangkas seorang **kid** yang dianggap berbahaya.', 'Ravonna_Renslayer.png');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `username`, `password`) VALUES
(1, 'user', 'user123');

-- --------------------------------------------------------

--
-- Struktur dari tabel `variant`
--

CREATE TABLE `variant` (
  `id_variant` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `variant`
--

INSERT INTO `variant` (`id_variant`, `username`, `password`) VALUES
(1, 'sylvie', 'sylvie'),
(2, 'classic', 'classic'),
(3, 'boastful', 'boastful'),
(4, 'alligator', 'alligator'),
(5, 'kid', 'kid'),
(6, 'president', 'president');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indeks untuk tabel `karakter`
--
ALTER TABLE `karakter`
  ADD PRIMARY KEY (`id_karakter`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indeks untuk tabel `variant`
--
ALTER TABLE `variant`
  ADD PRIMARY KEY (`id_variant`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `karakter`
--
ALTER TABLE `karakter`
  MODIFY `id_karakter` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `variant`
--
ALTER TABLE `variant`
  MODIFY `id_variant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
