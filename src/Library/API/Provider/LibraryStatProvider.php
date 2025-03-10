<?php

namespace App\Library\API\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Library\API\DTO\LibraryStat;
use App\Library\Repository\ScoreRepository;

final readonly class LibraryStatProvider implements ProviderInterface
{
    public function __construct(private ScoreRepository $scoreRepository) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $nbScores = count($this->scoreRepository->findAll());

        return new LibraryStat($nbScores, 0, 0);
    }
}
