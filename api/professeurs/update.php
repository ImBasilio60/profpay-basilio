<?php
// api/update.php
include '../../db/config.php';
header('Content-Type: application/json');

// Récupérer les données envoyées en JSON
$data = json_decode(file_get_contents("php://input"), true);

// Vérifier si les données sont présentes et valides
if (empty($data['matricule']) || empty($data['nom']) || empty($data['prenom']) || empty($data['telephone']) || empty($data['email']) || empty($data['cin']) || empty($data['categorie']) || empty($data['id'])) {
    echo json_encode(["error" => "Tous les champs sont requis."]);
    exit();
}

try {
    // Préparer la requête SQL
    $stmt = $pdo->prepare("
        UPDATE professeurs 
        SET 
            MATRICULE = :matricule,
            NOM = :nom, 
            PRENOM = :prenom, 
            TEL = :tel, 
            EMAIL = :email, 
            CIN = :cin, 
            ID_C = :categorie 
        WHERE ID_P = :id
    ");

    // Exécuter la requête
    $stmt->execute([
        'matricule' => trim($data['matricule']),
        'nom'       => trim($data['nom']),
        'prenom'    => trim($data['prenom']),
        'tel'       => trim($data['telephone']),
        'email'     => trim($data['email']),
        'cin'       => trim($data['cin']),
        'categorie' => trim($data['categorie']),
        'id' => trim($data['id'])
    ]);

    // Vérifier si des lignes ont été affectées (mise à jour réussie)
    if ($stmt->rowCount() > 0) {
        echo json_encode(['message' => 'Item mis à jour avec succès']);
    } else {
        echo json_encode(['message' => 'Aucune modification effectuée (les données étaient déjà à jour)']);
    }
} catch (Exception $e) {
    // Gestion des erreurs
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}
?>
