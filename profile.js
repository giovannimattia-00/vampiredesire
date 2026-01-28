// UNIQUE KEY PER PROFILE (set in HTML)
const key = document.body.dataset.profile;

if (!localStorage.getItem(key+"_seeded")) {
  localStorage.setItem(key+"_revs", JSON.stringify([
    {name:"Anonymous", rating:5, text:"Changed my life."},
    {name:"user_x13", rating:4, text:"Fast replies. Sharp teeth."}
  ]));
  localStorage.setItem(key+"_seeded","yes");
}

/* ---------- MESSAGES ---------- */
function addMessage() {
  const text = document.getElementById("msgText").value.trim();
  if (!text) return;

  const msgs = JSON.parse(localStorage.getItem(key + "_msgs") || "[]");
  msgs.unshift({ text, time: new Date().toLocaleString() });
  localStorage.setItem(key + "_msgs", JSON.stringify(msgs));
  document.getElementById("msgText").value = "";
  renderMessages();
}

function renderMessages() {
  const list = document.getElementById("msgList");
  list.innerHTML = "";
  const msgs = JSON.parse(localStorage.getItem(key + "_msgs") || "[]");
  msgs.forEach(m => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<b>${m.time}</b><br>${m.text}`;
    list.appendChild(div);
  });
}

/* ---------- REVIEWS ---------- */
let rating = 0;

function setRating(n) {
  rating = n;
  document.querySelectorAll(".stars span").forEach((s,i)=>{
    s.classList.toggle("active", i < n);
  });
}

function addReview() {
  const name = document.getElementById("revName").value || "Anonymous";
  const text = document.getElementById("revText").value.trim();
  if (!text || rating === 0) return;

  const revs = JSON.parse(localStorage.getItem(key + "_revs") || "[]");
  revs.unshift({ name, text, rating, time: new Date().toLocaleDateString() });
  localStorage.setItem(key + "_revs", JSON.stringify(revs));

  document.getElementById("revText").value = "";
  setRating(0);
  renderReviews();
}

function renderReviews() {
  const list = document.getElementById("revList");
  list.innerHTML = "";
  const revs = JSON.parse(localStorage.getItem(key + "_revs") || "[]");
  revs.forEach(r => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <b>${r.name}</b> — ${"★".repeat(r.rating)}<br>
      ${r.text}
    `;
    list.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  renderMessages();
  renderReviews();
});

const statuses = [
  "Online now",
  "Idle",
  "Feeding",
  "Away",
  "Offline"
];
document.getElementById("status").innerText =
  statuses[Math.floor(Math.random()*statuses.length)];
