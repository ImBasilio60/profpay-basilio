export default function create(callBack, createNotification) {
  const addBtn = document.getElementById("addBtnCategorie");
  if (addBtn) {
    addBtn.addEventListener("click", function () {
      let categorie = getFormValue("inp-categorie");
      const diplome = document.getElementById("diplome-select").value.trim();

      if (categorie !== "" && diplome !== "") {
        categorie = categorie.toString().padStart(2, "0");

        const CODE_C = categorie;
        const CATEGORIE = `CATEGORIE ${categorie}`;
        const DIPLOME = diplome;

        const data = {
          CODE_C,
          CATEGORIE,
          DIPLOME,
        };

        const action = addBtn.getAttribute("data-state");

        switch (action) {
          case "ajout":
            createItem(data);
            incrementer();

            break;

          case "modifie":
            data.ID_C = addBtn.getAttribute("data-id");
            updateItem(data);
            addBtn.removeAttribute("data-id");
            addBtn.innerHTML = `<i class="fas fa-plus"></i>Ajouter`;
            addBtn.setAttribute("data-state", "ajout");

            const cancelBtn = document.getElementById("cancelBtnCategorie");
            if (cancelBtn) cancelBtn.remove();
            break;
        }

        setIcon();
      } else {
        alert("Veuillez remplir tous les champs 😪");
      }
    });
  }

  function setIcon() {
    const formChildren = document.getElementById("formCategorie").children;
    formChildren[0].classList.add("none");
    formChildren[1].classList.remove("none");

    setTimeout(() => {
      formChildren[0].classList.remove("none");
      formChildren[1].classList.add("none");
    }, 1500);
  }

  function getFormValue(id) {
    return document.getElementById(id).value;
  }

  async function createItem(data) {
    const response = await fetch(
      "http://localhost/profpay-basilio/api/categories/create.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    if (result.error) {
      console.error(result.error);
    } else {
      resetForm();
      callBack();
      createNotification("Catégorie ajouté avec succès.");
    }
  }

  async function updateItem(data) {
    const response = await fetch(
      "http://localhost/profpay-basilio/api/categories/update.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    if (result.error) {
      console.error(result.error);
    } else {
      resetForm();
      callBack();
      incrementer();
      createNotification("Catégorie mis à jour.");
    }
  }

  function resetForm() {
    document.getElementById("inp-categorie").value = "";
    document.getElementById("diplome-select").value = "";
  }
  function incrementer() {
    let data = 0;
    if (localStorage.getItem("counter-notif") !== null) {
      data = JSON.parse(localStorage.getItem("counter-notif"));
    } else {
      data = 0;
    }
    data = parseInt(data) + 1;
    localStorage.setItem("counter-notif", JSON.stringify(data));
    const span = document.getElementById("notification-nombre");
    setTimeout(() => {
      span.innerText = data;
      span.classList.remove("none");
      document.getElementById("cloche").classList.add("fa-shake");
    }, 1500);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("cloche").addEventListener("click", function (e) {
      localStorage.setItem("counter-notif", JSON.stringify(0));
      const span = document.getElementById("notification-nombre");
      e.target.classList.remove("fa-shake");
      span.classList.add("none");
    });

    let data = 0;
    if (localStorage.getItem("counter-notif") !== null) {
      data = parseInt(JSON.parse(localStorage.getItem("counter-notif")));
    } else {
      data = 0;
    }

    if (data !== 0) {
      const span = document.getElementById("notification-nombre");
      setTimeout(() => {
        span.innerText = data;
        span.classList.remove("none");
        document.getElementById("cloche").classList.add("fa-shake");
      }, 500);
    } else {
      document.getElementById("cloche").classList.remove("fa-shake");
    }
  });
}
