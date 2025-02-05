<?php

namespace App\Library\Search\Factory;

use App\Library\Search\Enum\LibrarySearchOrderByValue;
use App\Library\Search\Enum\SearchByOrder;
use App\Library\Search\SearchOrderBy;

class SearchOrderByFactory
{
    public static function create(string $orderBy, string $order): SearchOrderBy
    {
        $value = match ($orderBy) {
            'title' => LibrarySearchOrderByValue::TITLE,
            default => LibrarySearchOrderByValue::CREATED_AT,
        };

        $orderValue = match ($order) {
            'ASC' => SearchByOrder::ASCENDING,
            default => SearchByOrder::DESCENDING,
        };

        return new SearchOrderBy($value, $orderValue);
    }
}
