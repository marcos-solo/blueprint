<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['name', 'title', 'company', 'email', 'message', 'status', 'approved_at'])]
class AccoladeSubmission extends Model
{
    protected $casts = [
        'approved_at' => 'datetime',
    ];
}
