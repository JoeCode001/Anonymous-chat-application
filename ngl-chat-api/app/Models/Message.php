<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['receiver_id', 'content'];

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}

