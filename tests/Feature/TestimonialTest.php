<?php

namespace Tests\Feature;

use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TestimonialTest extends TestCase
{
    use RefreshDatabase;

    public function test_clients_can_submit_a_testimonial_for_review(): void
    {
        $response = $this->post(route('testimonials.store'), [
            'name' => 'Amina K.',
            'company' => 'Northstar Group',
            'quote' => 'Blueprint Legal made our expansion feel effortless.',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('testimonials', [
            'name' => 'Amina K.',
            'status' => 'pending',
        ]);
    }

    public function test_admin_can_publish_a_testimonial_to_the_site(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $testimonial = Testimonial::create([
            'name' => 'Daniel N.',
            'company' => 'Apex Capital',
            'quote' => 'Their counsel gave us clarity at every stage.',
            'status' => 'pending',
        ]);

        $response = $this->actingAs($admin)->patch(route('admin.testimonials.update', $testimonial), [
            'status' => 'published',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('testimonials', [
            'id' => $testimonial->id,
            'status' => 'published',
        ]);
    }
}
