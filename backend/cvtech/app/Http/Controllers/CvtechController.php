<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cvtech;
use Illuminate\Support\Facades\Validator;

class CvtechController extends Controller
{
    /**
     * Affiche la liste de tous les CV.
     */
    public function edit($id)
{
    try {
        // Récupérer le CV à éditer
        $cvtech = Cvtech::findOrFail($id);

        // Retourner une réponse JSON avec succès
        return response()->json(['cv' => $cvtech], 200);
    } catch (\Exception $e) {
        // Retourner une réponse JSON avec erreur
        return response()->json(['message' => 'Le CV n\'a pas pu être trouvé', 'error' => $e->getMessage()], 404);
    }
}

public function update(Request $request, $id)
{
    // Validation des données soumises par le formulaire
    $request->validate([
        'nom' => 'required|string|max:255',
        'prenom' => 'required|string|max:255',
        'emails' => 'nullable|string|unique:cvtech',
        'role' => 'required|string|in:Recruteur,Candidat,Responsable RH,Admin,Utilisateur,Manager',
        // 'experiences' => 'nullable|string',
        // 'education' => 'nullable|string',
    ]);

    try {
        // Récupérer le CV à mettre à jour
        $cv = Cvtech::findOrFail($id);

        // Mettre à jour le CV avec les données validées
        $cv->update($request->all());

        // Retourner une réponse JSON avec succès
        return response()->json(['message' => 'CV mis à jour avec succès', 'cv' => $cv], 200);
    } catch (\Exception $e) {
        // Retourner une réponse JSON avec erreur
        return response()->json(['message' => 'Une erreur est survenue lors de la mise à jour du CV', 'error' => $e->getMessage()], 500);
    }
}



public function destroy($id)
{
    try {
        // Récupérer le CV à supprimer
        $cvtech = Cvtech::findOrFail($id);

        // Supprimer le CV de la base de données
        $cvtech->delete();

        // Retourner une réponse JSON avec succès
        return response()->json(['message' => 'CV supprimé avec succès'], 200);
    } catch (\Exception $e) {
        // Retourner une réponse JSON avec erreur
        return response()->json(['message' => 'Une erreur est survenue lors de la suppression du CV', 'error' => $e->getMessage()], 500);
    }
}

public function store(Request $request)
{
    // Validation des données soumises par le formulaire
    $request->validate([
        'nom' => 'required|string|max:255',
        'prenom' => 'required|string|max:255',
        'emails' => 'nullable|string|unique:cvtech',
        'role' => 'required|string|in:Recruteur,Candidat,Responsable RH,Admin,Utilisateur,Manager',
        // 'experiences' => 'nullable|string',
        // 'education' => 'nullable|string',
    ]);

    try {
        // Création d'un nouveau CV avec les données validées
        $cv = Cvtech::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'emails' => $request->emails,
            'role' => $request->role,
            // 'experiences' => $request->experiences,
            // 'education' => $request->education,
        ]);

        // Retourner une réponse JSON avec succès
        return response()->json(['message' => 'CV ajouté avec succès', 'cv' => $cv], 201);
    } catch (\Exception $e) {
        // Retourner une réponse JSON avec erreur
        return response()->json(['message' => 'Une erreur est survenue lors de l\'ajout du CV', 'error' => $e->getMessage()], 500);
    }
}

public function getIds()
{
    try {
        // Récupérer tous les IDs des CVs
        $cvIds = Cvtech::pluck('id')->toArray();

        // Retourner une réponse JSON avec les IDs des CVs
        return response()->json($cvIds, 200);
    } catch (\Exception $e) {
        // Retourner une réponse JSON avec erreur
        return response()->json(['message' => 'Une erreur est survenue lors de la récupération des IDs des CVs', 'error' => $e->getMessage()], 500);
    }
}


}