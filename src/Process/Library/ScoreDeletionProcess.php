<?php

namespace App\Process\Library;

use App\Process\Library\ScoreDeletion;
use App\Repository\Library\ScoreRepository;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
final class ScoreDeletionProcess
{
    public function __construct(private readonly ScoreRepository $scoreRepository) 
    {}

    public function __invoke(ScoreDeletion $scoreDeletion): void
    {
        $this->scoreRepository->delete($scoreDeletion->getScore());
    }
}
