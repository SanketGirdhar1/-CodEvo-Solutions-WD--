    // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
        import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyAeyxqBVrRgLZmJe5d4cVftwyavkNzlYIU",
            authDomain: "authentication-project-18036.firebaseapp.com",
            projectId: "authentication-project-18036",
            storageBucket: "authentication-project-18036.appspot.com",
            messagingSenderId: "349626689665",
            appId: "1:349626689665:web:49397773940e7306c90580",
            measurementId: "G-H6BZK7CMMG"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const auth = getAuth(app);

        // Handle login
        document.getElementById('login-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting

            const email = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    alert('Login successful! Welcome ' + user.email);
                    window.location.href = 'home.html'; // Redirect to home page
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    alert('Error: ' + errorMessage);
                });
        });

        // Handle registration
        document.getElementById('register-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting

            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    alert('Account created successfully! Welcome ' + user.email);
                    $('#registerModal').modal('hide'); // Hide modal after successful registration
                    window.location.href = 'home.html'; // Redirect to home page
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    alert('Error: ' + errorMessage);
                });
        });