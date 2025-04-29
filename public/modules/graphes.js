import readNotification from "./notifications/read.js";
readNotification();

// Graphique des salaires mensuels
const ctxBar = document.getElementById("barChart").getContext("2d");
new Chart(ctxBar, {
  type: "bar",
  data: {
    labels: [
      "Jan",
      "Fév",
      "Mar",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Août",
      "Sep",
      "Oct",
      "Nov",
      "Déc",
    ],
    datasets: [
      {
        label: "Salaires versés (Ar)",
        data: [
          20000, 21000, 22000, 23000, 24000, 25000, 24500, 25500, 26000, 27000,
          28000, 29000,
        ],
        backgroundColor: "#4F46E5",
      },
    ],
  },
});

const ctxDoughnut = document.getElementById("doughnutChart").getContext("2d");
const doughnutChart = new Chart(ctxDoughnut, {
  type: "doughnut",
  data: {
    labels: ["Paiements effectués", "Paiements en attente"],
    datasets: [
      {
        data: [0, 0], // Données initiales
        backgroundColor: ["#3B82F6", "#F59E0B"], // Bleu pour les paiements effectués, Orange pour en attente
        hoverBackgroundColor: ["#1E40AF", "#D97706"], // Variantes plus foncées pour effet de survol
      },
    ],
  },
  options: {
    responsive: true,
    cutout: "60%", // Ajuste la taille du donut
  },
});
// Exemple de mise à jour des données
function updateChartData(newData) {
  // Modifier les données
  doughnutChart.data.datasets[0].data = newData;
  // Mettre à jour le graphique
  doughnutChart.update();
}

async function getProfNumber() {
  try {
    const response = await fetch(
      "http://localhost/profpay-basilio/api/professeurs/read.php"
    );
    const professeurs = await response.json();
    return Array.isArray(professeurs) ? professeurs.length : 0;
  } catch (error) {
    console.error("Erreur lors du comptage des professeurs :", error);
    return 0;
  }
}
async function getAttenteNumber() {
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

  return profsSansFiche.length;
}

async function getTotalSalaire() {
  const response = await fetch(
    "http://localhost/profpay-basilio/api/fiches/read.php"
  );

  let allData = await response.json();
  let total = 0;
  allData.forEach((fiche) => {
    total += fiche.TAUX * fiche.HEURE_SUPPL + fiche.SBASE;
  });
  return total;
}

async function getSalaireMoyen() {
  const response = await fetch(
    "http://localhost/profpay-basilio/api/fiches/read.php"
  );
  let allData = await response.json();
  let total = 0;
  let salaries = 0;
  allData.forEach((fiche) => {
    total += fiche.TAUX * fiche.HEURE_SUPPL + fiche.SBASE;
    salaries++;
  });
  let salaireMoyen = 0;
  if (salaries !== 0) {
    salaireMoyen = total / salaries;
  } else {
    salaireMoyen = 0;
  }
  return salaireMoyen;
}

async function getTableau() {
  const response = await fetch(
    "http://localhost/profpay-basilio/api/fiches/read.php"
  );
  let allData = await response.json();
  const listes = allData.slice(0, 3);
  document.querySelector("#table-fiche").innerHTML = listes
    .map(
      (fiche) => `
        <tr class="border-b border-gray-200">
          <td class="px-4 py-2">${fiche.REF}</td>
          <td class="px-4 py-2">${fiche.MATRICULE}</td>
          <td class="px-4 py-2">${fiche.NOM}</td>
          <td class="px-4 py-2">${fiche.SBASE}</td>
          <td class="px-4 py-2">${fiche.HEURE_SUPPL}</td>
          <td class="px-4 py-2">${fiche.TAUX}</td>
          <td class="px-4 py-2">${
            fiche.TAUX * fiche.HEURE_SUPPL + fiche.SBASE
          }</td>
        </tr>
      `
    )
    .join("");
}

async function doughnutSet() {
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
  const paiEnAttentes = allProfs.filter((prof) => {
    return !fichesThisMonth.some(
      (fiche) => parseInt(fiche.ID_P) === parseInt(prof.ID_P)
    );
  });
  const paiEffectuer = allProfs.filter((prof) => {
    return fichesThisMonth.some(
      (fiche) => parseInt(fiche.ID_P) === parseInt(prof.ID_P)
    );
  });
  updateChartData([paiEffectuer.length, paiEnAttentes.length]);
}

function animateCount(element, to, duration = 1000) {
  const start = 0;
  const increment = to / (duration / 10);
  let current = start;

  const counter = setInterval(() => {
    current += increment;
    if (current >= to) {
      current = to;
      clearInterval(counter);
    }
    element.textContent = Math.floor(current);
  }, 10);
}

getProfNumber().then((count) => {
  const element = document.getElementById("professeur-nombre");
  if (element) {
    animateCount(element, count, 1000); // 1000ms = 1s
  }
});

getAttenteNumber().then((count) => {
  const element = document.getElementById("attente-nombre");
  if (element) {
    animateCount(element, count, 1000); // 1000ms = 1s
  }
});

getTotalSalaire().then((count) => {
  const element = document.getElementById("total-salaire");
  if (element) {
    animateCount(element, count, 1000); // 1000ms = 1s
  }
});

getSalaireMoyen().then((count) => {
  const element = document.getElementById("moyenne-salaire");
  if (element) {
    animateCount(element, count, 1000); // 1000ms = 1s
  }
});

getTableau();
doughnutSet();

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
    })
    .catch((e) => {
      console.error(e);
    });
});

document.addEventListener("DOMContentLoaded", function () {
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
