const cases = document.querySelectorAll(".case");
// Open json file
fetch("./list.json")
  .then((response) => response.json())
  .then((data) => {
    cases.forEach((caseEl) => {
      caseEl.addEventListener("click", () => {
        openCase(caseEl);

        // Add event listener to close the box when clicking outside
        document.addEventListener("click", (event) => {
          if (!caseEl.contains(event.target)) {
            caseEl.classList.remove("opened");
            caseEl.innerHTML = caseEl.id + "🔒";
          }
        });

        // Add event listener to close the box when pressing escape key
        document.addEventListener("keydown", (event) => {
          if (event.key === "Escape") {
            caseEl.classList.remove("opened");
            caseEl.innerHTML = caseEl.id + "🔒";
          }
        });
      });
    });

    const openCase = (caseEl) => {
      if (!caseEl.classList.contains("unlocked")) return;
      caseEl.classList.add("opened");
      caseEl.innerHTML =
        caseEl.id + `🎁<div class="text">${data[caseEl.id - 1]}</div>`;
    };

    const setCaseUnlocked = (caseEl) => {
      caseEl.classList.remove("locked");
      caseEl.classList.add("unlocked");
      caseEl.innerHTML = caseEl.id + "🔓";
    };

    const wichCaseCanBeUnlocked = () => {
      const today = new Date();
      const date = today.getDate();
      const month = today.getMonth() + 1;
      if (month !== 12) return;
      cases.forEach((caseEl) => {
        if (date >= caseEl.id) {
          setCaseUnlocked(caseEl);
        }
      });
    };
    wichCaseCanBeUnlocked();
  });
