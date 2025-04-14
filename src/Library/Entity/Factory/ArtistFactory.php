<?php

namespace App\Library\Entity\Factory;

use App\Library\Entity\Artist;

class ArtistFactory
{
    public static function create(string $name): Artist
    {
        $artist = new Artist();

        $artist->setName($name);

        return $artist;
    }
}
