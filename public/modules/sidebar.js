const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");
const toggleSidebar = document.getElementById("toggleSidebar");
const sidebarTextElements = sidebar.querySelectorAll("span");
const lisNav = sidebar.querySelectorAll("li");
const deconnexion = sidebar.querySelector("#deconnexion");
const logoIcon = document.getElementById("logoIcon");
const logoText = document.getElementById("logoText");

if (toggleSidebar !== null) {
  toggleSidebar.addEventListener("click", (e) => {
    if (sidebar.classList.contains("w-16")) {
      sidebar.classList.remove("w-16");
      sidebar.classList.add("w-64");
      mainContent.classList.remove("ml-16");
      mainContent.classList.add("ml-64");
      sidebarTextElements.forEach((el) => el.classList.remove("hidden"));
      lisNav.forEach((li) => li.classList.remove("justify-center"));
      deconnexion.classList.remove("justify-center");
      logoIcon.classList.add("hidden");
      logoText.classList.remove("hidden");
      e.target.classList = "fas fa-arrow-left";
    } else {
      sidebar.classList.remove("w-64");
      sidebar.classList.add("w-16");
      mainContent.classList.remove("ml-64");
      mainContent.classList.add("ml-16");
      sidebarTextElements.forEach((el) => el.classList.add("hidden"));
      lisNav.forEach((li) => li.classList.add("justify-center"));
      deconnexion.classList.add("justify-center");
      logoIcon.classList.remove("hidden");
      logoText.classList.add("hidden");
      e.target.classList = "fas fa-bars";
    }
  });
}

function openModal() {
  document.getElementById("logoutModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("logoutModal").classList.add("hidden");
}

function logout() {
  window.location.href = "logout.php";
}

const div = document.getElementById("section");
if (div !== null) {
  const p = document.createElement("p");
  p.className = "mt-4 text-sm text-gray-500 italic";
  p.innerHTML = `Développé avec ❤️ par un passionné de la gestion numérique. <br><br> 
              <i class="fab fa-facebook"></i> <strong>Basilio HERIMIHARISOA</strong>`;
  div.appendChild(p);
}
