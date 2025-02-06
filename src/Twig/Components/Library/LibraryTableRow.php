<?php

namespace App\Twig\Components\Library;

use App\Entity\Library\Score;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent]
class LibraryTableRow
{
    use DefaultActionTrait;

    #[LiveProp]
    public Score $score;

    #[LiveProp]
    public string $evenOrOdd = "even";
}
