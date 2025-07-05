<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('initials', 4);
            $table->string('name');
            $table->string('patient_code')->unique();
            $table->unsignedTinyInteger('age');
            $table->enum('gender', ['Male', 'Female', 'Other']);
            $table->json('disease_categories')->nullable();

            // Appointment times (time only)
            $table->time('appointment_start_time')->nullable();
            $table->time('appointment_end_time')->nullable();

            // Appointment date (date only) to filter appointments properly
            $table->date('appointment_date')->nullable();

            $table->string('reason')->nullable();
            $table->enum('status', ['Completed', 'Upcoming'])->default('Upcoming');
            $table->string('room')->nullable();

            // Admission tracking
            $table->boolean('admitted')->default(false);
            $table->timestamp('admission_timestamp')->nullable();
            $table->timestamp('discharge_timestamp')->nullable();

            // Foreign keys linking to users (doctors and nurses)
            $table->unsignedBigInteger('doctor_id')->nullable();
            $table->unsignedBigInteger('nurse_id')->nullable();

            // Foreign key constraints (optional but recommended)
            $table->foreign('doctor_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('nurse_id')->references('id')->on('users')->onDelete('set null');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('patients');
    }
};
