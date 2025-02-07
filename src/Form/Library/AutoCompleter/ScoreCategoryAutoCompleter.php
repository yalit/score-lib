<?php

namespace App\Form\Library\AutoCompleter;

use App\Entity\Library\ScoreCategory;
use App\Repository\Library\ScoreCategoryRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\EntityRepository;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\UX\Autocomplete\EntityAutocompleterInterface;
use Symfony\Component\DependencyInjection\Attribute\AutoconfigureTag;

#[AutoconfigureTag('ux.entity_autocompleter', ['alias' =>ScoreCategoryAutoCompleter::ALIAS])]
class ScoreCategoryAutoCompleter implements EntityAutocompleterInterface
{
    public const ALIAS = 'score_category';

    public function getEntityClass(): string
    {
        return ScoreCategory::class;
    }

    /**
     * @param ScoreCategoryRepository $repository
     */
    public function createFilteredQueryBuilder(EntityRepository $repository, string $query): QueryBuilder
    {
        return $repository->getQueryBuilderByValueAutoCompleter($query);
    }

    /** @param ScoreCategory $entity */
    public function getLabel(object $entity): string
    {
        return $entity->getValue();
    }

    public function getValue(object $entity): string
    {
        return $entity->getId();
    }

    public function isGranted(Security $security): bool
    {
        // see the "security" option for details
        return true;
    }
}
