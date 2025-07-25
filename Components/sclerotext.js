// /Components/sclerotext.js

async function loadSclerotext() {
  const urls = [
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSHNQiPP_MAlcN-WqsEvt_794puJkCyQ2iqeiRzthX4KKivPtIA1xNMyjHK4owc1BtI1PEjuQ28OKbJ/pub?gid=481828273&single=true&output=csv",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRo_kq_Yxnw226gC6YBHMnXMwaIEwwsMAUDn8V1Nmip0hBHFou6gT-tw8xFV9Vcza1LVmwEPrgRbj-u/pub?output=csv",
  ];
  const container = document.getElementById("sclerotext-container");

  // Fetch both CSVs in parallel
  const responses = await Promise.all(urls.map((url) => fetch(url)));
  const texts = await Promise.all(responses.map((res) => res.text()));

  // First CSV: reverse for newest first, second CSV: keep order for oldest last
  const allRows = [
    ...texts[0].trim().split("\n").slice(1).reverse(),
    ...texts[1].trim().split("\n").slice(1),
  ];

  allRows.forEach((row) => {
    const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); // handles commas inside quotes
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
