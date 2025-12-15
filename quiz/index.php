<?php
session_start();
// Proteksi halaman: Jika pengguna belum login, kembalikan ke halaman login.
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
    <title>Loki Multiverse - Quiz</title>
    <link rel="stylesheet" href="../style.css">
    <link rel="icon" href="../assets/favicon.ico" type="image/x-icon">
</head>
<body>
    <div class="validation-alert" id="validationAlert" style="display: none;"></div>

    <div class="navbar" id="mainNavbar">
        <div class="nav-left">
            <b class="brand-title">Loki Multiverse</b>
            <div class="stones-container">
                <img src="../assets/source/Power_Stone_VFX.png" class="stone locked" id="nav-power" onclick="activatePowerUp('power')">
                <img src="../assets/source/Space_Stone_VFX.png" class="stone locked" id="nav-space" onclick="activatePowerUp('space')">
                <img src="../assets/source/Reality_Stone_VFX.png" class="stone locked" id="nav-reality" onclick="activatePowerUp('reality')">
                <img src="../assets/source/Soul_Stone_VFX.png" class="stone locked" id="nav-soul" onclick="activatePowerUp('soul')">
                <img src="../assets/source/Time_Stone_VFX.png" class="stone locked" id="nav-time" onclick="activatePowerUp('time')">
                <img src="../assets/source/Mind_Stone_VFX.png" class="stone locked" id="nav-mind" onclick="activatePowerUp('mind')">
            </div>
            <div id="navbarSnapBtn" class="nav-snap-btn" style="display: none;">SNAP!</div>
        </div>
        <div class="nav-right">
            <div class="user-greeting" id="userGreeting">Hai, <?php echo $username; ?>!</div>
            <div class="btn-keluar" id="btnKeluar">Keluar</div>
        </div>
    </div>

    <div id="quizSection">
        <div class="quiz-container">
            <div id="stoneSpawnArea"></div>
            <div class="quiz-header">
                <div class="question-number" id="questionNumber">Pertanyaan 1/10</div>
                <div class="score-display" id="scoreDisplay">Skor: 0</div>
            </div>
            <div class="quiz-progress"><div class="quiz-progress-bar" id="quizProgressBar"></div></div>
            <div class="quiz-feedback" id="quizFeedback"></div>
            <div class="question-text" id="questionText">Loading...</div>
            <div class="options-container" id="optionsContainer"></div>
            <div class="correct-answer-text" id="correctAnswerText" style="display: none;"></div>
            <div class="quiz-nav">
                <div class="btn-nav" id="btnPrevQuiz">Sebelumnya</div>
                <div class="btn-nav btn-next" id="btnNextQuiz">Selanjutnya</div>
            </div>
        </div>
    </div>

    <script src="./script.js"></script>
</body>
</html>