<?php

namespace App\Library\Entity\Factory;

use App\Library\Entity\Artist;
use App\Library\Entity\Enum\ArtistType;
use App\Library\Entity\ScoreArtist;

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
