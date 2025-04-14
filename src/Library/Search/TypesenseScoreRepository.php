<?php

namespace App\Library\Search;

use ACSEO\TypesenseBundle\Finder\CollectionFinder;
use ACSEO\TypesenseBundle\Finder\TypesenseQuery;
use App\Library\API\DTO\Factory\SearchScoreResultFactory;
use App\Library\API\DTO\SearchScoreResult;
use App\Library\Entity\Score;
use App\Library\Search\DTO\TypesenseQueryParameters;

class TypesenseScoreRepository
{
    public const DEFAULT_NB_SCORES_PER_QUERY = 5;

    public function __construct(
        private readonly CollectionFinder $scoreFinder,
    ) {
    }

    /**
     * @return array<SearchScoreResult>
     */
    public function findScoreSearchResultByAll(TypesenseQueryParameters $queryParameters): array
    {
        $results = $this->scoreFinder->query($this->getQueryByAll($queryParameters))->getRawResults();

        return array_map(fn ($result): SearchScoreResult => SearchScoreResultFactory::createFromRawTypesenseResult($result), $results);
    }

    /**
     * @return array<Score>
     */
    public function findScoreByAll(TypesenseQueryParameters $queryParameters): array
    {
        return $this->scoreFinder->query($this->getQueryByAll($queryParameters))->getResults();
    }

    private function getQueryByAll(TypesenseQueryParameters $queryParameters): TypesenseQuery
    {
        $query = new TypesenseQuery($queryParameters->searchValue, 'title,reference, otherreferences, categories');

        //TODO : parameters not working
        if ($queryParameters->pageNumber) {
            $query->page($queryParameters->pageNumber);
        }

        if ($queryParameters->pageSize) {
            $query->perPage($queryParameters->pageSize);
        }

        if ($queryParameters->sortBy) {
            $query->sortBy($queryParameters->sortBy);
        }

        return $query;
    }
}
