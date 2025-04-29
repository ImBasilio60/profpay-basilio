export default function read(callBack) {
  let currentPage = 1;
  const itemsPerPage = 3;
  let categorie = [];

  async function fetchItems() {
    try {
      let response = await fetch(
        "http://localhost/profpay-basilio/api/categories/read.php"
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }

      categorie = await response.json();

      if (Array.isArray(categorie)) {
        callBack();
        displayPage(currentPage);

        // Affiche la pagination uniquement si le nombre d'éléments est supérieur à itemsPerPage
        if (categorie.length > itemsPerPage) {
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
    const pageItems = categorie.slice(startIndex, endIndex);

    const table = document.getElementById("categorie-table");
    if (table) {
      table.innerHTML = pageItems
        .map(
          (item) =>
            `<tr class="border-b border-gray-200">
              <td class="px-4 py-2">${item.CODE_C}</td>
              <td class="px-4 py-2">${item.CATEGORIE}</td>
              <td class="px-4 py-2">${item.DIPLOME}</td>
              <td class="px-4 py-2 flex justify-around">
                <button class="text-yellow-500 cursor-pointer update-categorie"
                        data-id="${item.ID_C}"
                        data-value="${item.CODE_C}">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="text-red-500 cursor-pointer delete-categorie"
                        data-id="${item.ID_C}"
                        data-value="${item.CODE_C}">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>`
        )
        .join("");

      const updateButtons = table.querySelectorAll(".update-categorie");
      updateButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const id = button.getAttribute("data-id");
          const categorie = button.getAttribute("data-value");
          setCategorie(id, categorie);
        });
      });

      const deleteButtons = table.querySelectorAll(".delete-categorie");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const id = button.getAttribute("data-id");
          if (confirm("Voulez vous supprimez vraiment ❌")) {
            deleteCategorie(id);
          }
        });
      });

      async function deleteCategorie(ID_C) {
        if (!ID_C) {
          console.error("ID_C manquant pour la suppression.");
          return;
        }

        let response = await fetch(
          "http://localhost/profpay-basilio/api/categories/delete.php",
          {
            method: "POST",
            body: JSON.stringify({ ID_C }),
            headers: { "Content-Type": "application/json" },
          }
        );
        let result = await response.json();

        if (result.error) {
          console.error(result.error);
          alert(result.error); // Afficher l'erreur à l'utilisateur
        } else {
          // Supprimer l'élément localement de la variable categorie
          categorie = categorie.filter((item) => item.ID_C !== ID_C);
          // Appeler fetchItems pour récupérer les données après suppression
          fetchItems(); // Rafraîchit les données après la suppression

          if (document.querySelector("#cancelBtnCategorie")) {
            const cancelBtn = document.querySelector("#cancelBtnCategorie");
            const container = document.querySelector(".btn-container-2");
            container.removeChild(cancelBtn);
            document.querySelector("#inp-categorie").value = "";
            const btn = document.querySelector("#addBtnCategorie");
            btn.removeAttribute("data-id");
            btn.innerHTML = `<i class="fas fa-plus"></i>Ajouter`;
            btn.setAttribute("data-state", "ajout");
            const title = document.getElementById("categorie-title");
            title.textContent = "Ajouter un Catégorie";
          }
        }
      }

      function setCategorie(id, categorie) {
        document.querySelector("#inp-categorie").value = categorie;
        const btn = document.querySelector("#addBtnCategorie");
        btn.setAttribute("data-id", id);
        btn.innerHTML = `<i class="fas fa-edit"></i> Modifier`;
        btn.setAttribute("data-state", "modifie");

        if (!document.querySelector("#cancelBtnCategorie")) {
          const cancelBtn = document.createElement("button");
          cancelBtn.type = "button";
          cancelBtn.id = "cancelBtnCategorie";
          cancelBtn.className =
            "w-full flex items-center justify-center gap-2 p-3 text-white font-medium rounded-lg shadow-md focus:outline-none h-9 transition duration-200 bg-gray-600 cancel-btn";

          const icon = document.createElement("i");
          icon.className = "fas fa-times";
          const text = document.createTextNode("Annuler");

          cancelBtn.appendChild(icon);
          cancelBtn.appendChild(text);
          const title = document.getElementById("categorie-title");
          title.textContent = "Modifier ce categorie";
          const container = document.querySelector(".btn-container-2");
          container.appendChild(cancelBtn);

          cancelBtn.addEventListener("click", () => {
            document.querySelector("#inp-categorie").value = "";
            const btn = document.querySelector("#addBtnCategorie");
            btn.removeAttribute("data-id");
            btn.innerHTML = `<i class="fas fa-plus"></i>Ajouter`;
            btn.setAttribute("data-state", "ajout");
            container.removeChild(cancelBtn);
            title.textContent = "Ajouter un Catégorie";
          });
        }
      }
    }
  }

  function setupPagination() {
    const totalPages = Math.ceil(categorie.length / itemsPerPage);
    const paginationContainer = document.querySelector(".pagination-categorie");
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
    if (page < 1 || page > Math.ceil(categorie.length / itemsPerPage)) return;
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
