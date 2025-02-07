<?php

namespace App\Entity\Library\Factory;

use App\Entity\Library\ScoreReference;

class ScoreReferenceFactory
{
  public static function create(string $value, ?string $information = null): ScoreReference
  {
    $scoreReference = new ScoreReference();

    $scoreReference->setValue($value);
    $scoreReference->setInformation($information);

    return $scoreReference;
  }
}
