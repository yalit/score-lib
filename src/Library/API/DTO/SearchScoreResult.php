<?php

namespace App\Library\API\DTO;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Library\API\Provider\SearchScoreResultsProvider;
use App\Library\Entity\Search\SearchMatching;

#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/scores/search',
            provider: SearchScoreResultsProvider::class
        ),
    ]
)]
class SearchScoreResult
{
    /**
     * @param array<SearchMatching> $matchings
     */
    public function __construct(
        public string $id,
        public string $title,
        public array $matchings,
    ) {
    }
}
