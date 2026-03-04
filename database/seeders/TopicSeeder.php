<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TopicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $topics = [
            ['name' => 'Content Creation', 'slug' => 'content-creation'],
            ['name' => 'TikTok Ads', 'slug' => 'tiktok-ads'],
            ['name' => 'Live Streaming', 'slug' => 'live-streaming'],
            ['name' => 'Product Research', 'slug' => 'product-research'],
        ];

        foreach ($topics as $topic) {
            DB::table('topics')->insert([
                'name' => $topic['name'],
                'slug' => $topic['slug'],
                'icon' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
