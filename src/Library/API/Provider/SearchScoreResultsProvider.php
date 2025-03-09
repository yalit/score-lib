<?php

namespace App\Library\API\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Library\API\DTO\SearchScoreResult;
use App\Library\Search\TypesenseScoreRepository;

readonly class SearchScoreResultsProvider implements ProviderInterface
{
    public function __construct(
        private TypesenseScoreRepository $tsScoreRepository,
    ) {}

    /**
     * @return array<SearchScoreResult>
     */
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $q = $context['filters']['q'] ?? null;

        if (!$q) {
            return null;
        }

        return $this->tsScoreRepository->findScoreSearchResultByAll($q);
    }
}
