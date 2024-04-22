<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Calendrier;

class CalendrierController extends Controller
{
    public function index()
    {
        $events = Calendrier::all();
        return response()->json($events);
    }

    public function create()
    {
        // return view('calendrier.create');
        $request->validate([
            'title' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'description' => 'nullable|string',
            'location' => 'nullable|string',
            'participants' => 'nullable|string',
        ]);
        return response()->json($event, 200);
    }

    public function store(Request $request)
{
    // Validez les données de la requête si nécessaire
    $request->validate([
        'title' => 'required|string',
        'start_date' => 'required|date',
        'end_date' => 'required|date|after:start_date',
        'description' => 'nullable|string',
        'location' => 'nullable|string',
        'participants' => 'nullable|string',
    ]);

    try {
    // Créez un nouvel événement avec les données de la requête
    $event = Calendrier::create([
        'title' => $request->title,
        'start_date' => $request->start_date,
        'end_date' => $request->end_date,
        'description' => $request->description,
        'location' => $request->location,
        'participants' => $request->participants,
    ]);

    // Retournez la réponse JSON avec l'événement créé
    return response()->json($event, 201);
} catch (\Exception $e) {
    // Retourner une réponse JSON avec erreur
    return response()->json(['message' => 'Une erreur est survenue lors de l\'ajout du evenement', 'error' => $e->getMessage()], 500);
}
}


    public function show($id)
    {
        $event = Calendrier::findOrFail($id);
        return response()->json($event);
    }

    public function edit($id)
    {
        // $event = Calendrier::findOrFail($id);
        // return view('calendrier.edit', compact('event'));
        try {
            // Récupérer le CV à éditer
            $event = Calendrier::findOrFail($id);
    
            // Retourner une réponse JSON avec succès
            return response()->json(['evenement' => $event], 200);
        } catch (\Exception $e) {
            // Retourner une réponse JSON avec erreur
            return response()->json(['message' => 'Le evenement n\'a pas pu être trouvé', 'error' => $e->getMessage()], 404);
        }
    }

    //c'est bon pour update dans postmane
    public function update(Request $request, $id)
{
    // Validez les données de la requête si nécessaire
    $request->validate([
        'title' => 'required|string',
        'start_date' => 'required|date',
        'end_date' => 'required|date|after:start_date',
        'description' => 'nullable|string',
        'location' => 'nullable|string',
        'participants' => 'nullable|string',
    ]);

    try {
    // Trouvez l'événement à mettre à jour
    $event = Calendrier::findOrFail($id);

    // Mettre à jour le CV avec les données validées
    $event->update($request->all());

    // Retournez la réponse JSON avec l'événement mis à jour
    return response()->json($event);
} catch (\Exception $e) {
    // Retourner une réponse JSON avec erreur
    return response()->json(['message' => 'Une erreur est survenue lors de la mise à jour du evenement', 'error' => $e->getMessage()], 500);
}
}


public function destroy($id)
{
    try{
    // Trouvez l'événement à supprimer
    $event = Calendrier::findOrFail($id);

    // Supprimez l'événement de la base de données
    $event->delete();

    // Retournez une réponse vide avec le code de statut 204 pour indiquer que la suppression a réussi
    return response()->json(null, 204);
} catch (\Exception $e) {
    // Retourner une réponse JSON avec erreur
    return response()->json(['message' => 'Une erreur est survenue lors de la suppression du d évenement', 'error' => $e->getMessage()], 500);
}
}

}

