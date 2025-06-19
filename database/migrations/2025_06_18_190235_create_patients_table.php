<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('initials', 4);
            $table->string('name');
            $table->string('patient_code')->unique(); // e.g., P-1001
            $table->unsignedTinyInteger('age');
            $table->enum('gender', ['Male', 'Female', 'Other']);
            $table->json('disease_categories')->nullable(); // for future use
            $table->time('appointment_start_time')->nullable();
            $table->time('appointment_end_time')->nullable();
            $table->string('reason')->nullable();
            $table->enum('status', ['Completed', 'Upcoming'])->default('Upcoming');
            $table->string('room')->nullable();
            $table->boolean('admitted')->default(false);
            $table->timestamp('admission_timestamp')->nullable();
            $table->timestamp('discharge_timestamp')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('patients');
    }
};


// This migration creates a patients table with fields for patient details.
// It includes fields for initials, name, patient code
