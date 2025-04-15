<?php

namespace App\Library\Entity\Factory;

use App\Library\Entity\ScoreCategory;

class ScoreCategoryFactory
{
    public static function create(string $value): ScoreCategory
    {
        $scoreCategory = new ScoreCategory();

        $scoreCategory->setValue($value);

        return $scoreCategory;
    }
}
