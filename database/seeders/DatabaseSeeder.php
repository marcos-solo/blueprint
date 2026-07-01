<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::updateOrCreate(
            ['email' => 'client@corporate.com'],
            [
                'name' => 'John Sterling Vance',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
            ]
        );

        User::updateOrCreate(
            ['email' => 'admin@blueprintlegal.co.tz'],
            [
                'name' => 'Jabari Mtoro',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        $this->call(SuperAdminSeeder::class);

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

        // Seed Mock Blogs
        \App\Models\Blog::updateOrCreate(
            ['slug' => 'structuring-business-entities-in-east-africa'],
            [
                'title' => 'Structuring Business Entities in East Africa',
                'content' => "Entering the East African market requires a clear understanding of regional corporate governance and structuring. In Tanzania, companies can register as a local entity or a branch of a foreign company.\n\nWhen deciding on structuring, business owners should analyze capital requirements, tax implications, and ownership restrictions. For instance, certain sectors like mining, telecommunications, and shipping have local participation guidelines that require Tanzanian citizens to hold a minimum percentage of shares.\n\nKey considerations:\n1. Choice of Entity: LLC vs. Foreign Branch.\n2. Local Shareholding requirements.\n3. Tax incentives under the Tanzania Investment Centre (TIC).\n\nConsulting early with legal advisors ensures your venture is established on a compliant, scalable foundation.",
                'image_url' => 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop',
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Mock YT link
            ]
        );

        \App\Models\Blog::updateOrCreate(
            ['slug' => 'intellectual-property-compliance-guidelines'],
            [
                'title' => 'Intellectual Property Compliance Guidelines',
                'content' => "Protecting your software code, trademarks, and brand identity is critical in today's digital economy. This guide outlines standard compliance checks and auditing procedures for IP portfolios.\n\nStart by identifying core intellectual property assets including patents, copyrightable material, trade secrets, and registered trademarks. It is essential to have robust employee and contractor agreement clauses that explicitly assign IP rights to the company, preventing ownership disputes down the road.\n\nAdditionally, conducting regular clearance searches before launching new products protects you from inadvertent infringement claims.\n\nSummary Checklist:\n- Review employment agreements for IP assignment.\n- Register trade name and trademark symbols early.\n- Conduct patent searches during product R&D.\n- Document trade secrets and control internal access.",
                'image_url' => 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800&auto=format&fit=crop',
                'video_url' => null,
            ]
        );

        $this->call(PageContentSeeder::class);
    }
}
