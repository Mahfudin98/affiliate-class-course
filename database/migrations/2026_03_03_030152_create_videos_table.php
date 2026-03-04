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
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('module_id')
                ->constrained()
                ->restrictOnDelete();

            $table->foreignId('youtube_video_id')
                ->constrained('youtube_videos')
                ->restrictOnDelete();

            $table->integer('order_index')->default(0);
            $table->integer('start_time')->nullable();
            $table->integer('end_time')->nullable();
            $table->boolean('is_primary')->default(false);

            $table->timestamps();

            $table->index(['module_id', 'order_index']);
            $table->index('youtube_video_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
