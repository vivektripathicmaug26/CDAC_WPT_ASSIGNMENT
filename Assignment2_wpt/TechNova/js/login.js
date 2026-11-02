// Switch the password input between hidden and visible.
function togglePassword() {
    let password = document.getElementById("password");
    let button = document.getElementById("show-button");
    if (password.getAttribute("type") == "password") {
        password.setAttribute("type", "text");
        button.textContent = "Hide";
    } else {
        password.setAttribute("type", "password");
        button.textContent = "Show";
    }
}

// Check the password rule while typing.
function checkPassword() {
    let password = document.getElementById("password").value;
    let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9\s]).{8,}$/;
    let valid = pattern.test(password);
    document.getElementById("password-error").textContent = valid ? "" : "Password must meet all the rules.";
    return valid;
}

// Check all fields locally; this is not real authentication.
function validate() {
    let username = document.getElementById("username").value.trim();
    let passwordOK = checkPassword();
    document.getElementById("username-error").textContent = username == "" ? "Username is required." : "";
    document.getElementById("login-message").textContent = "";
    if (username != "" && passwordOK) document.getElementById("login-message").textContent = "Validation successful. This is a demo login.";
    return false;
}
