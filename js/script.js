var strUserName        = document.getElementById("signup-name"),
    strEmail           = document.getElementById("signup-email"),
    strPassword        = document.getElementById("signup-password"),

    strSigninEmail     = document.getElementById("signin-email"),
    strrSigninPassword = document.getElementById("signin-password"),

    btnSignup          = document.getElementById("signup-btn"),
    btnSignin          = document.getElementById("signin-btn"),
    btnSignout         = document.getElementById("signout-btn"),

    strFailedMessage   = document.getElementById("f-signupAlert"),
    strSuccessMessage  = document.getElementById("s-signupAlert"),

    strValidationAlert = document.getElementById("f-validationAlert"),

    strLandingText     = document.getElementById("landing-text"),

    arrUsers           = [],
    strUsers           = localStorage.getItem("users");
    
if (strUsers!== null) {
  arrUsers = JSON.parse(strUsers);
}

if(btnSignup) {
  btnSignup.addEventListener('click',function() {
    signUp();
  })
}

if(btnSignin) {
  btnSignin.addEventListener('click',function() {
    signIn(strSigninEmail.value,strrSigninPassword.value);
  })
}

if(btnSignout) {
  btnSignout.addEventListener('click',function() {
    signOut();
  })
}

if (window.location.pathname.endsWith("landing.html")) {
  localStorage.getItem('sessionUserName') ? strLandingText.innerHTML = `Welcome ${localStorage.getItem('sessionUserName')}` : signOut();
}

function signUp() {
  if (signupAlert()) {
    objUsers = {
      name: strUserName.value,
      email: strEmail.value,
      password: btoa(strPassword.value),
      loggedIn: 0
    };
    
    arrUsers.push(objUsers);
    localStorage.setItem("users", JSON.stringify(arrUsers));
    strFailedMessage.classList.replace('d-block','d-none');
    strSuccessMessage.classList.replace('d-none','d-block');
    reset();
  } else {
    strSuccessMessage.classList.replace('d-block','d-none');
    strFailedMessage.classList.replace('d-none','d-block');
  }
}

function signIn(strEmail,strPassword) {
  if (strEmail && strPassword) {
    for (var i = 0; i < arrUsers.length; i++) {
      if (strEmail === arrUsers[i].email && strPassword === atob(arrUsers[i].password)) {
        localStorage.setItem('sessionUserName',arrUsers[i].name);
        location.replace("pages/landing.html");
      } else {
        strValidationAlert.classList.replace('d-none','d-block');
        strFailedMessage.classList.replace('d-block','d-none');
        return false;
      }
    }
  } else {
    strFailedMessage.classList.replace('d-none','d-block');
    strValidationAlert.classList.replace('d-block','d-none');
    return false;
  }
  strFailedMessage.classList.replace('d-block','d-none');
  strValidationAlert.classList.replace('d-none','d-block');
}

function signOut() {
  localStorage.removeItem('sessionUserName');
  location.replace("../index.html");
}

function signupAlert() {
  if(strUserName.value && strEmail.value && strPassword.value) {
    return true;
  }
  return false;
}

function reset() {
    strUserName.value = "";
    strEmail.value    = "";
    strPassword.value = "";
}