<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Calendrier;

class CalendrierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Calendrier::create([
            'title' => 'Réunion hebdomadaire',
            'start_date' => now(),
            'end_date' => now()->addHours(1),
            'description' => 'Réunion hebdomadaire pour discuter des progrès du projet.',
            'location' => 'Salle de conférence A',
            'participants' => 'John Doe, Jane Smith',
        ]);
    }
}
