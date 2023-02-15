if (window.location.pathname.endsWith("landing.html")) {
  localStorage.getItem('sessionUserName') ? '' : signOut();
}

function signOut() {
  localStorage.removeItem('sessionUserName');
  location.replace("../index.html");
}