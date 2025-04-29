export default function read(callBack) {
  const itemsPerPage = 5;
  let currentPage = 1;
  let allData = [];
  let filteredData = [];

  async function fetchItems() {
    const response = await fetch(
      "http://localhost/profpay-basilio/api/fiches/read.php"
    );
    allData = await response.json();
    filteredData = allData;
    renderTable();
    renderPagination();
    if (typeof callBack === "function") {
      callBack();
    }
  }

  function renderTable() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = filteredData.slice(start, end);

    document.querySelector("#table-fiche").innerHTML = paginatedData
      .map(
        (fiche, index) => `
        <tr class="border-b border-gray-200" data-index="${start + index}">
          <td class="px-4 py-2">${fiche.REF}</td>
          <td class="px-4 py-2">${fiche.MATRICULE}</td>
          <td class="px-4 py-2">${fiche.NOM}</td>
          <td class="px-4 py-2">${fiche.SBASE}</td>
          <td class="px-4 py-2">${fiche.HEURE_SUPPL}</td>
          <td class="px-4 py-2">${fiche.TAUX}</td>
          <td class="px-4 py-2">${
            fiche.TAUX * fiche.HEURE_SUPPL + fiche.SBASE
          }</td>
          <td class="px-4 py-2 flex justify-around">
            <button class="text-indigo-500 hover:text-indigo-600 print-btn cursor-pointer" data-index="${
              start + index
            }">
              <i class="fas fa-print"></i>
            </button>
          </td>
        </tr>
      `
      )
      .join("");

    setupPrintButtons();
  }

  function renderPagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const pagination = document.querySelector(".pagination-fiche");
    pagination.innerHTML = "";

    const prevBtn = document.createElement("button");
    prevBtn.innerHTML = "&laquo;";
    prevBtn.className = "px-3 py-1 bg-gray-300 rounded hover:bg-gray-400";
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
      currentPage--;
      renderTable();
      renderPagination();
    };
    pagination.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = `px-3 py-1 rounded hover:bg-gray-400 ${
        currentPage === i ? "active" : "bg-gray-300"
      }`;
      btn.onclick = () => {
        currentPage = i;
        renderTable();
        renderPagination();
      };
      pagination.appendChild(btn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.innerHTML = "&raquo;";
    nextBtn.className = "px-3 py-1 bg-gray-300 rounded hover:bg-gray-400";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
      currentPage++;
      renderTable();
      renderPagination();
    };
    pagination.appendChild(nextBtn);
  }

  // 🔍 Fonction de recherche
  function setupSearch() {
    const searchInput = document.querySelector("#search-prof");
    searchInput.addEventListener("keyup", (e) => {
      const query = e.target.value.toLowerCase();

      filteredData = allData.filter(
        (fiche) =>
          fiche.NOM.toLowerCase().includes(query) ||
          fiche.MATRICULE.toLowerCase().includes(query)
      );

      currentPage = 1; // reset page à 1
      renderTable();
      renderPagination();
    });
  }

  fetchItems();
  setupSearch();

  function setupPrintButtons() {
    const buttons = document.querySelectorAll(".print-btn");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.dataset.index);
        const fiche = filteredData[index];
        generatePDF(fiche);
      });
    });
  }

  function generatePDF(fiche) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("ProfPAY", 70, 20);

    doc.autoTable({
      startY: 30,
      head: [["Champ", "Valeur"]],
      body: [
        ["REF", fiche.REF],
        ["Matricule", fiche.MATRICULE],
        ["Nom", fiche.NOM],
        ["Prenom", fiche.PRENOM],
        ["Salaire de base", fiche.SBASE],
        ["Heures supplémentaires", fiche.HEURE_SUPPL],
        ["Taux horaire", fiche.TAUX],
        ["Total", fiche.TAUX * fiche.HEURE_SUPPL + fiche.SBASE],
      ],
    });

    doc.save(`fiche-${fiche.MATRICULE}.pdf`);
  }
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
