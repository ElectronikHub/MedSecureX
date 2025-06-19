<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Patient;

class PatientSeeder extends Seeder
{
    public function run()
    {
        Patient::truncate(); // Optional: clears table before seeding

        Patient::insert([
            [
                'initials' => 'JD',
                'name' => 'John Doe',
                'patient_code' => 'P-1001',
                'age' => 45,
                'gender' => 'Male',
                'disease_categories' => json_encode(['Hypertension']),
                'appointment_start_time' => '09:00:00',
                'appointment_end_time' => '09:30:00',
                'reason' => 'Routine Checkup',
                'status' => 'Completed',
                'room' => '201A',
                'admitted' => true,
                'admission_timestamp' => now()->subDays(1)->setTime(8, 0, 0),
                'discharge_timestamp' => now()->subDays(1)->setTime(10, 0, 0),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'initials' => 'JS',
                'name' => 'Jane Smith',
                'patient_code' => 'P-1002',
                'age' => 32,
                'gender' => 'Female',
                'disease_categories' => json_encode(['Asthma']),
                'appointment_start_time' => '10:00:00',
                'appointment_end_time' => '10:30:00',
                'reason' => 'Follow-up',
                'status' => 'Completed',
                'room' => null,
                'admitted' => false,
                'admission_timestamp' => null,
                'discharge_timestamp' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'initials' => 'RJ',
                'name' => 'Robert Johnson',
                'patient_code' => 'P-1003',
                'age' => 58,
                'gender' => 'Male',
                'disease_categories' => json_encode(['Hypertension']),
                'appointment_start_time' => '13:00:00',
                'appointment_end_time' => '13:30:00',
                'reason' => 'Blood Pressure Check',
                'status' => 'Upcoming',
                'room' => '305B',
                'admitted' => true,
                'admission_timestamp' => now()->setTime(7, 30, 0),
                'discharge_timestamp' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'initials' => 'MW',
                'name' => 'Mary Williams',
                'patient_code' => 'P-1004',
                'age' => 29,
                'gender' => 'Female',
                'disease_categories' => json_encode(['Prenatal Care']),
                'appointment_start_time' => '14:30:00',
                'appointment_end_time' => '15:00:00',
                'reason' => 'Prenatal Checkup',
                'status' => 'Upcoming',
                'room' => null,
                'admitted' => false,
                'admission_timestamp' => null,
                'discharge_timestamp' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'initials' => 'TB',
                'name' => 'Thomas Brown',
                'patient_code' => 'P-1005',
                'age' => 42,
                'gender' => 'Male',
                'disease_categories' => json_encode(['Allergy']),
                'appointment_start_time' => '16:00:00',
                'appointment_end_time' => '16:30:00',
                'reason' => 'Allergy Consultation',
                'status' => 'Upcoming',
                'room' => null,
                'admitted' => false,
                'admission_timestamp' => null,
                'discharge_timestamp' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
