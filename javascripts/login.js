googleSignIn = () => {
    base_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(base_provider).then(function (result) {
        console.log(result)
        console.log("Success... Google Account Linked")
    }).catch(function (err) {
        console.log(err)
        console.log("Login failed. Try again!")
    })
}


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
        

        var user = firebase.auth().currentUser;

        if (user != null) {

            var email_id = user.email;
            document.getElementById("user_para").innerHTML = "Welcome, " + email_id;
            
           

        }

    } else {
        // No user is signed in.
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
    }
});

function login() {

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error: ' + errorMessage,
            showConfirmButton: false,
            timer: 1500
        })

        // ...
    });

}

function logout() {
    firebase.auth().signOut();
    $("#userEmail").val("");
    $("#userPass").val("");

}
