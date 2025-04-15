<?php

namespace App\Library\Repository;

use App\Library\Entity\Artist;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Artist>
 */
class ArtistRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Artist::class);
    }

    public function getQueryBuilderSearchByName(string $value): QueryBuilder
    {
        return $this
            ->createQueryBuilder('a')
            ->andWhere('a.name LIKE :search')
            ->setParameter('search', '%' . $value . '%')
        ;
    }
}
