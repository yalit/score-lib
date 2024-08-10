<?php

namespace App\Twig\Components\Library;

use App\Entity\Library\Score;
use App\Library\Search\Factory\SearchOrderByFactory;
use App\Library\Search\LibrarySearcher;
use App\Repository\Library\ScoreRepository;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveArg;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent]
class ScoreTable
{
    use DefaultActionTrait;

    #[LiveProp]
    public array $orderByDirections = [
        'title' => 'DESC',
        'ref' => null
    ];

    #[LiveProp]
    public string $orderBy = 'title';

    public function __construct(private readonly LibrarySearcher $librarySearcher)
    {
    }

    public function getScores(): array
    {
        return $this->librarySearcher->search(SearchOrderByFactory::create($this->orderBy, $this->orderByDirections[$this->orderBy]));
    }

    public function getDirection(string $orderBy): ?string
    {
        if ($this->orderBy !== $orderBy) {
            return null;
        }

        return $this->orderByDirections[$orderBy];
    }

    #[LiveAction]
    public function changeOrderBy(#[LiveArg('by')] string $orderBy): void
    {
        if (!array_key_exists($orderBy, $this->orderByDirections)) {
            return;
        }

        $this->orderBy = $orderBy;
        $this->orderByDirections[$orderBy] = $this->orderByDirections[$orderBy] === 'ASC' ? 'DESC' : 'ASC';
    }
}
