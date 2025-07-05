<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Patient;
use App\Models\User;
use Carbon\Carbon;

class PatientSeeder extends Seeder
{
    public function run()
    {
        // Fetch doctors and nurses to assign patients
        $doctor1 = User::where('email', 'carol.doctor@example.com')->first();
        $doctor2 = User::where('email', 'dave.doctor@example.com')->first();
        $doctor3 = User::where('email', 'dave.doctor@example.com')->first(); // Assuming you add this doctor
        $nurse1 = User::where('email', 'alice.nurse@example.com')->first();
        $nurse2 = User::where('email', 'bob.nurse@example.com')->first();

        // Patient assigned to doctor1
        Patient::create([
            'initials' => 'JS',
            'name' => 'John Patient',
            'patient_code' => 'P-1001',
            'age' => 45,
            'gender' => 'Male',
            'disease_categories' => json_encode(['Diabetes']),
            'appointment_start_time' => '09:00:00',
            'appointment_end_time' => '09:30:00',
            'appointment_date' => Carbon::today()->toDateString(),
            'reason' => 'Routine Checkup',
            'status' => 'Upcoming',
            'room' => '101A',
            'admitted' => true,
            'admission_timestamp' => Carbon::now()->subDays(1),
            'doctor_id' => $doctor1->id,
            'nurse_id' => $nurse1->id,
        ]);

        // Patient assigned to doctor2
        Patient::create([
            'initials' => 'JD',
            'name' => 'Jane Patient',
            'patient_code' => 'P-1002',
            'age' => 30,
            'gender' => 'Female',
            'disease_categories' => json_encode(['Hypertension']),
            'appointment_start_time' => '10:00:00',
            'appointment_end_time' => '10:30:00',
            'appointment_date' => Carbon::today()->toDateString(),
            'reason' => 'Follow-up',
            'status' => 'Upcoming',
            'room' => '102B',
            'admitted' => false,
            'doctor_id' => $doctor2->id,
            'nurse_id' => $nurse2->id,
        ]);

        // Additional patients assigned to doctor1
        Patient::create([
            'initials' => 'MB',
            'name' => 'Michael Brown',
            'patient_code' => 'P-1003',
            'age' => 60,
            'gender' => 'Male',
            'disease_categories' => json_encode(['Arthritis']),
            'appointment_start_time' => '11:00:00',
            'appointment_end_time' => '11:30:00',
            'appointment_date' => Carbon::today()->toDateString(),
            'reason' => 'Pain Management',
            'status' => 'Upcoming',
            'room' => '103C',
            'admitted' => true,
            'admission_timestamp' => Carbon::now()->subDays(2),
            'doctor_id' => $doctor1->id,
            'nurse_id' => $nurse1->id,
        ]);

        // Patient assigned to doctor3 (make sure doctor3 exists in users table)
        if ($doctor3) {
            Patient::create([
                'initials' => 'AL',
                'name' => 'Alice Lee',
                'patient_code' => 'P-1004',
                'age' => 50,
                'gender' => 'Female',
                'disease_categories' => json_encode(['Asthma']),
                'appointment_start_time' => '13:00:00',
                'appointment_end_time' => '13:30:00',
                'appointment_date' => Carbon::today()->toDateString(),
                'reason' => 'Respiratory Checkup',
                'status' => 'Upcoming',
                'room' => '104D',
                'admitted' => false,
                'doctor_id' => $doctor3->id,
                'nurse_id' => $nurse2->id,
            ]);
        }

        // Add more patients as needed for other doctors or nurses
    }
}
