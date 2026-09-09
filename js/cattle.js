async function renderCattleTable(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  try {
    const data = await HANWOO.loadJSON("cattle.json");
    const rows = data.map(function (c) {
      return "<tr><td><a href=\"" + HANWOO.url("/cattle/detail.html?id=" + c.id) + "\">" + c.id +
        "</a></td><td>" + c.name + "</td><td>" + c.sex + "</td><td>" + c.stage +
        "</td><td>" + c.weight_kg + "kg</td><td><span class=\"tag " + statusClass(c.status) + "\">" +
        c.status + "</span></td></tr>";
    }).join("");
    el.innerHTML = "<table><thead><tr><th>개체번호</th><th>이름</th><th>성별</th><th>단계</th><th>체중</th><th>상태</th></tr></thead><tbody>" +
      rows + "</tbody></table>";
  } catch (e) {
    el.textContent = "개체 데이터를 불러오지 못했습니다.";
  }
}
function statusClass(s) {
  if (s === "정상" || s === "임신") return "ok";
  if (s === "발정" || s === "출하예정") return "warn";
  if (s === "치료중") return "bad";
  return "";
}
async function renderCattleDetail() {
  const el = document.getElementById("detail");
  if (!el) return;
  const id = new URLSearchParams(location.search).get("id");
  const data = await HANWOO.loadJSON("cattle.json");
  const c = data.find(function (x) { return x.id === id; }) || data[0];
  el.innerHTML = "<div class=\"card\"><h2>" + c.name + " <span class=\"tag\">" + c.id +
    "</span></h2><p>" + c.sex + " · " + c.stage + " · " + c.birth + "</p><p>체중 " +
    c.weight_kg + "kg · 초음파 BMS " + (c.bms || "-") + "</p><p>어미 " +
    c.dam + " · 아버지 " + c.sire + "</p><p>상태 <span class=\"tag " + statusClass(c.status) +
    "\">" + c.status + "</span></p><p><a href=\"" + HANWOO.url("/cattle/pedigree.html?id=" + c.id) +
    "\">혈통 보기</a></p></div>";
}
