//FIREBASE
//Sign Up Via Firebase
function handleSignUp() {
    var email = document.getElementById('signup-form-email').value;
    var password = document.getElementById('signup-form-password').value;

    if (email.length < 1) {
        alert('Please enter a valid email.');
        return;
    }
    if (password.length < 1) {
        alert('Please enter a stronger password.');
        return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {
            //success
            window.location.href = 'index.html'
        }).catch(function (error) {
            alert(error.message);
        })
}

function handleSignIn() {
    var email = document.getElementById('signup-form-email').value;
    var password = document.getElementById('signup-form-password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            //only if successfully signed in control flow is here
            window.location.href = 'index.html'
        }).catch(function (error) {
            alert(error.message);
        })
}

//Sign In Via Firebase
function handleSignIn() {
    var email = document.getElementById('login-form-email').value;
    var password = document.getElementById('login-form-password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        //only if successfully signed in control flow is here
        window.location.href = 'index.html'
    }).catch(function (error) {
        alert(error.message);
    })
}
//Sign Out
function handleSignOut() {
    firebase.auth().signOut().then(function () {
            window.location.href = 'index.html'
        },
        function (error) {
            console.error('Sign Out Error', error);
        });
}
//Clear Form Inputs
function clear() {
    document.getElementById('login-form-email').value = "";
    document.getElementById('login-form-password').value = "";
}
//Sign In Via Facebook
function handleFBLogin() {
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                var token = result.credential.accessToken;
                var user = result.user;
                alert(user.email);
                window.location.href = 'index.html'
            })
            .catch(function (error) {
                alert(error.message);
            })
    } else {
        handleSignOut();
        alert("Users is already signed out!")
    }
}
//Sign In Via Google
function handleGmailLogin() {
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    } else {
        handleSignOut();
        alert("Users is already signed out!")
    }
}
