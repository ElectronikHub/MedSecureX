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
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('shift_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->enum('role', ['nurse', 'doctor']); // Optional, if you want to store the role per shift
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};

// This migration creates a 'schedules' table to manage user schedules.
// It includes fields for user ID, shift date, start time, end time, and an optional role field.
// The user_id is a foreign key that references the users table, and it will
// be deleted if the user is deleted (cascade on delete).
// The timestamps method adds created_at and updated_at columns to the table.
// The down method drops the 'schedules' table if the migration is rolled back.
// This structure allows for flexible scheduling of users, such as nurses and doctors, with specific shifts
// and roles, making it suitable for applications like healthcare management systems.
// The 'role' field is optional and can be used to specify the role of the user
// for that particular shift, such as 'nurse' or 'doctor'. This can help
// in managing different types of shifts and responsibilities within the application.
// The 'shift_date' field allows for scheduling shifts on specific dates, while 'start_time' and 'end_time' define the duration of each shift.
// This structure is useful for applications that require detailed scheduling capabilities, such as healthcare systems, where different users may have varying roles and responsibilities throughout the day.
// The foreign key constraint ensures that each schedule entry is associated with a valid user, maintaining referential integrity in the database.
// The 'onDelete' method with 'cascade' ensures that if a user is deleted, all their associated schedules will also be removed, preventing orphaned records in the schedules table.
// This migration is essential for applications that need to manage user schedules effectively, allowing for easy tracking of shifts and roles within the system.
// It provides a solid foundation for building more complex scheduling features in the future, such as handling overlapping shifts, managing availability, and integrating with other parts of the application
