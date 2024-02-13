
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const requestData = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    };

    axios.post("http://localhost:4000/user/signup", requestData)
    .then(response => {
        alert(response.data.message);
        // redirect to another page after successful registration
        window.location.href = "./signin.html";
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    });
});
