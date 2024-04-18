<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class CvtechAuthController extends Controller
{
    // Méthode pour gérer la connexion de l'utilisateur
    public function login(Request $request)
    {
        // Validation des données du formulaire
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Tentative de connexion de l'utilisateur
        if (Auth::attempt($request->only('email', 'password'))) {
            // Authentification réussie
            $user = Auth::user();
            $token = $user->createToken('Token Name')->plainTextToken;
            return response()->json(['token' => $token]);
        } else {
            // Authentification échouée
            throw ValidationException::withMessages([
                'email' => ['Les informations d\'identification fournies ne correspondent pas à nos enregistrements.'],
            ]);
        }
    }

    // Méthode pour déconnecter l'utilisateur
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Déconnexion réussie']);
    }
}
