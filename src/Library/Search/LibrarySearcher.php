<?php

namespace App\Library\Search;

use App\Library\Entity\Score;
use App\Library\Repository\ScoreRepository;
use App\Library\Search\Enum\SearchByOrder;

readonly class LibrarySearcher
{
    public function __construct(private ScoreRepository $scoreRepository)
    {
    }

    /** @return Score[] */
    public function search(SearchOrderBy $orderBy, int $page, int $scorePerPage): array
    {
        return $this->scoreRepository->findFilteredAndOrderedScores([], $orderBy->getValue()->value, $orderBy->getOrder() == SearchByOrder::ASCENDING, $page, $scorePerPage);
    }

    public function getScoreById(?string $deletionRequestedId): ?Score
    {
        return $this->scoreRepository->find($deletionRequestedId);
    }

    public function deleteScore(string $id): void
    {
        $score = $this->scoreRepository->find($id);
        if ($score) {
            $this->scoreRepository->delete($score);
        }
    }

    /** @return Score[] */
    public function findAll(): array
    {
        return $this->scoreRepository->findAll();
    }
}
