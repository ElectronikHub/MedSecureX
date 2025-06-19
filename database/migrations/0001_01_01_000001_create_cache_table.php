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
        Schema::create('cache', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->mediumText('value');
            $table->integer('expiration');
        });

        Schema::create('cache_locks', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->string('owner');
            $table->integer('expiration');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cache');
        Schema::dropIfExists('cache_locks');
    }
};

// This migration creates a cache table and a cache_locks table.
// The cache table stores key-value pairs with an expiration time, while the cache_locks table
// is used to manage locks for cache entries, preventing concurrent modifications.
// The cache table's key is the primary key, and the value is stored as a medium text.
// The cache_locks table has a key as the primary key, an owner to identify who holds the lock,
// and an expiration time to manage the lock's validity.
