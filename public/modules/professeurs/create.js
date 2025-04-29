export default function create(callBack, createNotification) {
  // Événement : ajout au formulaire
  document.getElementById("addBtn").addEventListener("click", function () {
    const matricule = getFormValue("matricule");
    const nom = getFormValue("nom");
    const prenom = getFormValue("prenom");
    const telephone = getFormValue("telephone");
    const cin = getFormValue("cin");
    const email = getFormValue("email");
    const categorie = getSelectValue("categorie");

    // Vérification des champs
    if (
      matricule !== "" &&
      nom !== "" &&
      prenom !== "" &&
      telephone !== "" &&
      cin !== "" &&
      email !== "" &&
      categorie !== ""
    ) {
      const data = {
        matricule,
        nom,
        prenom,
        telephone,
        cin,
        email,
        categorie,
      };
      const action = document
        .querySelector("#addBtn")
        .getAttribute("data-state");
      switch (action) {
        case "ajout":
          createItem(data);
          incrementer();
          break;
        case "modifie":
          data.id = document.querySelector("#addBtn").getAttribute("data-id");
          updateItem(data);
          incrementer();
          break;
      }
      setIcon();
    } else {
      alert("Veuillez remplir tous les champs 😪");
    }
  });
  function setIcon() {
    const formChildren = document.getElementById("payrollForm").children;
    formChildren[0].classList.add("none");
    formChildren[1].classList.remove("none");

    setTimeout(() => {
      formChildren[0].classList.remove("none");
      formChildren[1].classList.add("none");
    }, 1500);
  }

  // Récupère la valeur d'un champ input par ID
  function getFormValue(id) {
    if (id === "telephone") {
      return document.getElementById(id).value;
    } else {
      return document.getElementById(id).value.trim();
    }
  }

  // Récupère la valeur d'un <select> par ID
  function getSelectValue(id) {
    const select = document.getElementById(id);
    return select.value.trim();
  }

  // Envoie des données vers l'API pour création
  async function createItem(data) {
    try {
      const response = await fetch(
        "http://localhost/profpay-basilio/api/professeurs/create.php",
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
        setMatricule();
        createNotification("Professeur ajouté avec succès.");
        callBack();
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Une erreur est survenue lors de l'ajout.");
    }
  }
  async function updateItem(data) {
    try {
      const response = await fetch(
        "http://localhost/profpay-basilio/api/professeurs/update.php",
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
        setMatricule();
        callBack();
        createNotification("Professeur mis à jour avec succès.");
        defaultForm();
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Une erreur est survenue lors de l'ajout.");
    }
  }

  // Réinitialise les champs du formulaire
  function resetForm() {
    const fields = [
      "matricule",
      "nom",
      "prenom",
      "telephone",
      "cin",
      "email",
      "categorie",
    ];
    fields.forEach((id) => {
      document.getElementById(id).value = "";
    });
  }

  async function fetchItems() {
    let response = await fetch(
      "http://localhost/profpay-basilio/api/categories/read.php"
    );
    let categories = await response.json();

    // Vérifie si categories est un tableau
    if (Array.isArray(categories)) {
      // Ajoute les options au select
      const selectElementForm = document.getElementById("categorie");
      selectElementForm.innerHTML += categories
        .map(
          (categorie) =>
            `<option value="${categorie.ID_C}">${categorie.CATEGORIE}</option>`
        )
        .join("");
      const selectElementTab = document.getElementById("prof-filter");
      selectElementTab.innerHTML += categories
        .map(
          (categorie) =>
            `<option value="${categorie.ID_C}">${categorie.CATEGORIE}</option>`
        )
        .join("");
    } else {
      console.error("La réponse de l'API n'est pas un tableau valide.");
    }
  }

  async function setMatricule() {
    let response = await fetch(
      "http://localhost/profpay-basilio/api/professeurs/read.php"
    );
    let data = await response.json();

    const matricule = document.getElementById("matricule");

    if (data.length > 0) {
      // On suppose que le premier élément contient le dernier matricule
      const lastMatricule = parseInt(data[0].MATRICULE) + 1;
      matricule.value = lastMatricule; // Remplir l'input avec le nouveau matricule
    } else {
      // Si aucune donnée n'est retournée, on enlève readonly pour permettre la saisie manuelle
      matricule.removeAttribute("readonly");
    }
  }

  setMatricule();
  fetchItems();

  function defaultForm() {
    const h2 = document.querySelector("#payrollForm h2");
    h2.textContent = "Inscrire un Professeur";
    const btn = document.querySelector("#addBtn");
    btn.innerHTML = `<i class="fas fa-plus"></i> Ajouter`;
    btn.setAttribute("data-state", "ajout");
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
