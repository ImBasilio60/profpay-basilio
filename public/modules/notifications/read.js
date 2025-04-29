export default function readNotification() {
  let notifications = [];

  async function fetchItems() {
    try {
      const response = await fetch(
        "http://localhost/profpay-basilio/api/notifications/read.php"
      );
      notifications = await response.json();
      console.log(notifications);

      // Vérifie que la réponse est bien un tableau
      if (Array.isArray(notifications)) {
        displayAllItems(notifications);
      } else {
        console.error("La réponse de l'API n'est pas un tableau valide.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  }

  function displayAllItems(items) {
    const container = document.getElementById("notifications-list");
    if (!container) {
      console.error("Élément #notifications-list non trouvé dans le DOM.");
      return;
    }

    if (items.length === 0) {
      container.innerHTML = `<p class="text-sm text-gray-500">Aucune notification pour l’instant.</p>`;
      return;
    }

    container.innerHTML = items
      .map((item) => {
        const createdAt = new Date(item.created_at);
        const now = new Date();
        const diffMs = now - createdAt;
        const diffMins = diffMs / (1000 * 60);

        let color = "blue";
        if (diffMins >= 60 && diffMins < 1440) {
          color = "yellow";
        } else if (diffMins >= 1440) {
          color = "red";
        }
        if (Boolean(item.is_read)) {
          color = "gray";
        }
        return `
    <div class="relative flex items-start justify-between gap-2 border-l-4 border-${color}-500 px-4 py-3 bg-${color}-50 rounded-md mb-3 shadow-sm hover:shadow transition">
      <div>
        <p class="text-sm text-gray-800">
          <strong>${item.username ?? "Admin"} :</strong> ${item.message}
        </p>
        <span class="text-xs text-gray-400">${formatDate(
          item.created_at
        )}</span>
      </div>
      <button 
        class="text-red-500 hover:text-red-600 transition delete-notif" 
        data-id="${item.id}" 
        title="Supprimer"
      >
        <i class="fas fa-trash-alt text-lg"></i>
      </button>
    </div>
    `;
      })
      .join("");
  }

  // Formatage simple de la date (ex : "15 avril 2025 à 14:20")
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  fetchItems();
}
