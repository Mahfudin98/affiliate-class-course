<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('youtube_videos', function (Blueprint $table) {
            $table->id();
            $table->string('youtube_id')->unique(); // Video ID dari YouTube
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('channel_id')->nullable(); // Channel ID pemilik video
            $table->string('channel_name')->nullable();
            $table->string('thumbnail_url')->nullable(); // URL thumbnail
            $table->integer('duration_seconds')->nullable(); // Duration dalam detik
            $table->integer('view_count')->nullable(); // Total views
            $table->integer('like_count')->nullable(); // Total likes
            $table->integer('comment_count')->nullable(); // Total comments
            $table->text('transcript')->nullable(); // Subtitle/transcript
            $table->dateTime('published_at')->nullable(); // Tanggal publish di YouTube
            $table->json('metadata')->nullable(); // Metadata JSON tambahan
            $table->boolean('is_available')->default(true); // Cek apakah video masih available
            $table->timestamps();

            $table->index('youtube_id');
            $table->index('channel_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('youtube_videos');
        Schema::dropIfExists('user_video_playbacks');
    }
};
