<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['page', 'section', 'key', 'value', 'type', 'label'])]
class PageContent extends Model
{
    //
}
