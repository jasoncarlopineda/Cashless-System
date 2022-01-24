<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Rfid;
use App\Models\User;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'student_id',
        'phone_number'
    ];

    public function rfid()
    {
        return $this->hasOne(Rfid::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
