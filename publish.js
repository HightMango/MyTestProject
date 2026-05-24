const API_BASE = "http://localhost:4000/api";

function getToken() {
  return localStorage.getItem("gamelab_token");
}

function setFeedback(message, type = "") {
  const feedback = document.getElementById("publish-feedback");
  if (!feedback) {
    return;
  }
  feedback.textContent = message;
  feedback.classList.remove("error", "success");
  if (type) {
    feedback.classList.add(type);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("publish-form");
  const descInput = document.getElementById("game-desc");
  const descCount = document.getElementById("desc-count");
  const submitBtn = form?.querySelector(".btn-submit");

  if (descInput && descCount) {
    const updateCount = () => {
      descCount.textContent = `${descInput.value.length} / 1000`;
    };
    descInput.addEventListener("input", updateCount);
    updateCount();
  }

  if (!form) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const token = getToken();
    if (!token) {
      setFeedback("Please sign in to publish a game.", "error");
      window.setTimeout(() => {
        window.location.href = "auth.html";
      }, 1500);
      return;
    }

    const agreed = document.getElementById("rules-agree")?.checked;
    if (!agreed) {
      setFeedback(
        typeof t === "function"
          ? t("publish_feedback_please")
          : "Please fill in all required fields and accept the rules.",
        "error"
      );
      return;
    }

    const formData = new FormData(form);

    if (submitBtn) {
      submitBtn.disabled = true;
    }
    setFeedback("Submitting...", "");

    try {
      const response = await fetch(`${API_BASE}/games/submit`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Submission failed");
      }

      const title = String(formData.get("title") || "").trim();
      const successMsg =
        typeof t === "function"
          ? t("publish_feedback_success").replace("{title}", title)
          : data.message || "Game submitted successfully.";
      setFeedback(successMsg, "success");
      form.reset();
      if (descInput && descCount) {
        descCount.textContent = "0 / 1000";
      }
    } catch (error) {
      setFeedback(error.message || "Submission failed", "error");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
      }
    }
  });
});
