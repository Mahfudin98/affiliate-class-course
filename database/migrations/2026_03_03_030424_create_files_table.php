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
        Schema::create('files', function (Blueprint $table) {
            $table->id();

            $table->foreignId('module_id')
                ->constrained()
                ->restrictOnDelete();

            $table->foreignId('materi_id')
                ->constrained('kelas_materies')
                ->restrictOnDelete();

            $table->integer('order_index')->default(0);
            $table->boolean('is_primary')->default(false);

            $table->timestamps();

            $table->index(['module_id', 'order_index']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
