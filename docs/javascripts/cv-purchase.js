(function () {
  var ENDPOINT = "https://blueprint-cv-purchase-worker.shoug-alomran.workers.dev/submit";
  var SUCCESS_URL = "/thank-you/";
  var FALLBACK_EMAIL = "blueprint@shoug-tech.com";
  var SOURCE = "cv-catalog";
  var LOCALE = "en";

  function getTemplateName(link) {
    return (link.getAttribute("data-cv-buy") || "CV Template").trim();
  }

  function getTier(link) {
    return (link.getAttribute("data-cv-tier") || "").trim();
  }

  function getSubject(templateName) {
    return "CV Template Purchase, " + templateName;
  }

  function buildMailto(templateName) {
    return (
      "mailto:" +
      FALLBACK_EMAIL +
      "?subject=" +
      encodeURIComponent(getSubject(templateName))
    );
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setButtonState(link, isBusy) {
    if (isBusy) {
      if (!link.dataset.originalText) {
        link.dataset.originalText = link.textContent;
      }
      link.textContent = "Processing...";
      link.setAttribute("aria-disabled", "true");
      link.style.pointerEvents = "none";
      link.style.opacity = "0.7";
    } else {
      link.textContent = link.dataset.originalText || "Buy";
      link.removeAttribute("aria-disabled");
      link.style.pointerEvents = "";
      link.style.opacity = "";
    }
  }

  async function handlePurchase(link) {
    var templateName = getTemplateName(link);
    var tier = getTier(link);
    var email = window.prompt(
      "Enter your email so Blueprint can send purchase details for " + templateName + "."
    );

    if (email === null) {
      return;
    }

    email = email.trim();

    if (!email) {
      window.alert("Email is required.");
      return;
    }

    if (!isValidEmail(email)) {
      window.alert("Please enter a valid email address.");
      return;
    }

    setButtonState(link, true);

    try {
      var formData = new FormData();
      formData.append("email", email);
      formData.append("_subject", getSubject(templateName));
      formData.append("template", templateName);
      formData.append("tier", tier);
      formData.append("source", SOURCE);
      formData.append("locale", LOCALE);

      var response = await fetch(ENDPOINT, {
        method: "POST",
        mode: "cors",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Request failed with status " + response.status);
      }

      window.location.assign(SUCCESS_URL);
    } catch (error) {
      setButtonState(link, false);
      window.location.href = buildMailto(templateName);
    }
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[data-cv-buy]");
    if (!link) {
      return;
    }

    event.preventDefault();

    if (link.getAttribute("aria-disabled") === "true") {
      return;
    }

    handlePurchase(link);
  });
})();
