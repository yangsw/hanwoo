async function renderReproEvents(kind) {
  const el = document.getElementById("repro-list");
  if (!el) return;
  const rec = await HANWOO.loadJSON("records.json");
  const items = rec.filter(function (r) {
    return !kind || r.category === kind;
  });
  el.innerHTML = items.map(function (r) {
    return "<div class=\"card\"><h3>" + r.title + "</h3><p class=\"sub\">" + r.date +
      " · " + r.cattle_id + "</p><p>" + r.note + "</p></div>";
  }).join("") || "<p class=\"sub\">해당 기록이 없습니다.</p>";
}
