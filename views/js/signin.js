document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const requestData = {
        email: formData.get("email"),
        password: formData.get("password")
    };

    axios.post("http://localhost:4000/user/login", requestData)
    .then(response => {
        alert(response.data.message);
        // redirect to another page after successful login
         window.location.href = "./asyncexpense.html";
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Invalid email or password. Please try again.");
    });
});
