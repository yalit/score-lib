<?php

namespace App\Twig\Components\Library;

use App\Entity\Library\Score;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveArg;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent]
class LibraryTable
{
    use DefaultActionTrait;

    public const MAX_PER_PAGE = 10;

    #[LiveProp(url: true)]
    public int $maxPerPage = self::MAX_PER_PAGE;

    #[LiveProp(url: true)]
    public int $page = 1;

    #[LiveProp(writable: true)]
    /** @var array<array-key, Score> $scores */
    public array $scores = [];

    #[LiveProp(url: true)]
    public string $direction = "";

    #[LiveProp(url: true)]
    public string $orderedParam = "";

    #[LiveAction]
    public function changeDirection(#[LiveArg('by')] string $param): void
    {
        $this->orderedParam = $param;
        $this->direction = $this->direction === "" ? "ASC" : ($this->direction === "ASC" ? "DESC" : "ASC");
    }

    #[LiveAction]
    public function goToPage(#[LiveArg] int $page): void
    {
        $this->page = $page;
    }

    /** @return array<array-key, Score> */
    public function getPageScores(): array
    {
        $this->sortScores();
        return array_slice($this->scores, ($this->page - 1) * $this->maxPerPage, $this->maxPerPage, true);
    }

    public function getDirection(string $param): string
    {
        if ($this->orderedParam !== $param) {
            return "";
        }

        return $this->direction;
    }

    public function getTotalPages(): int
    {
        return ceil(count($this->scores)/$this->maxPerPage);
    }

    private function sortScores(): void
    {
        $titleCmp = function (Score $a, $b): int {
            if ($a->getTitle() < $b->getTitle()) {
                return $this->direction === "ASC" ? -1 : 1;
            } else {
                return $this->direction === "ASC" ? 1 : -1;
            }
        };

        match ($this->orderedParam) {
            "title" => usort($this->scores, $titleCmp),
            default => null
        };
    }
}
