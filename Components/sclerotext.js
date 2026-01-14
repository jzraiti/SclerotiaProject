// /Components/sclerotext.js

async function loadSclerotext() {
  const urls = [
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRmt2R1PLdtfnHH4BMll_SVVMlqWDCVD5t4DRUTip5M-IxZKZZJh4grebNSn_m29g/pub?output=csv",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI-W_nJqMkfOx98l9Jdy7IEnwHg3E0hqdJT8NEAaZuD9ZT-cw01HggZgmqTZs2Kg/pub?output=csv",
  ];
  const container = document.getElementById("sclerotext-container");

  // Fetch both CSVs in parallel
  const responses = await Promise.all(urls.map((url) => fetch(url)));
  const texts = await Promise.all(responses.map((res) => res.text()));

  // First CSV: reverse for newest first, second CSV: keep order for oldest last
  const allRows = [
    ...texts[0].trim().split("\n").slice(1),
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
