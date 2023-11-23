const cases = document.querySelectorAll(".case");
const title = document.querySelector(".title");

const version = "1.1";
const date = "21/11/2023";

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
      if (month !== 12 || date >= 25) return;

      cases.forEach((caseEl) => {
        if (date >= caseEl.id) {
          setCaseUnlocked(caseEl);
        }
      });
    };
    wichCaseCanBeUnlocked();
    const deleteFakeCase = (fakeCase) => {
      fakeCase.remove();
    };
    let numberClick = 0;
    title.addEventListener("click", () => {
      numberClick++;
      let today1 = new Date();
      if (
        numberClick < 3 ||
        today1.getMonth() + 1 != 12 ||
        today1.getDate() >= 25
      )
        return;
      // Open all the cases
      cases.forEach((caseEl) => {
        setCaseUnlocked(caseEl);
      });
      // Open a fake case
      const fakeCase = document.createElement("div");
      document.querySelector(".grid").appendChild(fakeCase);
      fakeCase.classList.add("case");
      fakeCase.classList.add("unlocked");
      openCase(fakeCase);
      fakeCase.innerHTML = `🎁<div class='text'>Bravo ! Tu as trouvé le secret ! Donne moi le code \"324\", peut être que tu auras une surprise ! </div>
      <div class='version'>Version ${version} - Date ${date}</div>`;

      setTimeout(() => {
        document.addEventListener("keydown", (event) => {
          if (event.key === "Escape") {
            fakeCase.classList.remove("opened");
            fakeCase.innerHTML = caseEl.id + "🔒";
            deleteFakeCase(fakeCase);
          }
        });
        document.addEventListener("click", (event) => {
          if (!fakeCase.contains(event.target)) {
            fakeCase.classList.remove("opened");
            fakeCase.innerHTML = "🔒";
            deleteFakeCase(fakeCase);
          }
        });
      }, 1000);
    });
  });
