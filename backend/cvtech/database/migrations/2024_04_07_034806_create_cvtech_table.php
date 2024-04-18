<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cvtech', function (Blueprint $table) {
            $table->id();
            $table->string('nom'); // Ajoutez une colonne pour stocker le nom du CV
            $table->string('prenom'); // Ajoutez une colonne pour stocker le prénom du CV
            $table->string('emails')->unique();
            $table->enum('role', ['Recruteur', 'Candidat', 'Responsable RH', 'Admin', 'Utilisateur', 'Manager'])->default('Candidat');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cvtech');
    }
};
