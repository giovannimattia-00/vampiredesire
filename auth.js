// fake credentials
const USERNAME = "vampire";
const PASSWORD = "desire";

function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  if (u === USERNAME && p === PASSWORD) {
    localStorage.setItem("vd_access", "granted");
    window.location.href = "index.html";
  } else {
    alert("ACCESS DENIED");
  }
}

// protect pages
if (!window.location.href.includes("login.html")) {
  if (localStorage.getItem("vd_access") !== "granted") {
    window.location.href = "login.html";
  }
    }
