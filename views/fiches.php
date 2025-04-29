<?php 
  include "../model/session.php";
?>
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fiche</title>
    <link rel="stylesheet" href="../public/styles/output.css">
    <link rel="stylesheet" href="../public/css/all.min.css">
    <link rel="stylesheet" href="../public/styles/sideBar.css">

    <style>
      .none {
        display: none;
      }
      #payrollForm {
        max-width: 100%; /* Assure-toi que la largeur est à 100% du conteneur parent */
        overflow: hidden; /* Empêche l'apparition de la barre de défilement */
      }
      .form-row {
        display: flex;
        justify-content: space-between;
        gap: 1.5rem;
      }
      .form-row div {
        width: 100%;
      }
      .form-row .form-input {
        width: 100%;
      }
      input:focus {
        outline: none;
      }
      .card {
        background-color: #ffffff;
        border-radius: 10px;
        /* box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1); */
      }
      .card-header {
        background-color: #f4f4f4;
        padding: 10px 15px;
        border-radius: 10px 10px 0 0;
        font-size: 1.1rem;
        font-weight: bold;
      }
      .card-body {
        padding: 20px;
      }
      .btn-primary {
        background-color: #4f46e5;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      .btn-primary:hover {
        background-color: #4338ca;
      }

      .hidden {
        display: none;
      }
      .tab-active {
        border-bottom: 2px solid #3b82f6;
        color: #3b82f6;
      }
      .form-input {
        padding: 8px 12px;
        font-size: 0.875rem;
        height: 36px;
      }
      .prof-list-item {
        padding: 8px 12px;
        font-size: 0.875rem;
      }
      .prof-list {
        max-height: 200px;
        overflow-y: auto;
      }
      .prof-list button {
        font-size: 0.875rem;
        padding: 6px 10px;
      }
      button[type="button"] {
        background-color: #6366f1;
        color: white;
        padding: 6px 12px;
        font-size: 0.75rem;
        border-radius: 4px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.3s ease;
        height: 32px;
      }
      button[type="button"]:hover {
        background-color: #4f46e5;
      }
      /* Pagination */
      .pagination {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
      .pagination .active {
        padding: 6px 12px;
        background-color: #6366f1;
        color: white;
        border-radius: 4px;
        cursor: pointer;
      }
      .pagination button:hover {
        color: white;
        background-color: #4f46e5;
      }
      .max-h-97 {
        max-height: 25rem; /* Equivalent à 400px */
      }
    .form-input {
        padding: 4px 8px;      /* Réduit le padding vertical et horizontal */
        font-size: 0.6rem;    /* Réduit la taille du texte */
        height: 32px;          /* Force une hauteur plus petite */
    }
    th, .small-txt {
        font-size:0.65rem;
    }
    td {
        font-size: 0.6rem;  
    }

    </style>
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
                <li class="menu-item mb-2 p-3 mx-auto rounded-lg flex items-center justify-center transition-all duration-200 active">
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
        class="flex-1 p-8 pb-0 ml-16 transition-all duration-300 rounded-l-2xl overflow-auto"
        id="mainContent"
      >
        <div id="notification" class="flex justify-between items-center mb-4">
          <div class="flex items-center gap-6">
            <button
              id="toggleSidebar"
              class="text-gray-800 text-2xl focus:outline-none ml-4"
            >
              <i class="fas fa-bars"></i>
            </button>
            <h2 class="text-2xl font-bold">Suivi des paies</h2>
          </div>

          <div class="flex items-center space-x-4">
            
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
        <div class="w-full max-w-6xl mx-auto">
          <div class="card">
            <div class="card-body">
              <ul class="flex border-b border-gray-200 mb-6 text-sm">
                <li class="mr-2">
                  <button
                    class="tab-link px-4 py-2 border-b-2 border-gray-200 border-indigo-500 text-indigo-500"
                    onclick="openTab(event, 'home')"
                  >
                    Fiche
                  </button>
                </li>
                <li class="mr-2">
                  <button
                    class="tab-link px-4 py-2"
                    onclick="openTab(event, 'profile')"
                  >
                    Liste
                  </button>
                </li>
              </ul>
              <div id="home" class="tab-content">
                <div class="flex space-x-6">
                  <!-- Payroll Form -->
                  <form
                    id="payrollForm"
                    class="bg-white p-6 pt-2 pb-0 rounded-lg shadow-md w-full flex flex-col"
                  >
                    <div>
                      <h2 class="text-xl font-semibold mb-4 text-gray-800">
                        Fiche de Paie
                      </h2>

                      <div class="form-row">
                        <div>
                          <input
                            type="number"
                            id="matricule"
                            class="form-input w-full px-2 py-1 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            placeholder="Matricule"
                            required
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            class="form-input w-full px-2 py-1 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            placeholder="Catégorie"
                            id="categorie"
                            readonly
                            required
                          />
                        </div>
                      </div>

                      <div class="form-row">
                        <div>
                          <input
                            type="text"
                            id="nom"
                            class="form-input w-full px-2 py-1 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            placeholder="Nom"
                            readonly
                            required
                          />
                        </div>
                        
                      </div>
                        <div class="form-row">
                        <div>
                          <input
                            type="text"
                            id="prenom"
                            class="form-input w-full px-2 py-1 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            placeholder="Prenom"
                            readonly
                            required
                          />
                        </div>
                        </div>

                      <div class="form-row">
                        <div>
                          <input
                            type="number"
                            id="heures-suppl"
                            class="form-input w-full px-2 py-1 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            placeholder="Heures Supplémentaires (h)"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            id="salaire-base"
                            class="form-input w-full px-2 py-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            placeholder="Salaire de Base (€)"
                            readonly
                            required
                          />
                        </div>
                      </div>
                      <div class="btn-container">
                        <button
                          type="button"
                          class="bg-blue-600 hover:bg-blue-700 transition duration-200 text-white px-6 py-3 rounded-lg mt-1 mb-4 w-64"
                          id="add-btn-fiche"
                        >
                          Générer
                        </button>
                      </div>
                    </div>
                    <div class="flex justify-center items-center none">
                      <img src="../public/img/check.gif">
                    </div>
                  </form>

                  <!-- Professors List -->
                  <div class="bg-white p-6 pt-2 rounded-lg shadow-md w-1/2 flex flex-col">
                    <h2 class="text-xl font-semibold mb-4 text-gray-800">
                      Professeurs à Payer
                    </h2>
                    <ul id="prof-list" class="space-y-2 pr-2">
                      
                    </ul>
                  </div>
                </div>
              </div>

              <div id="profile" class="hidden tab-content w-full h-1/2">
                <div class="bg-white p-6 pt-2 pb-3 rounded-lg shadow-md w-full">
                  <h3 class="text-xl font-semibold mb-4 text-gray-800">
                    Professeurs Payés
                  </h3>
                  <div class="flex gap-4 mb-">
                    <input
                      type="text"
                      placeholder="Rechercher un professeur..."
                      class="form-input w-64 p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      id="search-prof"
                    />
                  </div>
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
                        <th class="px-4 py-2 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="table-fiche">
                      
                      <!-- Ajoutez d'autres lignes ici -->
                    </tbody>
                  </table>

                  <!-- Pagination -->
                  <div class="flex justify-end mt-4">
                    <nav class="flex space-x-2 pagination small-txt pagination-fiche">
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <?php include "notification.php" ?>
        <?php include "popUp.php" ?>
      </main>
    </div>
    <script src="../public/modules/jspdf/jspdf.umd.min.js"></script>
<script src="../public/modules/jspdf/jspdf.plugin.autotable.min.js"></script>

    <script src="../public/modules/sidebar.js"></script>
    <script src="../public/modules/fiches/navTabs.js"></script>
    <script type="module" src="../public/modules/crudFiche.js"></script>
  </body>
</html>
