<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['title', 'slug', 'content', 'image_url', 'video_url'])]
class Blog extends Model
{
    //
}
