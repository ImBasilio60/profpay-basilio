export default function create(callBack, createNotification) {
  // Événement : ajout au formulaire
  document.getElementById("addBtnTaux").addEventListener("click", function (e) {
    const taux = getFormValue("inp-taux");
    // Vérification des champs
    if (taux !== "") {
      const data = {
        taux,
      };

      const action = document
        .querySelector("#addBtnTaux")
        .getAttribute("data-state");
      switch (action) {
        case "ajout":
          createItem(data);

          break;
        case "modifie":
          data.id = document
            .querySelector("#addBtnTaux")
            .getAttribute("data-id");
          updateItem(data);
          const btn = document.querySelector("#addBtnTaux");
          btn.removeAttribute("data-id");
          btn.innerHTML = `<i class="fas fa-plus"></i>Ajouter`;
          btn.setAttribute("data-state", "ajout");
          const h2 = document.querySelector(".action-text-taux");
          h2.textContent = "Enregistrer un Taux";
          break;
      }
      if (document.getElementById("cancelBtnTaux")) {
        document.getElementById("cancelBtnTaux").remove();
      }
      setIcon();
    } else {
      alert("Veuillez remplir tous les champs 😪");
    }
  });
  function setIcon() {
    const formChildren = document.getElementById("formTaux").children;
    formChildren[0].classList.add("none");
    formChildren[1].classList.remove("none");

    setTimeout(() => {
      formChildren[0].classList.remove("none");
      formChildren[1].classList.add("none");
    }, 1500);
  }

  // Récupère la valeur d'un champ input par ID
  function getFormValue(id) {
    return document.getElementById(id).value;
  }

  // Envoie des données vers l'API pour création
  async function createItem(data) {
    const response = await fetch(
      "http://localhost/profpay-basilio/api/taux/create.php",
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
      createNotification("Ajout d'une nouvelle taux.");
      incrementer();
    }
  }
  async function updateItem(data) {
    const response = await fetch(
      "http://localhost/profpay-basilio/api/taux/update.php",
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
      createNotification("Taux mis à jour avec succès.");
      incrementer();
    }
  }
  // Réinitialise les champs du formulaire
  function resetForm() {
    document.getElementById("inp-taux").value = "";
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
