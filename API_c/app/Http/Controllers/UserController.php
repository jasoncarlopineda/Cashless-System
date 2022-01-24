<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function list()
    {
        return User::orderBy('id')->paginate(10);
    }

    public function find($id)
    {
        return User::with(['student', 'student.rfid'])->find($id);
    }
}
