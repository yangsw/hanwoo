async function renderVaccines() {
  const el = document.getElementById("vaccine-list");
  if (!el) return;
  const v = await HANWOO.loadJSON("vaccines.json");
  el.innerHTML = "<table><thead><tr><th>백신</th><th>대상</th><th>주기</th><th>비고</th></tr></thead><tbody>" +
    v.map(function (x) {
      return "<tr><td>" + x.name + "</td><td>" + x.target + "</td><td>" + x.schedule +
        "</td><td>" + x.note + "</td></tr>";
    }).join("") + "</tbody></table>";
}
