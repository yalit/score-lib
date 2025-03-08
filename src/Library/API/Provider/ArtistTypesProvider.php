<?php

namespace App\Library\API\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\Library\API\APIArtistType;
use App\Entity\Library\Enum\ArtistType;

final readonly class ArtistTypesProvider implements ProviderInterface
{
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        return array_map(fn(ArtistType $artistType) => new APIArtistType($artistType->value), ArtistType::cases());
    }
}
