/* Google Analytics 4 — tokishirazu.llc
   Single source of truth for the measurement ID. Loaded on every page.
   GA4 property: G-6KC04Q4EE3 (replaces the retired UA-122399129-3). */
(function () {
  "use strict";
  var ID = "G-6KC04Q4EE3";

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", ID);
})();
