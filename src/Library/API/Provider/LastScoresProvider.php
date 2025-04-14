<?php

namespace App\Library\API\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Library\Entity\Score;
use App\Library\Repository\ScoreRepository;

/**
 * @implements ProviderInterface<Score>
 */
final readonly class LastScoresProvider implements ProviderInterface
{
    public function __construct(private ScoreRepository $scoreRepository)
    {
    }

    /**
     * @return array<Score>
     */
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): array
    {
        return $this->scoreRepository->getLatestScores(10);
    }
}
