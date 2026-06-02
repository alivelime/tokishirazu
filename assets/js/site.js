/* tokishirazu.llc — shared site behavior (no dependencies) */
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close menu when a link is tapped (mobile)
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Auto year in footer(s)
  var yearEls = document.querySelectorAll("[data-year]");
  if (yearEls.length) {
    var y = String(new Date().getFullYear());
    yearEls.forEach(function (el) { el.textContent = y; });
  }
})();
