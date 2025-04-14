<?php

namespace App\Library\Entity\Search;

class SearchMatching
{
    public function __construct(public string $field, public string $snippet)
    {
    }
}
