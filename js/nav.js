const a = () => {
  const FILE_RE = /\.html?$/i;

  function computePrefix() {
    const segments = location.pathname.split("/").filter(Boolean);
    let levels = segments.length;
    if (levels > 0 && FILE_RE.test(segments[levels - 1])) {
      levels -= 1;
    }

    return levels <= 0 ? "./" : "../".repeat(levels-1*(location.hostname !== "localhost"));
  }

  function normalizedPath(url) {
    const target = new URL(url, location.href);
    let path = target.pathname;
    path = path.replace(/\/index\.html?$/i, "/");
    path = path.replace(/\/$/, "");
    return target.origin + path;
  }

  function closeMenu(nav, toggle) {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function initNav(nav) {
    const toggle = document.getElementById("navToggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target)) closeMenu(nav, toggle);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMenu(nav, toggle));
    });
  }

  function markActive(nav) {
    const current = normalizedPath(location.href);
    nav.querySelectorAll("a.nav-link").forEach((link) => {
      if (normalizedPath(link.href) === current) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function rewriteHrefs(nav, prefix) {
    nav.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (href) link.setAttribute("href", prefix + href);
    });
  }

  async function loadNav() {
    const prefix = computePrefix();
    console.log(`${prefix}html/nav.html`);
    const nav = document.querySelector(".site-nav");
    if (nav) return initNav(nav);

    try {
      const response = await fetch(`${prefix}html/nav.html`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const markup = await response.text();
      document.body.insertAdjacentHTML("afterbegin", markup);

      const injected = document.querySelector(".site-nav");
      if (!injected) return;
      rewriteHrefs(injected, prefix);
      markActive(injected);
      initNav(injected);
    } catch (err) {
      console.error("Failed to load navigation:", err);
    }
  }

  loadNav();
}
a();
