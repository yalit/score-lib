<?php

namespace App\Library\Search;

use App\Entity\Library\Score;
use App\Library\Search\Enum\SearchByOrder;
use App\Repository\Library\ScoreRepository;

readonly class LibrarySearcher
{
    public function __construct(private ScoreRepository $scoreRepository)
    {
    }

    /** @return Score[] */
    public function search(SearchOrderBy $orderBy): array
    {
        return $this->scoreRepository->findFilteredAndOrderedScores([], $orderBy->getValue()->value, $orderBy->getOrder() == SearchByOrder::ASCENDING);
    }
}
