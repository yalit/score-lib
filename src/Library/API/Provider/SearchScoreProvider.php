<?php

namespace App\Library\API\Provider;

use ACSEO\TypesenseBundle\Finder\CollectionFinder;
use ACSEO\TypesenseBundle\Finder\TypesenseQuery;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Library\API\DTO\SearchScoreResult;
use App\Library\Entity\Search\SearchMatching;

readonly class SearchScoreProvider implements ProviderInterface
{
    public function __construct(
        private CollectionFinder $scoreFinder,
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

        $query = new TypesenseQuery($q, 'title,reference');

        $results = $this->scoreFinder->query($query)->getRawResults();

        return array_map(function ($result): SearchScoreResult {
            return new SearchScoreResult(
                $result['document']['id'],
                $result['document']['title'],
                array_map(fn($highlight) => new SearchMatching($highlight['field'], $highlight['snippet']), $result['highlights'])
            );
        }, $results);
    }
}
