    <div
      id="notifOverlay"
      class="fixed inset-0 bg-transparent backdrop-blur-xs hidden z-40"
    ></div>
<!-- Sidebar notifications au-dessus de l'overlay -->
    <div
      id="notifSidebar"
      class="fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform translate-x-full transition-transform duration-300 z-50 flex flex-col"
    >

      <div class="flex items-center justify-between px-6 py-4 border-b">
        <h2 class="text-lg font-semibold text-gray-800">Notifications</h2>
        <button
          id="closeNotif"
          class="text-gray-500 hover:text-gray-800 text-xl cursor-pointer"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scroll" id="notifications-list">
        <!-- <div class="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-md">
          <p class="text-sm text-gray-700">
            <strong>Jean Dupont</strong> a reçu sa paie pour le mois de Mars.
          </p>
          <span class="text-xs text-gray-400">Il y a 2 minutes</span>
        </div>
        <div
          class="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50 rounded-md"
        >
          <p class="text-sm text-gray-700">
            Une mise à jour du système est prévue le <strong>15 avril</strong>.
          </p>
          <span class="text-xs text-gray-400">Il y a 1 heure</span>
        </div>
        <div class="border-l-4 border-red-500 pl-4 py-2 bg-red-50 rounded-md">
          <p class="text-sm text-gray-700">
            Paiement en attente pour <strong>Marie Curie</strong>.
          </p>
          <span class="text-xs text-gray-400">Hier</span>
        </div> -->
        <!-- Tu peux en ajouter autant que tu veux -->
      </div>
    </div>

    <script>
      const cloche = document.getElementById("cloche");
      const notifSidebar = document.getElementById("notifSidebar");
      const notifOverlay = document.getElementById("notifOverlay");
      const closeNotif = document.getElementById("closeNotif");

      cloche.addEventListener("click", () => {
        notifSidebar.classList.remove("translate-x-full");
        notifOverlay.classList.remove("hidden");
      });

      notifOverlay.addEventListener("click", () => {
        notifSidebar.classList.add("translate-x-full");
        notifOverlay.classList.add("hidden");
      });

      closeNotif.addEventListener("click", () => {
        notifSidebar.classList.add("translate-x-full");
        notifOverlay.classList.add("hidden");
      });
    </script>