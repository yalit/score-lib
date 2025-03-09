<?php

namespace App\Library\Entity\API;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Library\API\Provider\ArtistTypesProvider;

#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: "artist_types",
            paginationEnabled: false,
            provider: ArtistTypesProvider::class
        )
    ]
)]
class APIArtistType
{
    public function __construct(public string $type)
    {
    }
}
