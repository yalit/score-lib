<?php

namespace App\Library\Search\DTO;

class TypesenseQueryParameters
{
    public function __construct(
        public string $searchValue,
        public int|null $pageNumber = null,
        public int|null $pageSize = null,
        public string|null $sortBy = null,
    ) {}
}
