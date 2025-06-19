<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Schedule;
use Carbon\Carbon;

class ScheduleSeeder extends Seeder
{
    public function run(): void
    {
        $nurses = User::where('role', 'nurse')->get();
        foreach ($nurses as $nurse) {
            Schedule::create([
                'user_id'    => $nurse->id,
                'shift_date' => Carbon::today()->toDateString(),
                'start_time' => '08:00:00',
                'end_time'   => '16:00:00',
                'role'       => 'nurse',
            ]);
        }

        $doctors = User::where('role', 'doctor')->get();
        foreach ($doctors as $doctor) {
            Schedule::create([
                'user_id'    => $doctor->id,
                'shift_date' => Carbon::today()->toDateString(),
                'start_time' => '16:00:00',
                'end_time'   => '23:59:00',
                'role'       => 'doctor',
            ]);
        }
    }
}
