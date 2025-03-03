<?php

namespace App\Library\API\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\ApiResource\Library\APIArtistType;
use App\Entity\Library\Enum\ArtistType;
use App\Repository\Library\ScoreRepository;

final readonly class ArtistTypesProvider implements ProviderInterface
{
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        return array_map(fn(ArtistType $artistType) => new APIArtistType($artistType->value), ArtistType::cases());
    }
}
