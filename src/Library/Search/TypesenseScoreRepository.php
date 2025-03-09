<?php

namespace App\Library\Search;

use ACSEO\TypesenseBundle\Finder\CollectionFinder;
use ACSEO\TypesenseBundle\Finder\TypesenseQuery;
use App\Library\API\DTO\Factory\SearchScoreResultFactory;
use App\Library\API\DTO\SearchScoreResult;

class TypesenseScoreRepository
{
    public function __construct(
        private CollectionFinder $scoreFinder,
    ) {}

    /**
     * @return array<SearchScoreResult>
     */
    public function findScoreSearchResultByAll(string $q): array
    {
        $query = new TypesenseQuery($q, 'title,reference, otherreferences, categories');

        $results = $this->scoreFinder->query($query)->getRawResults();

        return array_map(fn ($result): SearchScoreResult => SearchScoreResultFactory::createFromRawTypesenseResult($result), $results);
    }
}
