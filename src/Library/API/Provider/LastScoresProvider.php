<?php

namespace App\Library\API\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\Library\API\LibraryStat;
use App\Repository\Library\ScoreRepository;

final readonly class LastScoresProvider implements ProviderInterface
{
    public function __construct(private ScoreRepository $scoreRepository) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        return $this->scoreRepository->getLatestScores(10);
    }
}
