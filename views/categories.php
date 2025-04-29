<?php 
  include "../model/session.php";
?>
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rénumerations</title>
    <link rel="stylesheet" href="../public/styles/output.css">
    <link rel="stylesheet" href="../public/css/all.min.css">
    <link rel="stylesheet" href="../public/styles/sideBar.css">
    <style>
      .none {
        display: none;
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

      .hidden {
        display: none;
      }
      .tab-active {
        border-bottom: 2px solid #3b82f6;
        color: #3b82f6;
      }
      .form-input {
        padding: 4px 8px;      
        font-size: 0.6rem;    
        height: 32px;   
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
        background-color: #4338ca;
      }
      .cancel-btn {
        background-color: #4b5563 !important;
      }
      .cancel-btn:hover {
        background-color:rgb(61, 71, 85) !important;
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
                <li class="menu-item mb-2 p-3 mx-auto rounded-lg flex items-center justify-center transition-all duration-200 active">
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
            <h2 class="text-2xl font-bold">Rémunérations</h2>
          </div>

          <div class="flex items-center space-x-4">
            <div class="relative w-64 hidden">
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
        <div class="w-full max-w-6xl mx-auto">
          <div class="card">
            <div class="card-body">
              <ul class="flex border-b border-gray-200 mb-4 text-sm">
                <li class="mr-2">
                  <button
                    class="tab-link px-4 py-2 border-b-2 border-gray-200 border-indigo-500 text-indigo-500"
                    onclick="openTab(event, 'home')"
                  >
                    Salaire
                  </button>
                </li>
                <li class="mr-2">
                  <button
                    class="tab-link px-4 py-2"
                    onclick="openTab(event, 'profile')"
                  >
                    Catégorie
                  </button>
                </li>
                <li class="mr-2">
                  <button
                    class="tab-link px-4 py-2"
                    onclick="openTab(event, 'taux')"
                  >
                    Taux
                  </button>
                </li>
              </ul>
              <div id="home" class="tab-content">
                <div class="flex gap-6">
                  <!-- Formulaire -->
                  <div class="w-1/3 bg-white p-6 pt-2 pb-0 rounded-lg shadow-lg">
                    <h2 class="text-xl font-semibold mb-4 text-gray-800" id="salaire-title">
                      Définir Salaire de Base
                    </h2>

                    <form class="flex flex-col" id="form-salaire">
                     <div>
                        <input
                          type="number"
                          placeholder="Salaire de Base"
                          class="form-input w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                          id="inp-salaire"
                          required
                        />
                        <select
                          class="w-full p-2 small-txt h-8 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 "
                          id="salaire-filtre-categorie"
                        >
                          <option value="">Catégories</option>
                          
                        </select>
                        <div class="mb-5 mt-5 btn-container-1">
                          <button
                            type="button"
                            class="w-full flex items-center justify-center gap-2 p-3 mb-4 text-white font-medium rounded-lg shadow-md focus:outline-none h-9 transition duration-200 text-white bg-indigo-500"
                            id="addBtnSalaire" data-state="ajout"
                          >
                            <i class="fas fa-plus"></i>
                            Ajouter
                          </button>
                        </div>
                     </div>

                      <div class="flex justify-center items-center none">
                        <img src="../public/img/check.gif">
                      </div>
                    </form>
                  </div>

                  <!-- Tableau des salaires -->
                  <div class="w-2/3 bg-white p-6 pt-2 pb-4 rounded-lg shadow-lg">
                    <h2 class="text-xl font-semibold mb-4 text-gray-800" >
                      Liste des Salaires
                    </h2>
                    <!-- Tableau -->
                    <table class="min-w-full table-auto bg-white shadow-xs text-sm">
                      <thead class="bg-gray-100">
                        <tr>
                          <th class="px-4 py-2 text-left font-medium">Salaires</th>
                          <th class="px-4 py-2 text-left font-medium">Catégories</th>
                          <th class="px-4 py-2 text-left font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody id="salaire-table"></tbody>
                    </table>
                    <!-- Pagination -->
                   <div class="flex justify-end mt-4">
                    <nav class="flex space-x-2 pagination small-txt pagination-salaire"></nav>
                  </div>
                  </div>
                </div>
              </div>
              <div id="profile" class="tab-content hidden">
                <div class="flex gap-6">
                  <!-- Formulaire -->
                  <div class="w-1/3 bg-white p-6 pt-2 pb-0 rounded-lg shadow-lg">
                    <h2 class="text-xl font-semibold mb-4 text-gray-800" id="categorie-title">
                      Ajouter un Catégorie
                    </h2>
                    <form class="flex flex-col" id="formCategorie">
                      <div>
                        <input
                        type="number"
                        placeholder="Catégorie"
                        class="form-input w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        id="inp-categorie"
                        required
                        />
                        <select
                        class="p-2 small-txt h-8 w-full  border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        id="diplome-select"
                        >
                          <option value="">Diplomes</option>
                          <option value="CEPE">CEPE</option>
                          <option value="BEPC">BEPC</option>
                          <option value="BACC">BACC</option>
                          <option value="LICENCE">LICENCE</option>
                          <option value="MASTER">MASTER</option>
                        </select>
                        <div class="mt-5 mb-5 btn-container-2">
                          <button
                            type="button"
                            class="w-full flex items-center justify-center gap-2 p-3 mb-4 text-white font-medium rounded-lg shadow-md focus:outline-none h-9 transition duration-200 text-white bg-indigo-500"
                            id="addBtnCategorie" data-state="ajout"
                            >
                            <i class="fas fa-plus"></i>
                            Ajouter
                          </button>
                        </div>
                      </div>
                      <div class="flex justify-center items-center none">
                        <img src="../public/img/check.gif">
                      </div>
                    </form>
                  </div>

                  <!-- Tableau des CATEGORIES -->
                  <div class="w-2/3 bg-white p-6 pt-2 pb-4 rounded-lg shadow-lg">
                    <h2 class="text-xl font-semibold mb-4 text-gray-800">
                      Liste des Catégorie
                    </h2>
                   

                    <!-- Tableau -->
                   <table class="min-w-full table-auto bg-white shadow-xs text-sm">
                    <thead class="bg-gray-100">
                      <tr>
                        <th class="px-4 py-2 text-left font-medium">#Codes</th>
                        <th class="px-4 py-2 text-left font-medium">Catégories</th>
                        <th class="px-4 py-2 text-left font-medium">Diplômes</th>
                        <th class="px-4 py-2 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="categorie-table">
                      
                    </tbody>
                  </table>
                    <!-- Pagination -->
                   <div class="flex justify-end mt-4">
                    <nav class="flex space-x-2 pagination small-txt pagination-categorie">
                      
                    </nav>
                  </div>
                  </div>
                </div>
              </div>
              <div id="taux" class="tab-content hidden">
                <div class="flex gap-6">
                  <!-- Formulaire -->
                  <div class="w-1/3 bg-white p-6 pt-0 rounded-lg shadow-lg">
                    <h2 class="text-xl font-semibold mb-4 text-gray-800 action-text-taux">
                      Enregistrer un Taux
                    </h2>
                    <form class="flex flex-col" id="formTaux">
                      <div>
                          <input
                          type="number"
                          placeholder="Taux en Ariary"
                          class="form-input w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                          required
                          id="inp-taux"
                          />

                        <div class="mt-5 btn-container-3">
                          <!-- Bouton Ajouter -->
                          <button
                            type="button"
                            class="w-full flex items-center justify-center gap-2 p-3 mb-4 text-white font-medium rounded-lg shadow-md focus:outline-none h-9 transition duration-200 bg-indigo-500"
                            data-state="ajout"
                            id="addBtnTaux"
                          >
                            <i class="fas fa-plus"></i>
                            Ajouter
                          </button>
                        </div>

                      </div>
                      <div class="flex justify-center items-center none">
                        <img src="../public/img/check.gif">
                      </div>
                      
                    </form>
                  </div>

                  <!-- Tableau des TAUX -->
                  <div class="w-2/3 bg-white p-6 pt-0 rounded-lg shadow-lg">
                    <h2 class="text-xl font-semibold mb-4 text-gray-800">
                      Liste des Taux
                    </h2>

                    <!-- Tableau -->
                    <table class="min-w-full table-auto bg-white shadow-xs text-sm">
                      <thead class="bg-gray-100">
                        <tr>
                          <th class="px-4 py-2 text-left font-medium">#ID</th>
                          <th class="px-4 py-2 text-left font-medium">Taux (Ar)</th>
                          <th class="px-4 py-2 text-left font-medium">Dates</th>
                          <th class="px-4 py-2 text-left font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody id="taux-table">
                        
                      </tbody>
                    </table>
                    <!-- Pagination -->
                    <div class="flex justify-end mt-4">
                    <nav class="flex space-x-2 pagination small-txt pagination-taux">
                      
                    </nav>
                  </div>
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
    <script src="../public/modules/sidebar.js"></script>
    <script src="../public/modules/categories/navTabs.js"></script>
    <script type="module" src="../public/modules/crudTaux.js"></script>
    <script type="module" src="../public/modules/crudCategorie.js"></script>
    <script type="module" src="../public/modules/crudSalaire.js"></script>
  </body>
</html>
