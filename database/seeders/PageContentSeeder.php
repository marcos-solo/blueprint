<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PageContent;

class PageContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contents = [
            // Home / Welcome Page
            [
                'page' => 'home',
                'section' => 'hero',
                'key' => 'subtitle',
                'value' => 'Bespoke Counsel',
                'type' => 'text',
                'label' => 'Hero Subtitle',
            ],
            [
                'page' => 'home',
                'section' => 'hero',
                'key' => 'title',
                'value' => 'Blueprint Legal',
                'type' => 'text',
                'label' => 'Hero Title',
            ],
            [
                'page' => 'home',
                'section' => 'hero',
                'key' => 'description',
                'value' => 'Commercially minded legal counsel for company founders, investors and brand owners in Tanzania.',
                'type' => 'textarea',
                'label' => 'Hero Description',
            ],
            [
                'page' => 'home',
                'section' => 'hero',
                'key' => 'cta_primary',
                'value' => 'Book a Consultation',
                'type' => 'text',
                'label' => 'Hero Primary CTA Button',
            ],
            [
                'page' => 'home',
                'section' => 'hero',
                'key' => 'cta_secondary',
                'value' => 'Explore Expertise',
                'type' => 'text',
                'label' => 'Hero Secondary CTA Button',
            ],
            [
                'page' => 'home',
                'section' => 'advocacy',
                'key' => 'subtitle',
                'value' => 'Our Approach',
                'type' => 'text',
                'label' => 'Approach Section Subtitle',
            ],
            [
                'page' => 'home',
                'section' => 'advocacy',
                'key' => 'title',
                'value' => 'Direct Advocacy. Practical Solutions.',
                'type' => 'text',
                'label' => 'Approach Section Title',
            ],
            [
                'page' => 'home',
                'section' => 'advocacy',
                'key' => 'description',
                'value' => 'Blueprint Legal partners directly with clients to deliver high-quality, responsive commercial advice. We bridge the gap between complex regulatory systems and your company\'s growth objectives in Tanzania.',
                'type' => 'textarea',
                'label' => 'Approach Section Description',
            ],

            // About Page
            [
                'page' => 'about',
                'section' => 'overview',
                'key' => 'subtitle',
                'value' => 'Who We Are',
                'type' => 'text',
                'label' => 'Overview Subtitle',
            ],
            [
                'page' => 'about',
                'section' => 'overview',
                'key' => 'title',
                'value' => 'Strategic Corporate Counsel for East Africa',
                'type' => 'text',
                'label' => 'Overview Title',
            ],
            [
                'page' => 'about',
                'section' => 'overview',
                'key' => 'desc_1',
                'value' => 'Blueprint Legal is a commercially minded law firm based in Dar es Salaam, Tanzania. We partner with local companies, regional founders, foreign investors, and global brand owners to confidently navigate complex regulatory and business landscapes.',
                'type' => 'textarea',
                'label' => 'Overview Paragraph 1',
            ],
            [
                'page' => 'about',
                'section' => 'overview',
                'key' => 'desc_2',
                'value' => 'Our operational philosophy is centered on direct partner access, clear legal updates, and strategic foresight. We strip away unnecessary legal jargon, presenting risk assessments in clear, actionable business terms so you can make informed decisions.',
                'type' => 'textarea',
                'label' => 'Overview Paragraph 2',
            ],
            [
                'page' => 'about',
                'section' => 'sets_apart',
                'key' => 'subtitle',
                'value' => 'What Sets Us Apart',
                'type' => 'text',
                'label' => 'Sets Apart Subtitle',
            ],
            [
                'page' => 'about',
                'section' => 'sets_apart',
                'key' => 'title',
                'value' => 'Bespoke Advocacy',
                'type' => 'text',
                'label' => 'Sets Apart Title',
            ],
            [
                'page' => 'about',
                'section' => 'sets_apart',
                'key' => 'p1_title',
                'value' => 'Commercial Clarity',
                'type' => 'text',
                'label' => 'Advantage 1 Title',
            ],
            [
                'page' => 'about',
                'section' => 'sets_apart',
                'key' => 'p1_desc',
                'value' => 'Solutions designed around your business constraints and long-term milestones.',
                'type' => 'textarea',
                'label' => 'Advantage 1 Description',
            ],
            [
                'page' => 'about',
                'section' => 'sets_apart',
                'key' => 'p2_title',
                'value' => 'Direct Partner Involvement',
                'type' => 'text',
                'label' => 'Advantage 2 Title',
            ],
            [
                'page' => 'about',
                'section' => 'sets_apart',
                'key' => 'p2_desc',
                'value' => 'Your matter is handled directly by senior specialists with years of market tenure.',
                'type' => 'textarea',
                'label' => 'Advantage 2 Description',
            ],
            [
                'page' => 'about',
                'section' => 'sets_apart',
                'key' => 'p3_title',
                'value' => 'Regulatory Foresight',
                'type' => 'text',
                'label' => 'Advantage 3 Title',
            ],
            [
                'page' => 'about',
                'section' => 'sets_apart',
                'key' => 'p3_desc',
                'value' => 'Deep relationships with key regulatory bodies to anticipate policy shifts before they impact operations.',
                'type' => 'textarea',
                'label' => 'Advantage 3 Description',
            ],
            [
                'page' => 'about',
                'section' => 'values',
                'key' => 'vision_title',
                'value' => 'Our Vision',
                'type' => 'text',
                'label' => 'Vision Section Title',
            ],
            [
                'page' => 'about',
                'section' => 'values',
                'key' => 'vision_content',
                'value' => 'To stand as the premier commercial law firm in Tanzania and East Africa, recognized for unlocking growth opportunities, facilitating cross-border transactions, and securing client assets.',
                'type' => 'textarea',
                'label' => 'Vision Section Description',
            ],
            [
                'page' => 'about',
                'section' => 'values',
                'key' => 'mission_title',
                'value' => 'Our Mission',
                'type' => 'text',
                'label' => 'Mission Section Title',
            ],
            [
                'page' => 'about',
                'section' => 'values',
                'key' => 'mission_content',
                'value' => 'To provide exceptional, client-focused legal advisory services that clear regulatory hurdles and protect critical innovations. We frame counsel to build the "how" rather than just the "no".',
                'type' => 'textarea',
                'label' => 'Mission Section Description',
            ],
            [
                'page' => 'about',
                'section' => 'values',
                'key' => 'experience_title',
                'value' => 'Our Experience',
                'type' => 'text',
                'label' => 'Experience Section Title',
            ],
            [
                'page' => 'about',
                'section' => 'values',
                'key' => 'experience_content',
                'value' => 'Our professionals offer deep sector experience, advising tech companies, multinational brands, industrial firms, and foreign funds in corporate structures, intellectual property, and commercial disputes.',
                'type' => 'textarea',
                'label' => 'Experience Section Description',
            ],

            // Clients Page
            [
                'page' => 'clients',
                'section' => 'header',
                'key' => 'subtitle',
                'value' => 'Who We Serve',
                'type' => 'text',
                'label' => 'Header Subtitle',
            ],
            [
                'page' => 'clients',
                'section' => 'header',
                'key' => 'title',
                'value' => 'Our Clients, Our Priority',
                'type' => 'text',
                'label' => 'Header Title',
            ],
            [
                'page' => 'clients',
                'section' => 'header',
                'key' => 'description',
                'value' => 'Blueprint Legal advises a diverse client base, ranging from early-stage innovators to international investors, providing tailored guidance that supports commercial ambition.',
                'type' => 'textarea',
                'label' => 'Header Description',
            ],

            // Accolades Page
            [
                'page' => 'accolades',
                'section' => 'header',
                'key' => 'subtitle',
                'value' => 'Accolades',
                'type' => 'text',
                'label' => 'Header Subtitle',
            ],
            [
                'page' => 'accolades',
                'section' => 'header',
                'key' => 'title',
                'value' => 'Client Perspectives & Standards',
                'type' => 'text',
                'label' => 'Header Title',
            ],
            [
                'page' => 'accolades',
                'section' => 'header',
                'key' => 'description',
                'value' => 'We measure our success by the growth, security, and milestones achieved by the corporate leaders we advise.',
                'type' => 'textarea',
                'label' => 'Header Description',
            ],
        ];

        foreach ($contents as $content) {
            PageContent::updateOrCreate(
                [
                    'page' => $content['page'],
                    'section' => $content['section'],
                    'key' => $content['key']
                ],
                [
                    'value' => $content['value'],
                    'type' => $content['type'],
                    'label' => $content['label']
                ]
            );
        }
    }
}
