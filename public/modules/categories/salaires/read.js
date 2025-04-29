export default function read(callBack) {
  let currentPage = 1;
  const itemsPerPage = 3;
  let salaire = [];

  async function fetchItems() {
    try {
      let response = await fetch(
        "http://localhost/profpay-basilio/api/salaires/read.php"
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }

      salaire = await response.json();

      if (Array.isArray(salaire)) {
        callBack();
        displayPage(currentPage);

        if (salaire.length > itemsPerPage) {
          setupPagination();
        }
      } else {
        console.error("La réponse de l'API n'est pas un tableau valide.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  }

  function displayPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = salaire.slice(startIndex, endIndex);

    const table = document.getElementById("salaire-table");
    if (table) {
      table.innerHTML = pageItems
        .map(
          (item) =>
            `<tr class="border-b border-gray-200">
                          <td class="px-4 py-2">${item.SBASE}</td>
                          <td class="px-4 py-2">Cat ${item.CODE_C}</td>
                          <td class="px-4 py-2 flex justify-around">
                            <button class="text-yellow-500 cursor-pointer update-salaire" data-id="${item.ID_S}" data-value="${item.SBASE}">
                              <i class="fas fa-edit"></i>
                            </button>
                            <button class="text-red-500 cursor-pointer delete-salaire" data-id="${item.ID_S}">
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>`
        )
        .join("");

      const updateButtons = table.querySelectorAll(".update-salaire");
      updateButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const id = button.getAttribute("data-id");
          const salaire = button.getAttribute("data-value");
          setsalaire(id, salaire);
        });
      });

      const deleteButtons = table.querySelectorAll(".delete-salaire");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const id = button.getAttribute("data-id");
          if (confirm("Voulez vous supprimez vraiment ❌")) {
            deletesalaire(id);
          }
        });
      });

      async function deletesalaire(id) {
        if (!id) {
          console.error("ID_S manquant pour la suppression.");
          return;
        }

        let response = await fetch(
          "http://localhost/profpay-basilio/api/salaires/delete.php",
          {
            method: "POST",
            body: JSON.stringify({ id }),
            headers: { "Content-Type": "application/json" },
          }
        );
        let result = await response.json();

        if (result.error) {
          console.error(result.error);
          alert(result.error); // Afficher l'erreur à l'utilisateur
        } else {
          fetchItems(); // Rafraîchit les données après la suppression

          if (document.querySelector("#cancelBtnSalaire")) {
            const cancelBtn = document.querySelector("#cancelBtnSalaire");
            const container = document.querySelector(".btn-container-1");
            container.removeChild(cancelBtn);
            document.querySelector("#inp-salaire").value = "";
            const btn = document.querySelector("#addBtnSalaire");
            btn.removeAttribute("data-id");
            btn.innerHTML = `<i class="fas fa-plus"></i>Ajouter`;
            btn.setAttribute("data-state", "ajout");
            const title = document.getElementById("salaire-title");
            title.textContent = "Définir Salaire de Base";
          }
        }
      }

      function setsalaire(id, salaire) {
        document.querySelector("#inp-salaire").value = salaire;
        const btn = document.querySelector("#addBtnSalaire");
        btn.setAttribute("data-id", id);
        btn.innerHTML = `<i class="fas fa-edit"></i> Modifier`;
        btn.setAttribute("data-state", "modifie");
        const title = document.getElementById("salaire-title");
        title.textContent = "Modifier ce salaire";
        if (!document.querySelector("#cancelBtnSalaire")) {
          const cancelBtn = document.createElement("button");
          cancelBtn.type = "button";
          cancelBtn.id = "cancelBtnSalaire";
          cancelBtn.className =
            "w-full flex items-center justify-center gap-2 p-3 text-white font-medium rounded-lg shadow-md focus:outline-none h-9 transition duration-200 bg-gray-600 cancel-btn";

          const icon = document.createElement("i");
          icon.className = "fas fa-times";
          const text = document.createTextNode("Annuler");

          cancelBtn.appendChild(icon);
          cancelBtn.appendChild(text);

          const container = document.querySelector(".btn-container-1");
          container.appendChild(cancelBtn);

          cancelBtn.addEventListener("click", () => {
            document.querySelector("#inp-salaire").value = "";
            const btn = document.querySelector("#addBtnSalaire");
            btn.removeAttribute("data-id");
            btn.innerHTML = `<i class="fas fa-plus"></i>Ajouter`;
            btn.setAttribute("data-state", "ajout");
            title.textContent = "Définir Salaire de Base";
            container.removeChild(cancelBtn);
          });
        }
      }
    }
  }

  function setupPagination() {
    const totalPages = Math.ceil(salaire.length / itemsPerPage);
    const paginationContainer = document.querySelector(".pagination-salaire");
    paginationContainer.innerHTML = "";

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

  function changePage(page) {
    if (page < 1 || page > Math.ceil(salaire.length / itemsPerPage)) return;
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
