<?php

namespace App\Entity\Library\Factory;

use App\Entity\Library\Artist;

class ArtistFactory
{
  public static function create(string $name): Artist 
  {
    $artist = new Artist();

    $artist->setName($name);

    return $artist;
  }
}
