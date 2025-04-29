<?php 
  include "../model/session.php";
?>
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Statistiques</title>
    
    <link rel="stylesheet" href="../public/styles/output.css">
    <link rel="stylesheet" href="../public/css/all.min.css">
    <link rel="stylesheet" href="../public/styles/sideBar.css">

  </head>
  <style>
    .none {
        display: none;
      }
  </style>
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
              <li class="menu-item mb-2 p-3 mx-auto rounded-lg flex items-center justify-center transition-all duration-200 active">
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
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center gap-6">
            <button
              id="toggleSidebar"
              class="text-gray-800 text-2xl focus:outline-none ml-4"
            >
              <i class="fas fa-bars"></i>
            </button>
            <h2 class="text-2xl font-bold">Statistiques des Salaires</h2>
          </div>

          <div class="flex items-center space-x-4">
            <div class="relative w-64">
              <input
                type="text"
                class="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Search..."
              />
              <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>

            <div class="relative">
              <i
                class="fas fa-bell text-gray-600 text-xl cursor-pointer" id="cloche"
              ></i>
              <span
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full none" id="notification-nombre"
              >
              </span>
            </div>

            <div class=" w-10 h-10 flex items-center justify-center rounded-full  bg-gray-200">

              <i class="fas fa-user text-gray-600 text-2xl   cursor-pointer"></i>
            </div>
            
          </div>
        </div>
        <div class="grid grid-cols-4 gap-6">
          <div
            class="bg-white p-4 shadow rounded-lg relative border-l-4 border-blue-500"
          >
            <i
              class="fas fa-users text-blue-500 absolute top-4 right-4 text-2xl"
            ></i>

            <p class="text-gray-600 text-sm">
              Nombre <span class="inline lg:hidden"><br /></span
              ><span class="block lg:inline">de Professeurs</span>
            </p>
            <h2 class="text-xl font-bold" id="professeur-nombre"></h2>
          </div>
          <div
            class="bg-white p-4 shadow rounded-lg relative border-l-4 border-yellow-500"
          >
            <i
              class="fas fa-chart-line text-yellow-500 absolute top-4 right-4 text-2xl"
            ></i>
            <p class="text-gray-600 text-sm">
              Salaire <span class="inline lg:hidden"><br /></span
              ><span class="block lg:inline">Moyen</span>
            </p>

            <h2 class="text-xl font-bold">Ar <span id="moyenne-salaire"></span></h2>
          </div>
          <div
            class="bg-white p-4 shadow rounded-lg relative border-l-4 border-purple-500"
          >
            <i
              class="fas fa-file-invoice text-purple-500 absolute top-4 right-4 text-2xl"
            ></i>
            <p class="text-gray-600 text-sm">
              Paiements <span class="inline lg:hidden"><br /></span
              ><span class="block lg:inline">en Attente</span>
            </p>

            <h2 class="text-xl font-bold" id="attente-nombre"></h2>
          </div>
          <div
            class="bg-white p-4 shadow rounded-lg relative border-l-4 border-green-500"
          >
            <i
              class="fas fa-dollar-sign text-green-500 absolute top-4 right-4 text-2xl"
            ></i>
            <p class="text-gray-600 text-sm">
              Total <span class="inline lg:hidden"><br /></span
              ><span class="block lg:inline">des Salaires</span>
            </p>
            <h2 class="text-xl font-bold">Ar <span id="total-salaire"></span></h2>
          </div>
        </div>
        <div class="mt-6 grid grid-cols-3 gap-6">
          <div class="col-span-2 bg-white p-4 shadow rounded-lg h-full">
            <h3 class="text-lg font-semibold mb-4">Évolution des Salaires</h3>
            <canvas id="barChart"></canvas>
          </div>
          <div class="flex flex-col h-full">
            <div class="bg-white p-4 shadow rounded-lg flex-1">
              <h3 class="text-lg font-semibold mb-4">
                Répartition des Paiements
              </h3>
              <canvas id="doughnutChart"></canvas>
            </div>
          </div>
        </div>
        <div class="mt-6 bg-white p-6 shadow rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Historique des Paiements</h3>
          <table class="min-w-full table-auto bg-white shadow-xs text-sm">
            <thead class="bg-gray-100">
                <tr>
                  <th class="px-4 py-2 text-left font-medium">Factures</th>
                  <th class="px-4 py-2 text-left font-medium">Matricules</th>
                  <th class="px-4 py-2 text-left font-medium">Noms</th>
                  <th class="px-4 py-2 text-left font-medium">S. Base(Ar)</th>
                  <th class="px-4 py-2 text-left font-medium">Heure S.(h)</th>
                  <th class="px-4 py-2 text-left font-medium">Taux H.(Ar)</th>
                  <th class="px-4 py-2 text-left font-medium">Montants (Ar)</th>
                </tr>
            </thead>
            <tbody id="table-fiche"></tbody>
          </table>
        </div>
        <?php include "notification.php" ?>
        <?php include "popUp.php" ?>
      </main>
    </div>
  
    <script src="../public/modules/chart.js"></script>
    <script type="module" src="../public/modules/graphes.js"></script>
    <script src="../public/modules/sidebar.js"></script>
  </body>
</html>
