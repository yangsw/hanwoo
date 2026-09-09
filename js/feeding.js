async function renderFeed() {
  const el = document.getElementById("feed-list");
  if (!el) return;
  const feed = await HANWOO.loadJSON("feed.json");
  el.innerHTML = "<table><thead><tr><th>사료</th><th>유형</th><th>단가(원/kg)</th><th>CP%</th><th>TDN%</th></tr></thead><tbody>" +
    feed.map(function (f) {
      return "<tr><td>" + f.name + "</td><td>" + f.type + "</td><td>" + f.price_krw +
        "</td><td>" + f.cp + "</td><td>" + f.tdn + "</td></tr>";
    }).join("") + "</tbody></table>";
}
function calcRationCost() {
  const kg = Number(document.getElementById("kg").value || 0);
  const price = Number(document.getElementById("price").value || 0);
  const head = Number(document.getElementById("head").value || 0);
  const out = document.getElementById("cost-out");
  if (!out) return;
  out.textContent = "일일 약 " + Math.round(kg * price * head).toLocaleString() + "원";
}
