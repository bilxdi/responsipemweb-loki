document.addEventListener("DOMContentLoaded", function () {
    // Elemen halaman
    const loginPage = document.getElementById("loginPage");
    const registerPage = document.getElementById("registerPage");
    const overlayAkun = document.getElementById("overlayAkun");
    
    // Fungsi beralih halaman
    function showPage(pageId) {
        [loginPage, registerPage].forEach(el => {
            if(el) el.style.display = 'none';
        });
        const target = document.getElementById(pageId);
        if(target) target.style.display = 'flex';
    }

    // Fungsi alert
    function showAlert(message, type = "error") {
        const alertDiv = document.getElementById("validationAlert");
        if(alertDiv) {
            alertDiv.textContent = message;
            alertDiv.className = `validation-alert ${type}`;
            alertDiv.style.display = 'block';
            setTimeout(() => { alertDiv.style.display = 'none'; }, 3000);
        } else {
            alert(message);
        }
    }

    // LOGIN
    document.getElementById("btnLogin").addEventListener("click", () => {
        const username = document.getElementById("inputUsername").value.trim();
        const password = document.getElementById("inputPassword").value.trim();
        
        // Demo accounts
        const demoAccounts = [
            {user:"admin", pass:"321"},
            {user:"default", pass:"123"},
            {user:"sylvie", pass:"123"},
            {user:"classic", pass:"123"},
            {user:"boastful", pass:"123"},
            {user:"alligator", pass:"123"},
            {user:"kid", pass:"123"},
            {user:"president", pass:"123"}
        ];
        
        // Local users
        const localUsers = JSON.parse(localStorage.getItem('loki_users') || '[]');
        
        // Validasi
        const isValidDemo = demoAccounts.some(acc => acc.user === username && acc.pass === password);
        const isValidLocal = localUsers.some(user => user.username === username && user.password === password);
        
        if(username && password && (isValidDemo || isValidLocal)) {
            sessionStorage.setItem('currentUser', username);
            
            // LOGIKA REDIRECT KHUSUS ADMIN
            if(username === 'admin') {
                // Jika admin, langsung ke dashboard
                window.location.href = "admin/dashboard.html";
            } else {
                // User biasa ke home
                window.location.href = "home/index.html"; 
            }
        } else {
            showAlert("Username/Password Salah!", "error");
        }
    });

    // REGISTER
    document.getElementById("btnRegister").addEventListener("click", () => {
        const username = document.getElementById("regUsername").value.trim();
        const password = document.getElementById("regPassword").value.trim();
        const confirmPassword = document.getElementById("regConfirmPassword").value.trim();
        
        if(!username || !password) {
            showAlert("Username dan Password harus diisi!", "error");
            return;
        }
        
        if(password !== confirmPassword) {
            showAlert("Password dan Konfirmasi Password tidak cocok!", "error");
            return;
        }
        
        // Cek apakah username sudah ada
        const users = JSON.parse(localStorage.getItem('loki_users') || '[]');
        const userExists = users.some(user => user.username === username);
        
        if(userExists) {
            showAlert("Username sudah terdaftar!", "error");
            return;
        }
        
        // Tambah user baru
        users.push({username, password});
        localStorage.setItem('loki_users', JSON.stringify(users));
        
        showAlert("Register Berhasil! Silakan login.", "success");
        setTimeout(() => {
            showPage('loginPage');
        }, 1500);
    });

    // Link navigasi
    document.getElementById("linkKeRegister").addEventListener("click", () => showPage('registerPage'));
    document.getElementById("linkKeLogin").addEventListener("click", () => showPage('loginPage'));
    
    // Demo accounts overlay
    window.showDemoAccounts = () => {
        if(overlayAkun) overlayAkun.style.display = "flex";
    };
    
    document.getElementById("btnCloseOverlay").addEventListener("click", () => {
        if(overlayAkun) overlayAkun.style.display = "none";
    });

    // Inisialisasi local storage jika belum ada
    if (!localStorage.getItem('loki_users')) {
        localStorage.setItem('loki_users', JSON.stringify([]));
    }
});