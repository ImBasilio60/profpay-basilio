<?php
session_start();

// Empêcher le cache sur la page de connexion
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

if (isset($_SESSION['admin_id'])) {
    header("Location: views/statistiques.php"); 
    exit();
}

require 'model/db.php';

$error = false;

if (!empty($_POST['username']) && !empty($_POST['password'])) {
    $stmt = $pdo->prepare("SELECT * FROM admins WHERE username = ?");
    $stmt->execute([$_POST['username']]);
    $user = $stmt->fetch();

    if ($user && password_verify($_POST['password'], $user['password'])) {
        $_SESSION['admin_id'] = $user['id'];
        echo '<script>location.replace("views/statistiques.php");</script>';
        exit(); 
    } else {
        $error = true;
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Login - ProfPAY</title>
      <link rel="stylesheet" href="./public/styles/output.css">

</head>
<body class="bg-gray-900 flex items-center justify-center h-screen">
  <div class="bg-white p-8 rounded-xl shadow-lg w-96">
    <h2 class="text-2xl font-bold text-center text-cyan-500 mb-6">Connexion à ProfPAY</h2>
    
    <?php if ($error): ?>
      <p class="text-red-500 text-sm mb-4 text-center">Identifiants incorrects</p>
    <?php endif; ?>

    <form method="POST" id="monFormulaire">
      <input type="text" name="username" placeholder="Nom d'utilisateur"
             class="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500" required>

      <input type="password" name="password" placeholder="Mot de passe"
             class="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-cyan-500" required>

      <button type="submit" class="w-full bg-cyan-600 text-white p-3 rounded-lg hover:bg-cyan-700">
        Se connecter
      </button>
    </form>
  </div>
</body>
</html>
