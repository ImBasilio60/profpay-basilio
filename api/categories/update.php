<?php
// api/update.php
include '../../db/config.php';
header('Content-Type: application/json');

// Récupérer les données JSON envoyées
$data = json_decode(file_get_contents("php://input"), true);

// Vérifier que l'ID_C est présent (clé primaire nécessaire pour faire une mise à jour)
if (!isset($data['ID_C']) || empty($data['ID_C'])) {
    echo json_encode(["error" => "L'identifiant ID_C est requis"]);
    exit;
}

// Récupérer les champs à mettre à jour
$id_c = intval($data['ID_C']);
$code_c = isset($data['CODE_C']) ? trim($data['CODE_C']) : null;
$categorie = isset($data['CATEGORIE']) ? trim($data['CATEGORIE']) : null;
$diplome = isset($data['DIPLOME']) ? trim($data['DIPLOME']) : null;

try {
    $stmt = $pdo->prepare("UPDATE categories 
                           SET 
                               CATEGORIE = :categorie, 
                               DIPLOME = :diplome 
                           WHERE ID_C = :id_c");
    $stmt->execute([
        'categorie' => $categorie,
        'diplome'   => $diplome,
        'id_c'      => $id_c
    ]);

    echo json_encode(['message' => 'Catégorie mise à jour avec succès']);
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}
?>
