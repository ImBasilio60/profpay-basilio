export default function create(message) {
  async function createNotification(message) {
    const data = {
      user_id: 3,
      message: message,
      type: "admin",
      is_read: false,
    };

    try {
      const response = await fetch(
        "http://localhost/profpay-basilio/api/notifications/create.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (result.error) {
        alert("Erreur : " + result.error);
        console.error("Erreur lors de l'ajout :", result.error);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  }
  createNotification(message);
}
