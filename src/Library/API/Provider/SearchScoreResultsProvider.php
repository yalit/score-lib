<?php

namespace App\Library\API\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Library\API\DTO\SearchScoreResult;
use App\Library\Search\DTO\TypesenseQueryParameters;
use App\Library\Search\TypesenseScoreRepository;

/**
 * @implements ProviderInterface<SearchScoreResult>
 */
readonly class SearchScoreResultsProvider implements ProviderInterface
{
    public function __construct(
        private TypesenseScoreRepository $tsScoreRepository,
    ) {
    }

    /**
     * @return array<SearchScoreResult>|null
     */
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): array|null
    {
        $q = $context['filters']['q'] ?? null;

        if (!$q) {
            return null;
        }

        return $this->tsScoreRepository->findScoreSearchResultByAll(new TypesenseQueryParameters($q));
    }
}
