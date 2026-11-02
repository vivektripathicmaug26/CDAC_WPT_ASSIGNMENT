function showWelcome() {
    let name = document.getElementById("visitor-name").value;

    if (name.trim() == "") {
        document.getElementById("welcome-message").textContent = "Please enter your name.";
    } else {
        document.getElementById("welcome-message").textContent = "Welcome, " + name + "!";
    }
}

function showSkills() {
    let skills = document.getElementById("skills-list");
    let button = document.getElementById("skills-button");

    if (skills.style.display == "none") {
        skills.style.display = "block";
        button.textContent = "Hide Skills";
    } else {
        skills.style.display = "none";
        button.textContent = "Show Skills";
    }
}

function changeTheme() {
    let button = document.getElementById("theme-button");

    if (button.textContent == "Light Mode") {
        document.body.style.backgroundColor = "#f3f4f6";
        document.body.style.color = "#111827";
        button.textContent = "Dark Mode";
    } else {
        document.body.style.backgroundColor = "#111827";
        document.body.style.color = "white";
        button.textContent = "Light Mode";
    }
}

function checkForm() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let message = document.getElementById("message").value.trim();
    let consent = document.getElementById("consent").checked;
    let result = document.getElementById("form-message");
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phonePattern = /^[0-9]{10}$/;

    if (name == "") {
        result.textContent = "Please enter your name.";
    } else if (emailPattern.test(email) == false) {
        result.textContent = "Please enter a valid email.";
    } else if (phonePattern.test(phone) == false) {
        result.textContent = "Phone number must have 10 digits.";
    } else if (message.length < 20) {
        result.textContent = "Message must have at least 20 characters.";
    } else if (consent == false) {
        result.textContent = "Please tick the consent checkbox.";
    } else {
        result.textContent = "Thank you, " + name + "! Demo complete. No message was sent.";
    }

    return false;
}

function clearMessage() {
    document.getElementById("form-message").textContent = "";
}
