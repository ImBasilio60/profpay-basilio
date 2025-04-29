export default function read(callBack) {
  let currentPage = 1;
  const itemsPerPage = 5;
  let professeurs = [];
  let filteredProfesseurs = [];
  let currentCategory = "";

  async function fetchItems() {
    try {
      const response = await fetch(
        "http://localhost/profpay-basilio/api/professeurs/read.php"
      );
      professeurs = await response.json();
      filteredProfesseurs = [...professeurs];

      if (Array.isArray(professeurs)) {
        await displayPage(currentPage);
        callBack();
        if (professeurs.length > itemsPerPage) {
          setupPagination();
        }
      } else {
        console.error("La réponse de l'API n'est pas un tableau valide.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des professeurs :", error);
    }
  }

  async function displayPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = filteredProfesseurs.slice(startIndex, endIndex);

    const table = document.getElementById("professeur-table");
    if (!table) return;

    const rows = await Promise.all(
      pageItems.map(async (professeur) => {
        const attente = await gererAttente(professeur.ID_P);
        return `
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">${professeur.MATRICULE}</td>
          <td class="px-4 py-2">${professeur.NOM} ${professeur.PRENOM}</td>
          <td class="px-4 py-2">Cat ${professeur.CODE_C}</td>
          <td class="px-4 py-2">${professeur.TEL}</td>
          <td class="px-4 py-2 flex justify-around">
            <button class="text-yellow-500 cursor-pointer update" data-id="${
              professeur.ID_P
            }">
              <i class="fas fa-edit"></i>
            </button>
            <button class="text-red-500 cursor-pointer delete" data-id="${
              professeur.ID_P
            }">
            <i class="fas fa-trash-alt"></i>
            </button>
            <button class="text-green-500 cursor-pointer payer ${
              attente ? "" : "hidden"
            }" data-id="${professeur.ID_P}">
              <i class="fas fa-credit-card"></i>
            </button>
          </td>
        </tr>`;
      })
    );

    table.innerHTML = rows.join("");

    setupActionButtons();
  }

  function setupActionButtons() {
    const table = document.getElementById("professeur-table");

    table.querySelectorAll(".payer").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        localStorage.setItem("professeurID", JSON.stringify(id));
        window.location.href = "fiches.php";
      });
    });

    table.querySelectorAll(".update").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        openTab("home");
        setInput(id);
      });
    });

    table.querySelectorAll(".delete").forEach((button) => {
      button.addEventListener("click", async () => {
        const id = button.getAttribute("data-id");
        if (confirm("Voulez-vous vraiment supprimer ❌")) {
          await deleteItem(id);
          fetchItems();
          setMatricule();
        }
      });
    });
  }

  function openTab(tabName) {
    document
      .querySelectorAll(".tab-content")
      .forEach((tab) => tab.classList.add("hidden"));
    document
      .querySelectorAll(".tab-link")
      .forEach((tab) =>
        tab.classList.remove("border-indigo-500", "text-indigo-500")
      );
    document.getElementById(tabName).classList.remove("hidden");
    const firstTab = document.querySelector(".tab-link");
    firstTab.classList.add("border-indigo-500", "text-indigo-500");
  }

  async function setInput(id) {
    const response = await fetch(
      "http://localhost/profpay-basilio/api/professeurs/read.php"
    );
    const items = await response.json();
    const item = items.find((p) => p.ID_P === Number(id));

    if (item) {
      document.getElementById("matricule").value = item.MATRICULE;
      document.getElementById("nom").value = item.NOM;
      document.getElementById("prenom").value = item.PRENOM;
      document.getElementById("cin").value = item.CIN;
      document.getElementById("email").value = item.EMAIL;
      document.getElementById("telephone").value = item.TEL;

      const h2 = document.querySelector("#payrollForm h2");
      h2.textContent = "Mettre à jour les informations";
      const btn = document.querySelector("#addBtn");
      btn.innerHTML = `<i class="fas fa-edit"></i> Modifier`;
      btn.dataset.state = "modifie";
      btn.dataset.id = item.ID_P;
    }
  }

  function setupPagination() {
    const totalPages = Math.ceil(filteredProfesseurs.length / itemsPerPage);
    const container = document.querySelector(".pagination");
    container.innerHTML = "";

    const createButton = (label, disabled, onClick) => {
      const btn = document.createElement("button");
      btn.className = "px-3 py-1 bg-gray-300 rounded hover:bg-gray-400";
      btn.innerHTML = label;
      btn.disabled = disabled;
      btn.addEventListener("click", onClick);
      return btn;
    };

    container.appendChild(
      createButton("&laquo;", currentPage === 1, () =>
        changePage(currentPage - 1)
      )
    );
    for (let i = 1; i <= totalPages; i++) {
      container.appendChild(createButton(i, false, () => changePage(i)));
    }
    container.appendChild(
      createButton("&raquo;", currentPage === totalPages, () =>
        changePage(currentPage + 1)
      )
    );
  }

  function changePage(page) {
    if (
      page >= 1 &&
      page <= Math.ceil(filteredProfesseurs.length / itemsPerPage)
    ) {
      currentPage = page;
      displayPage(currentPage);
    }
  }

  function filterProfessors(searchText, category) {
    filteredProfesseurs = professeurs.filter((p) => {
      const matchText =
        p.NOM.toLowerCase().includes(searchText.toLowerCase()) ||
        p.PRENOM.toLowerCase().includes(searchText.toLowerCase()) ||
        p.MATRICULE.toLowerCase().includes(searchText.toLowerCase());
      const matchCat = category === "" || p.ID_C == category;
      return matchText && matchCat;
    });

    displayPage(1);
    setupPagination();
  }

  document.getElementById("prof-search").addEventListener("keyup", (e) => {
    filterProfessors(e.target.value.trim(), currentCategory);
  });

  document.getElementById("prof-filter").addEventListener("change", (e) => {
    currentCategory = e.target.value;
    filterProfessors(
      document.getElementById("prof-search").value.trim(),
      currentCategory
    );
  });

  async function deleteItem(id) {
    const response = await fetch(
      "http://localhost/profpay-basilio/api/professeurs/delete.php",
      {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const result = await response.json();
    if (result.error) {
      console.error(result.error);
      alert(result.error);
    }
  }

  async function setMatricule() {
    const response = await fetch(
      "http://localhost/profpay-basilio/api/professeurs/read.php"
    );
    const data = await response.json();
    const input = document.getElementById("matricule");

    if (data.length > 0) {
      const lastMatricule = parseInt(data[0].MATRICULE) + 1;
      input.value = lastMatricule;
    } else {
      input.removeAttribute("readonly");
    }
  }

  async function gererAttente(ID_P) {
    const fichesRes = await fetch(
      "http://localhost/profpay-basilio/api/fiches/read.php"
    );
    const fiches = await fichesRes.json();
    const today = new Date();
    const fichesThisMonth = fiches.filter((fiche) => {
      const d = new Date(fiche.DATEF);
      return (
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    });

    const profRes = await fetch(
      "http://localhost/profpay-basilio/api/professeurs/read.php"
    );
    const allProfs = await profRes.json();
    const profsSansFiche = allProfs.filter((prof) => {
      return !fichesThisMonth.some(
        (fiche) => parseInt(fiche.ID_P) === parseInt(prof.ID_P)
      );
    });

    return profsSansFiche.some((p) => p.ID_P === ID_P);
  }

  fetchItems(); // Démarrage initial
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("cloche").addEventListener("click", function (e) {
      async function setNotificationToRead() {
        const data = await fetch(
          "http://localhost/profpay-basilio/api/notifications/update.php"
        );
        return await data.json();
      }
      setNotificationToRead()
        .then((res) => {
          const span = document.getElementById("notification-nombre");
          e.target.classList.remove("fa-shake");
          span.classList.add("none");
          console.log(res);
          if (typeof callBack === "function") {
            setTimeout(() => {
              callBack();
            }, 5000);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    });

    async function getNotificationNumber() {
      const response = await fetch(
        "http://localhost/profpay-basilio/api/notifications/read.php"
      );
      const allNotifictions = await response.json();
      let notificationNotRead = [];
      if (allNotifictions.length !== 0) {
        notificationNotRead = allNotifictions.filter(
          (notification) => Boolean(notification.is_read) === false
        );
      }
      return notificationNotRead;
    }

    getNotificationNumber()
      .then((e) => {
        const data = e.length;
        if (data !== 0) {
          const span = document.getElementById("notification-nombre");
          setTimeout(() => {
            span.innerText = data;
            span.classList.remove("none");
            document.getElementById("cloche").classList.add("fa-shake");
          }, 500);
        } else {
          document.getElementById("cloche").classList.remove("fa-shake");
          const span = document.getElementById("notification-nombre");
          span.classList.add("none");
        }
      })
      .catch((e) => console.log(e));
  });
}
