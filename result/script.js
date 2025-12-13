document.addEventListener("DOMContentLoaded", function () {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const score = urlParams.get('score');
    const isSnap = urlParams.get('snap') === 'true';
    
    const finalScoreText = document.getElementById("finalScoreText");
    const resultDesc = document.getElementById("resultDesc");
    const btnRetry = document.getElementById("btnRetry");
    const btnHome = document.getElementById("btnHome");
    
    // Handle snap result
    if (isSnap) {
        finalScoreText.textContent = "100%";
        resultDesc.textContent = "THE SNAP! Anda telah menggunakan seluruh Infinity Stones. Keseimbangan pulih.";
    } 
    // Handle normal quiz result
    else if (score) {
        const scoreNum = parseInt(score);
        finalScoreText.textContent = `${score}%`;
        
        // Set description based on score
        if (scoreNum >= 90) {
            resultDesc.textContent = "Luar Biasa! Anda benar-benar ahli multiverse!";
        } else if (scoreNum >= 70) {
            resultDesc.textContent = "Bagus! Pengetahuan Anda tentang Loki cukup solid.";
        } else if (scoreNum >= 50) {
            resultDesc.textContent = "Cukup baik. Masih ada ruang untuk belajar lebih banyak.";
        } else {
            resultDesc.textContent = "Perlu belajar lagi tentang multiverse Loki.";
        }
    } 
    // Fallback if no parameters
    else {
        finalScoreText.textContent = "0%";
        resultDesc.textContent = "Tidak ada data hasil yang ditemukan.";
    }
    
    // Button events
    btnRetry.addEventListener("click", () => {
        window.location.href = "../quiz/index.html";
    });
    
    btnHome.addEventListener("click", () => {
        window.location.href = "../home/index.html";
    });
});