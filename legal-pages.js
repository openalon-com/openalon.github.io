(function () {
  function createBrandMarkup() {
    return '' +
      '<svg class="brand-wordmark" viewBox="0 0 260 52" xmlns="http://www.w3.org/2000/svg" aria-label="OpenAlon logo">' +
      '<text x="0" y="38" font-size="38" font-weight="800" letter-spacing="1.5" fill="#2E32FF">OpenAlon</text>' +
      '</svg>';
  }

  function buildSiteNav() {
    var nav = document.createElement("nav");
    nav.className = "legal-site-nav";
    nav.setAttribute("aria-label", "Site");

    [
      { href: "/about-us.html", label: "ABOUT US" },
      { href: "/games.html", label: "GAMES" }
    ].forEach(function (item) {
      var link = document.createElement("a");
      link.className = "legal-site-link";
      link.href = item.href;
      link.textContent = item.label;
      nav.appendChild(link);
    });

    return nav;
  }

  function moveToolbar(topbar, card, titleRow) {
    var policyTabs = topbar.querySelector(".nav");
    var langSwitcher = titleRow ? titleRow.querySelector(".lang-switcher") : null;
    if (!policyTabs || !card) return;

    var toolbar = document.createElement("div");
    toolbar.className = "policy-toolbar";
    toolbar.appendChild(policyTabs);

    if (langSwitcher) {
      toolbar.appendChild(langSwitcher);
    }

    if (titleRow && titleRow.nextSibling) {
      card.insertBefore(toolbar, titleRow.nextSibling);
    } else if (titleRow) {
      card.appendChild(toolbar);
    } else {
      card.insertBefore(toolbar, card.firstChild);
    }
  }

  function enhanceHeader(topbar) {
    if (!topbar) return;

    var brand = topbar.querySelector(".brand");
    if (brand && !brand.querySelector("svg")) {
      brand.innerHTML = createBrandMarkup();
      brand.setAttribute("aria-label", "OpenAlon home");
    }

    var existingSiteNav = topbar.querySelector(".legal-site-nav");
    if (!existingSiteNav) {
      topbar.appendChild(buildSiteNav());
    }
  }

  function bindLanguageDropdowns() {
    document.querySelectorAll(".lang-switcher").forEach(function (switcher) {
      if (switcher.dataset.enhanced === "1") return;
      switcher.dataset.enhanced = "1";

      var button = switcher.querySelector(".lang-toggle");
      if (!button) return;

      button.addEventListener("click", function (event) {
        event.stopPropagation();
        document.querySelectorAll(".lang-switcher").forEach(function (other) {
          if (other !== switcher) {
            other.classList.remove("open");
          }
        });
        switcher.classList.toggle("open");
      });
    });

    document.addEventListener("click", function () {
      document.querySelectorAll(".lang-switcher").forEach(function (switcher) {
        switcher.classList.remove("open");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var topbar = document.querySelector(".topbar");
    var card = document.querySelector(".card");
    var titleRow = document.querySelector(".title-row");

    if (!topbar || !card || !titleRow) return;

    enhanceHeader(topbar);
    moveToolbar(topbar, card, titleRow);
    bindLanguageDropdowns();
  });
})();
