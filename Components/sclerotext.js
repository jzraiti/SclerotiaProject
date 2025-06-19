// /Components/sclerotext.js

async function loadSclerotext() {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSHNQiPP_MAlcN-WqsEvt_794puJkCyQ2iqeiRzthX4KKivPtIA1xNMyjHK4owc1BtI1PEjuQ28OKbJ/pub?gid=481828273&single=true&output=csv"; 
  const response = await fetch(url);
  const text = await response.text();
  const rows = text.trim().split("\n").slice(1); // skip header

  const container = document.getElementById("sclerotext-container");

  rows.reverse().forEach((row) => {
    const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); // handles commas inside quotes
    const timestamp = cols[0];
    const email = cols[1];
    const message = cols[2]?.replace(/"/g, "").trim();
    const name = cols[5]?.replace(/"/g, "").trim() || "Anonymous";

    if (message) {
      const div = document.createElement("div");
      div.className =
        "bg-white text-black p-4 rounded-xl mb-6 shadow-md text-left";

      div.innerHTML = `
        <p class="text-lg italic">"${message}"</p>
        <p class="text-sm mt-2 text-right text-gray-600">— ${name}</p>
      `;

      container.appendChild(div);
    }
  });
}

document.addEventListener("DOMContentLoaded", loadSclerotext);
