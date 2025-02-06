<?php

namespace App\Twig\Components\Library;

use App\Entity\Library\Score;
use App\Process\Library\ScoreDeletion;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\ComponentToolsTrait;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent]
class LibraryTableRow extends AbstractController
{
    use DefaultActionTrait;
    use ComponentToolsTrait;

    const SCORE_DELETED = "score:deleted";

    #[LiveProp(writable: true)]
    public Score $score;

    #[LiveProp]
    public string $evenOrOdd = "even";

    #[LiveProp]
    public bool $deletionRequested = false;

    #[LiveAction]
    public function requestDeletion(): void
    {
        $this->deletionRequested = true;
    }

    #[LiveAction]
    public function cancelDeletionRequest(): void
    {
        $this->deletionRequested = false;
    }

    #[LiveAction]
    public function delete(MessageBusInterface $messageBus): RedirectResponse
    {
        $messageBus->dispatch(new ScoreDeletion($this->score));
        return $this->redirectToRoute('app_library_index');
    }
}
