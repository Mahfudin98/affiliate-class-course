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
        Schema::create('user_video_playbacks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('youtube_video_id')
                ->constrained()
                ->restrictOnDelete();

            $table->foreignId('user_id')
                ->constrained()
                ->restrictOnDelete();

            $table->integer('total_watch_seconds')->default(0);
            $table->integer('last_position_seconds')->default(0);
            $table->float('watch_percentage')->default(0);
            $table->boolean('is_completed')->default(false);
            $table->integer('watch_count')->default(0);
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();

            $table->timestamps();

            $table->unique(['youtube_video_id', 'user_id']);
            $table->index('user_id');
            $table->index('is_completed');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_vide_playbacks');
    }
};
