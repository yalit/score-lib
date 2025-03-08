<?php

namespace App\Library\Repository;

use App\Library\Entity\ScoreCategory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ScoreCategory>
 */
class ScoreCategoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ScoreCategory::class);
    }

    public function getQueryBuilderByValueAutoCompleter(string $value): QueryBuilder
    {
        return $this
            ->createQueryBuilder('sc')
            ->andWhere('sc.value LIKE :search')
            ->setParameter('search', '%'.$value.'%')
        ;
    }
}
