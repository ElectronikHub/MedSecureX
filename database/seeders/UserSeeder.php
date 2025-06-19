<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@medsecurex.com',
            'password' => Hash::make('adminpassword'),
            'role' => 'admin',
        ]);
        User::create([
            'name' => 'Alice Nurse',
            'email' => 'alice.nurse@example.com',
            'password' => Hash::make('password'),
            'role' => 'nurse',
        ]);
        User::create([
            'name' => 'Bob Nurse',
            'email' => 'bob.nurse@example.com',
            'password' => Hash::make('password'),
            'role' => 'nurse',
        ]);
        User::create([
            'name' => 'Dr. Carol',
            'email' => 'carol.doctor@example.com',
            'password' => Hash::make('password'),
            'role' => 'doctor',
        ]);
        User::create([
            'name' => 'Dr. Dave',
            'email' => 'dave.doctor@example.com',
            'password' => Hash::make('password'),
            'role' => 'doctor',
        ]);
    }
}

