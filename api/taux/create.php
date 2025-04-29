<?php
include '../../db/config.php';
header('Content-Type: application/json');

// Récupérer les données JSON envoyées par la requête
$data = json_decode(file_get_contents("php://input"), true);

// Vérifier si le champ 'taux' est bien présent et valide
if (!isset($data['taux']) || empty(trim($data['taux']))) {
    echo json_encode(["error" => $data['taux']]);
    exit;  // Arrêter le script si la validation échoue
}

try {
    // Préparation de la requête SQL pour insérer le taux
    $stmt = $pdo->prepare("
        INSERT INTO tauxhoraires (TAUX) 
        VALUES (:taux)
    ");

    // Exécution de la requête avec la valeur du taux
    $stmt->execute([
        'taux' => trim($data['taux'])  // On enlève les espaces superflus
    ]);

    // Retourner un message de succès avec l'ID du dernier enregistrement inséré
    echo json_encode([
        'message' => 'Item ajouté avec succès',
        'id'      => $pdo->lastInsertId()
    ]);
} catch (PDOException $e) {
    // Gestion spécifique des erreurs PDO (problèmes de base de données)
    echo json_encode(["error" => "Erreur de base de données : " . $e->getMessage()]);
} catch (Exception $e) {
    // Gestion des autres types d'erreurs
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}
