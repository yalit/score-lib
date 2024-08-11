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

    #[LiveProp(url: true)]
    /** @var array<?string> $orderByDirections */
    public array $orderByDirections = [
        'title' => 'DESC',
        'ref' => 'NONE'
    ];

    #[LiveProp(url: true)]
    public string $orderBy = 'title';

    #[LiveProp]
    public bool $actionMenuDisplayed = false;

    #[LiveProp]
    public ?string $actionMenuId = null;

    #[LiveProp]
    public bool $deletionRequested = false;

    #[LiveProp]
    public ?string $deletionRequestedId = null;

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

    #[LiveAction]
    public function toggleActionMenu(#[LiveArg] string $id): void
    {
        $this->actionMenuDisplayed = !$this->actionMenuDisplayed;
        $this->actionMenuId = $id;
    }

    #[LiveAction]
    public function requestDeletion(#[LiveArg('id')] string $id): void
    {
        $this->deletionRequested = true;
        $this->deletionRequestedId = $id;
        $this->actionMenuDisplayed = false;
    }

    #[LiveAction]
    public function confirmDeletion(#[LiveArg('id')] string $id): void
    {
        $this->librarySearcher->deleteScore($id);
        $this->deletionRequested = false;
        $this->deletionRequestedId = null;
    }

    #[LiveAction]
    public function cancelDeletionRequest(): void
    {
        $this->deletionRequested = false;
        $this->deletionRequestedId = null;
    }

    public function getDeletionRequestedScore(): ?Score
    {
        if ($this->deletionRequestedId === null) {
            return null;
        }

        return $this->librarySearcher->getScoreById($this->deletionRequestedId);
    }
}
