export default function create(callBack, createNotification) {
  const addBtn = document.getElementById("addBtnSalaire");
  if (addBtn) {
    addBtn.addEventListener("click", function () {
      let salaire = getFormValue("inp-salaire");
      const categorie = document
        .getElementById("salaire-filtre-categorie")
        .value.trim();

      if (salaire !== "" && categorie !== "") {
        salaire = salaire.toString().padStart(2, "0");

        const SBASE = salaire;
        const ID_C = categorie;

        const data = {
          SBASE,
          ID_C,
        };

        const action = addBtn.getAttribute("data-state");

        switch (action) {
          case "ajout":
            createItem(data);
            break;

          case "modifie":
            data.ID_S = addBtn.getAttribute("data-id");
            updateItem(data);
            addBtn.removeAttribute("data-id");
            addBtn.innerHTML = `<i class="fas fa-plus"></i>Ajouter`;
            addBtn.setAttribute("data-state", "ajout");
            const cancelBtn = document.getElementById("cancelBtnSalaire");
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
    const formChildren = document.getElementById("form-salaire").children;
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
      "http://localhost/profpay-basilio/api/salaires/create.php",
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
      createNotification("Nouveau salaire ajouté");
    }
  }

  async function updateItem(data) {
    const response = await fetch(
      "http://localhost/profpay-basilio/api/salaires/update.php",
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
      createNotification("Mis à jour du salaire");
    }
  }

  function resetForm() {
    document.getElementById("inp-salaire").value = "";
    document.getElementById("diplome-select").value = "";
  }
  async function fetchItems() {
    let response = await fetch(
      "http://localhost/profpay-basilio/api/categories/read.php"
    );
    let categories = await response.json();

    // Vérifie si categories est un tableau
    if (Array.isArray(categories)) {
      // Ajoute les options au select
      const selectElementForm = document.getElementById(
        "salaire-filtre-categorie"
      );
      selectElementForm.innerHTML += categories
        .map(
          (categorie) =>
            `<option value="${categorie.ID_C}">${categorie.CATEGORIE}</option>`
        )
        .join("");
    } else {
      console.error("La réponse de l'API n'est pas un tableau valide.");
    }
  }
  fetchItems();
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
