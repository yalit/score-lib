<?php

namespace App\Entity\Library\Factory;

use App\Entity\Library\Artist;
use App\Entity\Library\Enum\ArtistType;
use App\Entity\Library\ScoreArtist;

class ScoreArtistFactory
{
  public static function create(ArtistType $artistType, Artist $artist):ScoreArtist 
  {
    $scoreArtist = new ScoreArtist();

    $scoreArtist->setType($artistType);
    $scoreArtist->setArtist($artist);

    return $scoreArtist;
  }
}
