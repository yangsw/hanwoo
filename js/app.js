(function () {
  const nav = [
    ["/", "메인"],
    ["/dashboard/", "대시보드"],
    ["/cattle/", "개체"],
    ["/reproduction/", "번식"],
    ["/health/", "질병"],
    ["/feeding/", "사료"],
    ["/growth/", "성장"],
    ["/records/events.html", "이력"],
    ["/resources/korea/", "자료"]
  ];

  function base() {
    const path = location.pathname.replace(/\/+$/, "");
    const i = path.indexOf("/hanwoo");
    if (i >= 0) return path.slice(0, i + 7);
    return "";
  }

  window.HANWOO = {
    base: base(),
    url: function (p) { return this.base + p; },
    loadJSON: async function (name) {
      const res = await fetch(this.url("/data/" + name));
      if (!res.ok) throw new Error(name + " load failed");
      return res.json();
    }
  };

  const header = document.querySelector("[data-app-header]");
  if (header) {
    const here = location.pathname.replace(/index\.html$/, "");
    header.innerHTML =
      '<div class="brand"><a href="' + HANWOO.url("/") + '">HANWOO</a><small>농장 대장</small></div><nav>' +
      nav.map(function (item) {
        const href = HANWOO.url(item[0]);
        const active = here.endsWith(item[0].replace(/\/$/, "")) || (item[0] !== "/" && here.indexOf(item[0]) >= 0);
        return '<a class="' + (active ? "active" : "") + '" href="' + href + '">' + item[1] + "</a>";
      }).join("") +
      "</nav>";
  }
})();
