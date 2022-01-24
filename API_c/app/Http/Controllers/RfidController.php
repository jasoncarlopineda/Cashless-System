<?php

namespace App\Http\Controllers;

use App\Models\Rfid;
use Illuminate\Http\Request;

class RfidController extends Controller
{
    public function enroll(Request $request)
    {
        $fields = $request->validate([
            'student_id' => 'required',
            'rfid' => 'required|unique:rfids,rfid'
        ]);

        return Rfid::create([
            'balance' => 100,
            'student_id' => $fields['student_id'],
            'rfid' => $fields['rfid']
        ]);
    }

    public function reduceBalance(Request $request)
    {
        $fields = $request->validate([
            'rfid' => 'required',
            'total' => 'required'
        ]);

        $rfid = Rfid::where('rfid', $fields['rfid'])->first();

        if ($rfid == null) {
            return response(['message' => 'The given data was invalid.', 'errors' => ['rfid' => ['RFID does not exist']]], 422);
        }
        if ((float) $rfid->balance < (float) $fields['total']) {
            return response(['message' => 'The given data was invalid.', 'errors' => ['rfid' => ['Insufficient funds']]], 422);
        }

        $rfid->balance = (float) $rfid->balance - (float) $fields['total'];

        $rfid->save();

        return $rfid;
    }
}
