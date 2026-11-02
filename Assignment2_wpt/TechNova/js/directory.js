let employees = [];
let search = {};
let nextId = 1;

// Fetch sample employees and add a department using spread syntax.
async function loadEmployees() {
    let message = document.getElementById("load-message");
    message.style.color = "";
    message.textContent = "Loading employees...";
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        console.log(response.status);
        if (response.status != 200) throw new Error("Request failed: " + response.status);
        let data = await response.json();
        employees = data.map(employee => ({...employee, department: "IT"}));
        nextId = Math.max(...employees.map(employee => employee.id), 0) + 1;
        filterEmployees();
        message.textContent = "Sample employees loaded.";
    } catch (error) {
        message.style.color = "red";
        message.textContent = error.message + ". Check your internet connection.";
    }
}

// Filter with a computed property key.
function filterEmployees() {
    let field = document.getElementById("search-field").value;
    let text = document.getElementById("search-text").value.toLowerCase();
    search = {[field]: text};
    let filtered = employees.filter(employee => String(employee[field]).toLowerCase().includes(search[field]));
    showEmployees(filtered);
}

// Build the directory table using DOM elements.
function showEmployees(list) {
    let body = document.getElementById("employee-body");
    body.innerHTML = "";
    for (let employee of list) {
        let {id, name, username, email, phone, department} = employee;
        let row = document.createElement("tr");
        for (let value of [id, name, username, email, phone, department]) {
            let cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        }
        let cell = document.createElement("td");
        let button = document.createElement("button");
        button.textContent = "Remove";
        button.onclick = function() {
            employees = employees.filter(item => item.id != id);
            row.remove();
            updateTotal();
        };
        cell.appendChild(button);
        row.appendChild(cell);
        body.appendChild(row);
    }
    updateTotal();
}

// Update the total and visible count after every change.
function updateTotal() {
    document.getElementById("total").textContent = `Total employees: ${employees.length}`;
    let visible = document.getElementById("employee-body").children.length;
    document.getElementById("showing").textContent = `Showing ${visible} of ${employees.length}`;
}

// Add a dummy employee using object shorthand properties.
function addEmployee() {
    let name = document.getElementById("employee-name").value.trim();
    let department = document.getElementById("department").value.trim();
    if (name == "" || department == "") {
        document.getElementById("add-message").textContent = "Enter name and department.";
        return false;
    }
    let employee = {id: nextId, name, department, username: "employee" + nextId, email: "employee" + nextId + "@example.com", phone: "Not provided"};
    nextId++;
    employees.push(employee);
    document.getElementById("employee-name").value = "";
    document.getElementById("department").value = "";
    document.getElementById("add-message").textContent = "Employee added. Clear your search if the row is hidden.";
    filterEmployees();
    return false;
}
