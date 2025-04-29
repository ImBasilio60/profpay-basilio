export default function read(callBack) {
  let currentPage = 1;
  const itemsPerPage = 2;
  let taux = [];

  async function fetchItems() {
    try {
      let response = await fetch(
        "http://localhost/profpay-basilio/api/taux/read.php"
      );
      taux = await response.json();

      // Vérification si 'taux' est un tableau valide
      if (Array.isArray(taux)) {
        callBack();
        displayPage(currentPage); // Afficher les éléments de la première page
        if (taux.length > itemsPerPage) {
          setupPagination();
        }
      } else {
        console.error("La réponse de l'API n'est pas un tableau valide.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  }

  // Affiche les éléments correspondant à la page actuelle
  function displayPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = taux.slice(startIndex, endIndex);

    const table = document.getElementById("taux-table");
    if (table) {
      table.innerHTML = pageItems
        .map(
          (item) =>
            `<tr class="border-b border-gray-200">
          <td class="px-4 py-2">${item.ID_T}</td>
          <td class="px-4 py-2">${item.TAUX}</td>
          <td class="px-4 py-2">${item.DATE}</td>
          <td class="px-4 py-2 flex justify-around">
            <button class="text-yellow-500 update-taux cursor-pointer" data-id="${item.ID_T}" data-value="${item.TAUX}">
              <i class="fas fa-edit"></i>
            </button>
          </td>
        </tr>`
        )
        .join("");

      const updateButtons = table.querySelectorAll(".update-taux");
      updateButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const id = button.getAttribute("data-id");
          const taux = button.getAttribute("data-value");
          setTaux(id, taux);
        });
      });

      function setTaux(id, taux) {
        document.querySelector("#inp-taux").value = taux;
        const btn = document.querySelector("#addBtnTaux");
        btn.setAttribute("data-id", id);
        btn.innerHTML = `<i class="fas fa-edit"></i> Modifier`;
        btn.setAttribute("data-state", "modifie");

        const container = document.querySelector(".btn-container-3");

        // 🔍 Empêcher la création multiple du bouton "Annuler"
        if (!document.querySelector("#cancelBtnTaux")) {
          const cancelBtn = document.createElement("button");
          cancelBtn.type = "button";
          cancelBtn.id = "cancelBtnTaux";
          cancelBtn.className =
            "w-full flex items-center justify-center gap-2 p-3 text-white font-medium rounded-lg shadow-md focus:outline-none h-9 transition duration-200 bg-gray-600 cancel-btn";

          const icon = document.createElement("i");
          icon.className = "fas fa-times";

          const text = document.createTextNode("Annuler");

          const h2 = document.querySelector(".action-text-taux");
          h2.textContent = "Modifier ce taux";

          cancelBtn.appendChild(icon);
          cancelBtn.appendChild(text);
          container.appendChild(cancelBtn);

          cancelBtn.addEventListener("click", () => {
            document.querySelector("#inp-taux").value = "";
            btn.removeAttribute("data-id");
            btn.innerHTML = `<i class="fas fa-plus"></i>Ajouter`;
            btn.setAttribute("data-state", "ajout");
            h2.textContent = "Enregistrer un Taux";
            container.removeChild(cancelBtn); // ✅ Nettoyer proprement
          });
        }
      }
    }
  }

  // Génère les boutons de pagination dynamiquement
  function setupPagination() {
    const totalPages = Math.ceil(taux.length / itemsPerPage);
    const paginationContainer = document.querySelector(".pagination-taux");
    paginationContainer.innerHTML = ""; // Réinitialiser les boutons de pagination

    // Bouton "Précédent"
    const prevButton = document.createElement("button");
    prevButton.classList.add(
      "px-3",
      "py-1",
      "bg-gray-300",
      "rounded",
      "hover:bg-gray-400"
    );
    prevButton.innerHTML = "&laquo;";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => changePage(currentPage - 1));
    paginationContainer.appendChild(prevButton);

    // Boutons des pages
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.classList.add(
        "px-3",
        "py-1",
        "bg-gray-300",
        "rounded",
        "hover:bg-gray-400"
      );
      pageButton.innerText = i;
      if (i === currentPage) {
        pageButton.classList.add("active");
      }
      pageButton.addEventListener("click", () => changePage(i));
      paginationContainer.appendChild(pageButton);
    }

    // Bouton "Suivant"
    const nextButton = document.createElement("button");
    nextButton.classList.add(
      "px-3",
      "py-1",
      "bg-gray-300",
      "rounded",
      "hover:bg-gray-400"
    );
    nextButton.innerHTML = "&raquo;";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => changePage(currentPage + 1));
    paginationContainer.appendChild(nextButton);
  }

  // Change de page
  function changePage(page) {
    if (page < 1 || page > Math.ceil(taux.length / itemsPerPage)) return;
    currentPage = page;
    displayPage(currentPage);
    setupPagination();
  }

  fetchItems();
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
