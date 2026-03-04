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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('thumbnail_url')->nullable();
            $table->foreignId('difficulty_level_id')
                ->constrained()
                ->restrictOnDelete();

            $table->foreignId('topic_id')
                ->constrained()
                ->restrictOnDelete();

            $table->float('duration_hours')->nullable();
            $table->integer('module_count')->default(0);
            $table->boolean('is_new')->default(false);
            $table->timestamps();

            $table->index('title');
            $table->index(['topic_id', 'difficulty_level_id']);
            $table->index('is_new');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
