    <!-- Modale de confirmation -->
    <div id="logoutModal" class="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50 hidden">
      <div class="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 class="text-2xl font-semibold text-gray-900 mb-5">Confirmer la déconnexion</h2>
        <p class="text-gray-600 mb-6">Êtes-vous sûr de vouloir vous déconnecter ?</p>
        <div class="flex justify-end space-x-4">
          <button onclick="closeModal()" class="px-5 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none transition ease-in-out duration-150">Annuler</button>
          <button onclick="logout()" class="px-5 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none transition ease-in-out duration-150">Déconnexion</button>
        </div>
      </div>
    </div>