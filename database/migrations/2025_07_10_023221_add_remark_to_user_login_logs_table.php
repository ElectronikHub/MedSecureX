<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('user_login_logs', function (Blueprint $table) {
            $table->string('remark')->nullable()->after('duty_status');
        });
    }

    public function down()
    {
        Schema::table('user_login_logs', function (Blueprint $table) {
            $table->dropColumn('remark');
        });
    }

};
