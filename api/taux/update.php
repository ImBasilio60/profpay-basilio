<?php
include '../../db/config.php';
header('Content-Type: application/json');

// Récupérer les données JSON envoyées par la requête
$data = json_decode(file_get_contents("php://input"), true);

// Vérifier si les paramètres 'id' et 'taux' sont bien présents et valides
if (!isset($data['id']) || !isset($data['taux']) || empty(trim($data['taux']))) {
    echo json_encode(["error" => "L'ID et le taux sont requis et ne peuvent pas être vides."]);
    exit;  // Arrêter le script si la validation échoue
}

try {
    // Préparation de la requête SQL pour mettre à jour le taux
    $stmt = $pdo->prepare("
        UPDATE tauxhoraires 
        SET TAUX = :taux 
        WHERE ID_T = :id
    ");

    // Exécution de la requête avec les valeurs 'id' et 'taux'
    $stmt->execute([
        'taux' => trim($data['taux']),  // Enlever les espaces superflus
        'id'   => $data['id']           // L'ID de l'enregistrement à modifier
    ]);

    // Vérifier si l'ID a été trouvé et mis à jour
    if ($stmt->rowCount() > 0) {
        echo json_encode([
            'message' => 'Item mis à jour avec succès',
            'id'      => $data['id']
        ]);
    } else {
        // Si aucun enregistrement n'a été affecté, cela signifie que l'ID n'existait pas
        echo json_encode(["error" => "Aucun enregistrement trouvé pour cet ID"]);
    }

} catch (PDOException $e) {
    // Gestion spécifique des erreurs PDO (problèmes de base de données)
    echo json_encode(["error" => "Erreur de base de données : " . $e->getMessage()]);
} catch (Exception $e) {
    // Gestion des autres types d'erreurs
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}
