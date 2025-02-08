<?php

namespace App\Form\Library\AutoCompleter;

use App\Entity\Library\Artist;
use App\Repository\Library\ArtistRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\EntityRepository;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\UX\Autocomplete\EntityAutocompleterInterface;
use Symfony\Component\DependencyInjection\Attribute\AutoconfigureTag;

#[AutoconfigureTag('ux.entity_autocompleter', ['alias' => self::ALIAS])]
class ArtistAutoCompleter implements EntityAutocompleterInterface
{
    public const ALIAS = 'score_artist';

    public function getEntityClass(): string
    {
        return Artist::class;
    }

    /**
     * @param ArtistRepository $repository
     */
    public function createFilteredQueryBuilder(EntityRepository $repository, string $query): QueryBuilder
    {
        return $repository->getQueryBuilderSearchByName($query);
    }

    /** @param Artist $entity */
    public function getLabel(object $entity): string
    {
        return $entity->getName();
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
