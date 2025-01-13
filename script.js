const form = document.getElementById('password-form');
const passwordList = document.getElementById('password-list');

function loadPasswords() {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwordList.innerHTML = ''; 
    passwords.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td onclick="openModal(this.innerHTML)">${item.url}</td>
            <td onclick="openModal(this.innerHTML)">${item.login}</td>
            <td onclick="openModal(this.innerHTML)">${item.password}</td>
            <td><button class="delete-btn" data-index="${index}">Удалить</button></td>
        `;
        passwordList.appendChild(tr);
    });
}

function generatePassword(length = 12) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = document.getElementById('url').value;
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.push({ url, login, password });
    localStorage.setItem('passwords', JSON.stringify(passwords));
    loadPasswords();
    form.reset();
});

document.getElementById('generate-password').addEventListener('click', () => {
    const password = generatePassword();
    document.getElementById('password').value = password;
});

passwordList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const index = event.target.getAttribute('data-index');
        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords.splice(index, 1); 
        localStorage.setItem('passwords', JSON.stringify(passwords)); 
        loadPasswords(); 
    }
});

function openModal(content) {
    document.getElementById("modalText").innerText = content; 
    document.getElementById("myModal").style.display = "block"; 
}


function closeModal() {
    document.getElementById("myModal").style.display = "none"; 
}

window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
        closeModal();
    }
}

loadPasswords();
