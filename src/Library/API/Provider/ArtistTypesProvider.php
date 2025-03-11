<?php

namespace App\Library\API\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Library\API\DTO\APIArtistType;
use App\Library\Entity\Enum\ArtistType;

/**
 * @implements ProviderInterface<APIArtistType>
 */
final readonly class ArtistTypesProvider implements ProviderInterface
{
    /**
     * @return array<APIArtistType>
     */
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): array
    {
        return array_map(fn(ArtistType $artistType) => new APIArtistType($artistType->value), ArtistType::cases());
    }
}
