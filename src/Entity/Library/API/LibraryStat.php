<?php

namespace App\Entity\Library\API;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use App\Library\API\Provider\LibraryStatProvider;

#[ApiResource(
    operations: [new Get(provider: LibraryStatProvider::class)]
)]
class LibraryStat
{
    public function __construct(
        public int $nbScores,
        public int $nbLists,
        public int $nbCreatedInLastWeek,
    ) {}
}
