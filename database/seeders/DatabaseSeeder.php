<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'John Sterling Vance',
            'email' => 'client@corporate.com',
            'password' => bcrypt('password'),
        ]);

        $admin = User::factory()->create([
            'name' => 'Jabari Mtoro',
            'email' => 'admin@blueprintlegal.co.tz',
            'password' => bcrypt('password'),
            'is_admin' => true,
        ]);

        // Mock Consultation 1: Confirmed future consultation
        \App\Models\Consultation::create([
            'user_id' => $user->id,
            'name' => 'John Sterling Vance',
            'email' => 'client@corporate.com',
            'phone' => '+1 (212) 555-1234',
            'practice_area' => 'Corporate Mergers',
            'message' => 'Seeking comprehensive legal structuring for our Series A funding round and subsequent patent filings valuation.',
            'scheduled_at' => now()->addDays(5)->setHour(14)->setMinute(0),
            'status' => 'confirmed',
            'notes' => 'Assigned to Victoria Vance, Esq. Secured Zoom briefing room. Client has submitted prior financial models. Videoconference credentials shared.',
        ]);

        // Mock Consultation 2: Pending tomorrow consultation
        \App\Models\Consultation::create([
            'user_id' => $user->id,
            'name' => 'John Sterling Vance',
            'email' => 'client@corporate.com',
            'phone' => '+1 (212) 555-1234',
            'practice_area' => 'Trial & Litigations',
            'message' => 'Evaluating defense strategy regarding patent infringement filings from competitive venture.',
            'scheduled_at' => now()->addDays(1)->setHour(10)->setMinute(30),
            'status' => 'pending',
            'notes' => null,
        ]);

        // Mock Consultation 3: Completed past consultation
        \App\Models\Consultation::create([
            'user_id' => $user->id,
            'name' => 'John Sterling Vance',
            'email' => 'client@corporate.com',
            'phone' => '+1 (212) 555-1234',
            'practice_area' => 'Intellectual Property',
            'message' => 'Filing initial provisional patents and intellectual property audits for software codebase.',
            'scheduled_at' => now()->subDays(15)->setHour(11)->setMinute(0),
            'status' => 'completed',
            'notes' => 'Consultation completed successfully. Dr. Aris Thorne finalized IP auditing framework. provisional filings submitted to USPTO. Case file closed.',
        ]);
    }
}
