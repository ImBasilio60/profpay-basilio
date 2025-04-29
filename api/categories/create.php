<?php
// api/create.php
include '../../db/config.php';
header('Content-Type: application/json');

// Récupérer les données JSON
$data = json_decode(file_get_contents("php://input"), true);

// Vérifier que CODE_C est présent (car il est NOT NULL et UNIQUE)
if (!isset($data['CODE_C']) || empty(trim($data['CODE_C']))) {
    echo json_encode(["error" => "Le champ CODE_C est requis"]);
    exit;
}

// Préparer les données (en enlevant les espaces inutiles)
$code_c = trim($data['CODE_C']);
$categorie = isset($data['CATEGORIE']) ? trim($data['CATEGORIE']) : null;
$diplome = isset($data['DIPLOME']) ? trim($data['DIPLOME']) : null;

try {
    $stmt = $pdo->prepare("INSERT INTO categories (CODE_C, CATEGORIE, DIPLOME) VALUES (:code_c, :categorie, :diplome)");
    $stmt->execute([
        'code_c'    => $code_c,
        'categorie' => $categorie,
        'diplome'   => $diplome
    ]);

    echo json_encode([
        'message' => 'Catégorie ajoutée avec succès',
        'id' => $pdo->lastInsertId()
    ]);
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}
?>
