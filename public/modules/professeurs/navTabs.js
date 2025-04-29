function openTab(evt, tabName) {
  let tabContent = document.querySelectorAll(".tab-content");
  tabContent.forEach((tab) => tab.classList.add("hidden"));

  let tabLinks = document.querySelectorAll(".tab-link");
  tabLinks.forEach((tab) =>
    tab.classList.remove(
      "border-indigo-500",
      "text-indigo-500",
      "tab-active",
      "hidden"
    )
  );
  if (tabName === "profile") {
    const h2 = document.querySelector("#payrollForm h2");
    h2.textContent = "Inscrire un Professeur";
    document.querySelector("#payrollForm").reset();
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
        const btn = document.querySelector("#addBtn");
        btn.innerHTML = `<i class="fas fa-plus"></i> Ajouter`;
        btn.setAttribute("data-state", "ajout");
      } else {
        // Si aucune donnée n'est retournée, on enlève readonly pour permettre la saisie manuelle
        matricule.removeAttribute("readonly");
      }
    }
    setMatricule();
  }

  document.getElementById(tabName).classList.remove("hidden");
  evt.currentTarget.classList.add("border-indigo-500", "text-indigo-500");
  evt.currentTarget.classList.add("tab-active");
}
