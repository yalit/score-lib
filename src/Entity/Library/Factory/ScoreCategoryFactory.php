<?php

namespace App\Entity\Library\Factory;

use App\Entity\Library\ScoreCategory;

class ScoreCategoryFactory
{
  public static function create(string $value): ScoreCategory 
  {
    $scoreCategory = new ScoreCategory();

    $scoreCategory->setValue($value);

    return $scoreCategory;
  }
}
