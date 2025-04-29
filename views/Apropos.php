<?php 
  include "../model/session.php";
?>
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Apropos</title>
    <link rel="stylesheet" href="../public/styles/output.css">
    <link rel="stylesheet" href="../public/css/all.min.css">
    <link rel="stylesheet" href="../public/styles/sideBar.css">
  </head>
  <body class="bg-gray-100 font-sans antialiased">
    <div class="flex h-screen overflow-hidden">
      <aside
        id="sidebar"
        class="w-16 bg-gray-900 text-white shadow-xl p-4 fixed h-full flex flex-col justify-between transition-all duration-300 rounded-r-2xl"
      >
        <div class="flex flex-col items-center w-full">
          <a
            href="statistiques.php"
            class="text-2xl font-bold mb-5 flex items-center text-cyan-400"
          >
            <span id="logoIcon">PP</span>
            <span id="logoText" class="hidden">ProfPAY</span>
          </a>
          
          <nav class="w-full">
            <ul class="w-full">
              <li class="menu-item mb-2 p-3 rounded-lg flex items-center justify-center transition-all duration-200">
                <a href="statistiques.php" class="flex items-center">
                    <i class="fas fa-chart-line text-lg w-6 text-center"></i>
                    <span class="ml-3 hidden text-sm">Statistiques</span>
                </a>
                </li>
                <li class="menu-item mb-2 p-3 rounded-lg flex items-center justify-center transition-all duration-200">
                <a href="fiches.php" class="flex items-center">
                    <i class="fas fa-file-signature text-lg w-6 text-center"></i>
                    <span class="ml-3 hidden text-sm">Suivi des paies</span>
                </a>
                </li>
                <li class="menu-item mb-2 p-3 rounded-lg flex items-center justify-center transition-all duration-200">
                <a href="professeurs.php" class="flex items-center">
                    <i class="fas fa-chalkboard-teacher text-lg w-6 text-center"></i>
                    <span class="ml-3 hidden text-sm">Professeurs infos</span>
                </a>
                </li>
                <li class="menu-item mb-2 p-3 rounded-lg flex items-center justify-center transition-all duration-200">
                <a href="categories.php" class="flex items-center">
                    <i class="fas fa-dollar-sign text-lg w-6 text-center"></i>
                    <span class="ml-3 hidden text-sm">Rémunérations</span>
                </a>
                </li>
                <li class="menu-item mb-2 p-3 rounded-lg flex items-center justify-center transition-all duration-200">
                <a href="parametres.php" class="flex items-center">
                    <i class="fas fa-gear text-lg w-6 text-center"></i>
                    <span class="ml-3 hidden text-sm">Paramètres</span>
                </a>
                </li>
                <li class="menu-item mb-2 p-3 mx-auto rounded-lg flex items-center justify-center transition-all duration-200 active">
                <a href="Apropos.php" class="flex items-center">
                    <i class="fas fa-info-circle text-lg w-6 text-center"></i>
                    <span class="ml-3 hidden text-sm">Apropos</span>
                </a>
                </li>
            </ul>
          </nav>
        </div>
        <div
          id="deconnexion"
          class="flex border-t border-gray-700 w-full items-center justify-center"
        >
          <a
            href="#"
            class="block p-3 text-red-400 pt-4 flex items-center justify-center hover:text-red-300 transition-all duration-200"
            onclick="openModal()"
          >
            <i class="fas fa-sign-out-alt text-lg w-6 text-center"></i>
            <span class="ml-3 hidden text-sm">Déconnexion</span>
          </a>
        </div>
      </aside>

      <main
        class="flex-1 p-8 ml-16 transition-all duration-300 rounded-l-2xl overflow-auto"
        id="mainContent"
      >
        <!-- Apropos Section -->
        <section id="section" class="bg-white p-6 rounded-2xl shadow-md mb-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            <i class="fas fa-info-circle"></i>
            À propos de ProfPAY
          </h2>
          <p class="text-gray-700 leading-relaxed">
            <strong>ProfPAY</strong> est une application conçue pour faciliter
            la gestion des salaires des professeurs au sein d’un établissement
            scolaire ou universitaire. Elle permet de gérer les fiches de paie,
            les informations des enseignants et bien plus encore.
          </p>
          <ul class="list-disc pl-6 mt-4 text-gray-700">
            <li>Création et gestion automatique des fiches de paie</li>
            <li>Suivi des paiements mensuels</li>
            <li>
              Base de données des professeurs avec leurs informations salariales
            </li>
            <li>Interface simple et intuitive avec tableau de bord</li>
            <li>Exportation et impression des fiches</li>
          </ul>
        </section>
      </main>
      <div id="logoutModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 hidden">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Confirmer la déconnexion</h2>
        <p class="text-gray-700 mb-6">Êtes-vous sûr de vouloir vous déconnecter ?</p>
        <div class="flex justify-between">
          <button onclick="closeModal()" class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">Annuler</button>
          <button onclick="logout()" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Déconnexion</button>
        </div>
      </div>
    </div>
    </div>
    <?php include "popUp.php" ?>
    <script src="../public/modules/sidebar.js"></script>
    <script src="../public/modules/waterMark.js"></script>
  </body>
</html>
