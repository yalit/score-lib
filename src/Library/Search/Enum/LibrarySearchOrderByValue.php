<?php

namespace App\Library\Search\Enum;

enum LibrarySearchOrderByValue: string
{
    case TITLE = 'title';
    case REF = 'mainReference.value';
    case CREATED_AT = 'createdAt';
}
