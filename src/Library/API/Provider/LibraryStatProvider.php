<?php

namespace App\Library\API\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Library\API\DTO\LibraryStat;
use App\Library\Repository\ScoreRepository;
use App\Listing\Repository\ListingRepository;

/**
 * @implements ProviderInterface<LibraryStat>
 */
final readonly class LibraryStatProvider implements ProviderInterface
{
    public function __construct(
        private ScoreRepository $scoreRepository,
        private ListingRepository $listingRepository,
    ) {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object
    {
        $nbScores = count($this->scoreRepository->findAll());
        $nbScoresInLastSevenDays = $this->scoreRepository->findAllScoresInLastSevenDays();
        $nbLists = count($this->listingRepository->findAll());
        return new LibraryStat($nbScores, $nbLists, $nbScoresInLastSevenDays);
    }
}
