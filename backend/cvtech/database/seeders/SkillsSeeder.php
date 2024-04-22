<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Skills;

class SkillsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // for ($i = 1; $i <= 99; $i++) {
        //     Skills::create([
        //         'nom' => 'Skills ' . $i,
        //     ]);
        // }
        for ($i = 1; $i <= 99; $i++) {
            $nom = 'Skills ' . $i;
            $existingSkill = Skills::where('nom', $nom)->exists();
            if (!$existingSkill) {
                Skills::create([
                    'nom' => $nom,
                ]);
            }
        }
    }
}
