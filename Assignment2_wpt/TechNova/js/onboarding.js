let busy = false;

// Simulate creating an account after one second.
function createAccount(name) {
    document.getElementById("onboarding-message").textContent = "Creating your account...";
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (name.length < 3) reject(new Error("Name must have at least 3 characters."));
            else resolve();
        }, 1000);
    });
}

// Simulate sending a welcome email after two seconds.
function sendWelcomeEmail() {
    document.getElementById("onboarding-message").textContent = "Sending welcome email...";
    return new Promise(function(resolve) { setTimeout(resolve, 2000); });
}

// Simulate assigning a laptop after one and a half seconds.
function assignLaptop() {
    document.getElementById("onboarding-message").textContent = "Assigning your laptop...";
    return new Promise(function(resolve) { setTimeout(resolve, 1500); });
}

// Validate the form and chain the simulated steps in order.
function validate() {
    if (busy) return false;
    let name = document.getElementById("full-name").value.trim();
    let email = document.getElementById("official-email").value.trim();
    let qualification = document.getElementById("qualification").value;
    let department = document.getElementById("department").value;
    let declaration = document.getElementById("declaration").checked;
    let emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    document.getElementById("name-error").textContent = name == "" ? "Full name is required." : "";
    document.getElementById("email-error").textContent = emailOK ? "" : "Enter a valid email.";
    document.getElementById("qualification-error").textContent = qualification == "" ? "Choose a qualification." : "";
    document.getElementById("department-error").textContent = department == "" ? "Choose a department." : "";
    document.getElementById("declaration-error").textContent = declaration ? "" : "Please confirm the declaration.";
    document.getElementById("onboarding-message").textContent = "";
    if (name == "" || !emailOK || qualification == "" || department == "" || !declaration) return false;
    busy = true;
    document.getElementById("submit-button").disabled = true;
    document.getElementById("reset-button").disabled = true;
    createAccount(name).then(function() {
        return sendWelcomeEmail();
    }).then(function() {
        return assignLaptop();
    }).then(function() {
        document.getElementById("onboarding-message").textContent = `Welcome aboard, ${name}! (Demo)`;
    }).catch(function(error) {
        document.getElementById("onboarding-message").textContent = error.message;
    }).finally(function() {
        busy = false;
        document.getElementById("submit-button").disabled = false;
        document.getElementById("reset-button").disabled = false;
    });
    return false;
}

// Clear validation errors when the form is reset.
function clearErrors() {
    let errors = document.getElementsByClassName("error");
    for (let error of errors) error.textContent = "";
    document.getElementById("onboarding-message").textContent = "";
}
