<?php

namespace App\Library\API\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Library\Entity\Score;
use App\Library\Search\DTO\TypesenseQueryParameters;
use App\Library\Search\TypesenseScoreRepository;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\ParameterBag;

/**
 * @implements ProviderInterface<Score>
 */   
final readonly class ScoresProvider implements ProviderInterface
{
    /**
     * @param ProviderInterface<Score> $collectionProvider
     */
    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.collection_provider')]
        private ProviderInterface $collectionProvider,
        private TypesenseScoreRepository $tsScoreRepository,
    ) {}

    /**
     * @return array<Score>
     */
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): array | null
    {
        $searchValue = $context['request']->query->get('search');

        if (!$searchValue) {
            /** @var array<Score> | null  $scores */
            $scores = $this->collectionProvider->provide($operation, $uriVariables, $context);
            return $scores;
        }

        return $this->tsScoreRepository->findScoreByAll($this->getTypeSenseQueryParameters($context['request']->query));
    }

    private function getTypeSenseQueryParameters(ParameterBag $query): TypeSenseQueryParameters
    {
        $q = $query->get('search');
        $pageNumber = $query->get('page') ?? 1;
        $nbPerPage = $query->get('nb') ?? TypesenseScoreRepository::DEFAULT_NB_SCORES_PER_QUERY;
        $sortBy = $query->get('sortBy');

        return new TypeSenseQueryParameters($q, $pageNumber, $nbPerPage, $sortBy);
    }
}
