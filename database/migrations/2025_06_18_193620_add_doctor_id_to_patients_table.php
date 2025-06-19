<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDoctorIdToPatientsTable extends Migration
{
    public function up()
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->unsignedBigInteger('doctor_id')->nullable()->after('id');

            // Optional: add foreign key constraint if you have a doctors or users table
            // $table->foreign('doctor_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('patients', function (Blueprint $table) {
            // Drop foreign key if added
            // $table->dropForeign(['doctor_id']);
            $table->dropColumn('doctor_id');
        });
    }
}

//// This migration adds a 'doctor_id' column to the 'patients' table.
// The 'doctor_id' column is an unsigned big integer that can be null.
// It is added after the 'id' column.
// If you have a 'doctors' or 'users' table, you can uncomment the foreign key constraint to link the 'doctor_id' to the 'id' of the 'users'
// table, allowing for referential integrity.
// The down method removes the 'doctor_id' column if the migration is rolled back.
