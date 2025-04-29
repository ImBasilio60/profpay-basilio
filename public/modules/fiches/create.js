export default function create(readNotification, createNotification) {
  const profID = JSON.parse(localStorage.getItem("professeurID"));
  if (profID !== null) {
    (async function () {
      try {
        const responseProf = await fetch(
          "http://localhost/profpay-basilio/api/professeurs/read.php"
        );
        const professeurs = await responseProf.json();

        const professeur = professeurs.find(
          (prof) => parseInt(prof.ID_P) === parseInt(profID)
        );

        if (professeur) {
          setInputValue("matricule", professeur.MATRICULE);
          setInputValue("categorie", professeur.CATEGORIE);
          setInputValue("nom", professeur.NOM);
          setInputValue("prenom", professeur.PRENOM);

          const responseSalaire = await fetch(
            "http://localhost/profpay-basilio/api/salaires/read.php"
          );
          const salaires = await responseSalaire.json();
          const salaire = salaires.find((s) => s.CODE_C === professeur.CODE_C);

          if (salaire) {
            setInputValue("salaire-base", salaire.SBASE);
          }

          const responseTaux = await fetch(
            "http://localhost/profpay-basilio/api/taux/read.php"
          );
          const tauxList = await responseTaux.json();
          const taux = tauxList[0];

          const addBtn = document.querySelector("#add-btn-fiche");
          addBtn.setAttribute("data-professeur", professeur.ID_P);
          addBtn.setAttribute("data-salaire", salaire?.ID_S || "");
          addBtn.setAttribute("data-taux", taux?.ID_T || "");
          localStorage.removeItem("professeurID");
        }
      } catch (err) {
        console.error("Erreur lors du chargement des données : ", err);
      }
    })();
  }

  document.querySelector("#matricule").addEventListener("keyup", addToForm);

  async function addToForm(e) {
    const matricule = e.target.value.trim();

    if (!matricule) {
      clearForm();
      return;
    }

    try {
      const responseProf = await fetch(
        "http://localhost/profpay-basilio/api/professeurs/read.php"
      );
      const professeurs = await responseProf.json();

      const professeur = professeurs.find((prof) =>
        prof.MATRICULE.includes(matricule)
      );

      if (professeur) {
        setInputValue("categorie", professeur.CATEGORIE);
        setInputValue("nom", professeur.NOM);
        setInputValue("prenom", professeur.PRENOM);

        const responseSalaire = await fetch(
          "http://localhost/profpay-basilio/api/salaires/read.php"
        );
        const salaires = await responseSalaire.json();
        const salaire = salaires.find((s) => s.CODE_C === professeur.CODE_C);

        if (salaire) {
          setInputValue("salaire-base", salaire.SBASE);
        }

        const responseTaux = await fetch(
          "http://localhost/profpay-basilio/api/taux/read.php"
        );
        const tauxList = await responseTaux.json();
        const taux = tauxList[0];

        const addBtn = document.querySelector("#add-btn-fiche");
        addBtn.setAttribute("data-professeur", professeur.ID_P);
        addBtn.setAttribute("data-salaire", salaire?.ID_S || "");
        addBtn.setAttribute("data-taux", taux?.ID_T || "");
      }
    } catch (err) {
      console.error("Erreur lors du chargement des données : ", err);
    }
  }

  function setInputValue(id, value) {
    const input = document.getElementById(id);
    if (input) input.value = value;
  }

  document
    .querySelector("#add-btn-fiche")
    .addEventListener("click", createItem);

  async function createItem(e) {
    const btn = e.target;

    const ID_P = btn.getAttribute("data-professeur");
    const ID_S = btn.getAttribute("data-salaire");
    const ID_T = btn.getAttribute("data-taux");
    const HEURE_SUPPL = document.getElementById("heures-suppl").value.trim();
    const matricule = document.getElementById("matricule").value.trim();

    if (!matricule) {
      alert("Veuillez remplir tous les champs 😪");
      return;
    }

    const date = new Date();
    const REF = `F-${date.getDate()}${date.getMilliseconds()}${ID_P}`;

    const data = {
      REF,
      HEURE_SUPPL,
      ID_P,
      ID_S,
      ID_T,
    };

    const test = await testProf(ID_P);
    if (test === true) {
      alert("Professeur déja payé ce mois ci! 🤑");
      clearForm();
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/profpay-basilio/api/fiches/create.php",
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
        alert("Erreur : " + result.error);
        console.error("Erreur lors de l'ajout :", result.error);
      } else {
        console.log("Fiche créée :", result);
        animer();
        // Réinitialiser les champs si besoin :
        clearForm();
        gererAttente();
        createNotification();
        readNotification();
        incrementer();
      }
    } catch (error) {
      alert("Une erreur s'est produite lors de la création de la fiche 😕");
      console.error("Erreur réseau :", error);
    }
  }

  /*Attente */
  gererAttente();

  function clearForm() {
    document.getElementById("heures-suppl").value = "";
    document.getElementById("matricule").value = "";
    document.getElementById("categorie").value = "";
    document.getElementById("nom").value = "";
    document.getElementById("prenom").value = "";
    document.getElementById("salaire-base").value = "";
  }

  async function testProf(profID) {
    let result = false;
    const response = await fetch(
      "http://localhost/profpay-basilio/api/fiches/read.php"
    );
    const fiches = await response.json();
    const filteredFiche = fiches.filter(
      (fiche) => fiche.ID_P === parseInt(profID)
    );
    filteredFiche.forEach((fiche) => {
      const today = new Date();
      const dateF = new Date(fiche.DATEF);
      if (
        dateF.getMonth() === today.getMonth() &&
        dateF.getFullYear() === today.getFullYear()
      ) {
        result = true;
      }
    });
    return result;
  }

  function animer() {
    const formChildren = document.getElementById("payrollForm").children;
    formChildren[0].classList.add("none");
    formChildren[1].classList.remove("none");

    setTimeout(() => {
      formChildren[0].classList.remove("none");
      formChildren[1].classList.add("none");
    }, 1500);
  }

  async function gererAttente() {
    // Récupérer les fiches
    const fichesResponses = await fetch(
      "http://localhost/profpay-basilio/api/fiches/read.php"
    );
    const data = await fichesResponses.json();

    // Filtrer les fiches par mois et année
    const today = new Date();
    const touteFiches = data.filter((fiche) => {
      const ficheDate = new Date(fiche.DATEF);
      return (
        today.getMonth() === ficheDate.getMonth() &&
        today.getFullYear() === ficheDate.getFullYear()
      );
    });

    // Récupérer les professeurs
    const professeursResponses = await fetch(
      "http://localhost/profpay-basilio/api/professeurs/read.php"
    );
    const toutProfesseurs = await professeursResponses.json();

    // Filtrer les professeurs qui n'ont pas de fiche
    const profAttente = toutProfesseurs.filter((prof) => {
      // Vérifier qu'il n'y a pas de fiche associée à ce professeur
      return !touteFiches.some(
        (fiche) => parseInt(fiche.ID_P) === parseInt(prof.ID_P)
      );
    });

    if (profAttente.length !== 0) {
      const profAttenteLimite = profAttente.slice(0, 3);
      populateItem(profAttenteLimite);
    }
  }

  function populateItem(profs) {
    const list = document.querySelector("#prof-list");
    list.innerHTML = profs
      .map(
        (prof) => `
      <li class="prof-list-item flex justify-between items-center border-b border-gray-200 small-txt">
                        ${prof.MATRICULE}: ${prof.PRENOM.toUpperCase()}
                        <button
                          class="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-500 payer" data-id="${
                            prof.ID_P
                          }"
                        >
                          Payer
                        </button>
                      </li>
  `
      )
      .join("");
    document.querySelectorAll(".payer").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const profID = e.target.getAttribute("data-id");
        try {
          const responseProf = await fetch(
            "http://localhost/profpay-basilio/api/professeurs/read.php"
          );
          const professeurs = await responseProf.json();

          const professeur = professeurs.find(
            (prof) => parseInt(prof.ID_P) === parseInt(profID)
          );

          if (professeur) {
            setInputValue("matricule", professeur.MATRICULE);
            setInputValue("categorie", professeur.CATEGORIE);
            setInputValue("nom", professeur.NOM);
            setInputValue("prenom", professeur.PRENOM);

            const responseSalaire = await fetch(
              "http://localhost/profpay-basilio/api/salaires/read.php"
            );
            const salaires = await responseSalaire.json();
            const salaire = salaires.find(
              (s) => s.CODE_C === professeur.CODE_C
            );

            if (salaire) {
              setInputValue("salaire-base", salaire.SBASE);
            }

            const responseTaux = await fetch(
              "http://localhost/profpay-basilio/api/taux/read.php"
            );
            const tauxList = await responseTaux.json();
            const taux = tauxList[0];

            const addBtn = document.querySelector("#add-btn-fiche");
            addBtn.setAttribute("data-professeur", professeur.ID_P);
            addBtn.setAttribute("data-salaire", salaire?.ID_S || "");
            addBtn.setAttribute("data-taux", taux?.ID_T || "");
            localStorage.removeItem("professeurID");
          }
        } catch (err) {
          console.error("Erreur lors du chargement des données : ", err);
        }
      });
    });
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
