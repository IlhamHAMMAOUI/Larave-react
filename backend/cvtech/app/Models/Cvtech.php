<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cvtech extends Model
{
    use HasFactory;

    // Spécification le nom de la table associée au modèle si elle diffère du nom par défaut
    protected $table = 'cvtech';

    // Spécification les colonnes qui sont autorisées à être affectées en masse
    protected $fillable = ['nom', 'prenom', 'emails', 'role', 'email', 'password'];

    protected $hidden = ['password']; // Pour masquer le mot de passe lorsqu'il est récupéré

    // Spécification les colonnes à exclure des affectations en masse
    protected $guarded = ['id'];

}
