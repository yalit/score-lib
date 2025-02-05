<?php

namespace App\Entity\Library\Factory;

use App\Entity\Library\ScoreReference;

class ScoreReferenceFactory
{
  public static function create(string $value): ScoreReference
  {
    $scoreReference = new ScoreReference();

    $scoreReference->setValue($value);

    return $scoreReference;
  }
}
