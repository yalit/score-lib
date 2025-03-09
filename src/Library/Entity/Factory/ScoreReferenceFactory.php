<?php

namespace App\Library\Entity\Factory;

use App\Library\Entity\ScoreReference;

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
