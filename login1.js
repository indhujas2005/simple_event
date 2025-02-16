document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Basic client-side validation
    if (username === "" || password === "") {
        document.getElementById("error-message").innerText = "Please fill in both fields!";
    } else {
        this.submit(); // Submit the form if validation passes
    }
});
