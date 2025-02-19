<?php

namespace App\Repository\Library;

use App\Entity\Library\Score;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Score>
 */
class ScoreRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Score::class);
    }

    public function getLatestScores(int $nb, string $orderBy = 'createdAt', bool $ascending = false): array
    {
        return $this->createQueryBuilder('s')
            ->orderBy(sprintf('s.%s', $orderBy), $ascending ? 'ASC' : 'DESC')
            ->setMaxResults($nb)
            ->getQuery()
            ->getResult();
    }


    public function findFilteredAndOrderedScores(array $filters = [], string $orderBy = 'createdAt', bool $ascending = false, int $page = 1, int $scorePerPage = 10): array
    {
        $qb = $this->createQueryBuilder('s');

        if (str_contains($orderBy, '.')) {
            $parts = explode('.', $orderBy);
            $joinTable = $parts[0];
            $joinColumn = $parts[1];

            $qb->join(sprintf('s.%s', $joinTable), $joinTable)
                ->orderBy(sprintf('%s.%s', $joinTable, $joinColumn), $ascending ? 'ASC' : 'DESC');
            ;
        } else {
            $qb->orderBy(sprintf('s.%s', $orderBy), $ascending ? 'ASC' : 'DESC');
        }

        return $qb
            ->setFirstResult(($page - 1) * $scorePerPage)
            ->setMaxResults($scorePerPage)
            ->getQuery()
            ->getResult();
    }

    public function save(Score $score): void
    {
        $this->getEntityManager()->persist($score);
        $this->getEntityManager()->flush();
    }

    public function delete(Score $score): void
    {
        $this->getEntityManager()->remove($score);
        try {
            $this->getEntityManager()->flush();
        } catch (\Exception $e) {
            dd($e);
        }
    }
}
