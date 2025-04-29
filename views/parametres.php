<?php 
  include "../model/session.php";
?>
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Paramètre</title>
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
                <li class="menu-item mb-2 p-3 mx-auto rounded-lg flex items-center justify-center transition-all duration-200 active">
                <a href="parametres.php" class="flex items-center">
                    <i class="fas fa-gear text-lg w-6 text-center"></i>
                    <span class="ml-3 hidden text-sm">Paramètres</span>
                </a>
                </li>
                <li class="menu-item mb-2 p-3 rounded-lg flex items-center justify-center transition-all duration-200">
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
        <!-- Paramètres Section -->
        <div
          id="parametres"
          class="bg-white p-8 rounded-lg shadow-lg flex items-center justify-center h-full"
        >
          <div class="text-center">
            <div class="flex items-center justify-center space-x-3 mb-4">
              <i class="fas fa-gear text-gray-600 text-9xl fa-spin"></i>

              <h1 class="text-3xl font-semibold">Paramètres</h1>
            </div>
            <div class="text-gray-500">
              <p>La section des paramètres est en cours de construction.</p>
            </div>
          </div>
        </div>
        <?php include "notification.php" ?>
        <?php include "popUp.php" ?>
      </main>
    </div>

<script src="../public/modules/sidebar.js"></script>
  </body>
</html>
