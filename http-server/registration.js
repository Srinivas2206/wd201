window.addEventListener("DOMContentLoaded", function () {
    displayStoredEntries();
});

document.getElementById("my-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = collectFormData();
    if (validateFormData(formData)) {
        storeEntry(formData);
        clearForm();
        displayStoredEntries();
    }
});

function collectFormData() {
    return {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
        dob: document.getElementById("dob").value,
        acceptedTerms: document.getElementById("acceptTerms").checked,
    };
}

function validateFormData({ name, email, password, dob, acceptedTerms }) {
    if (!name || !email || !password || !dob || !acceptedTerms) {
        alert("Please fill all the fields and accept the terms.");
        return false;
    }

    if (!isValidEmail(email)) {
        alert("Please enter a valid email.");
        return false;
    }

    if (!isAgeValid(dob)) {
        alert("Age must be between 18 and 55 years.");
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isAgeValid(dob) {
    const birthDate = new Date(dob);
    const age = calculateAge(birthDate);
    return age >= 18 && age <= 55;
}

function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function storeEntry(formData) {
    const entries = getStoredEntries();
    entries.push(formData);
    localStorage.setItem("userEntries", JSON.stringify(entries));
    
}

function getStoredEntries(){
    const entries =  JSON.parse(localStorage.getItem("userEntries")) || [];
    return entries
}

function displayStoredEntries() {
    const entries = getStoredEntries();
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    if (entries.length === 0) {
        return; // No entries to display
    }


    entries.forEach((entry) => {
        const row = `<tr>
           <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.acceptedTerms ? "Yes" : "No"}</td>
        </tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);
    });
}


function clearForm() {
    document.getElementById("my-form").reset();
}