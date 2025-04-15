<?php

namespace App\Library\Repository;

use App\Library\Entity\Score;
use DateInterval;
use DateTimeImmutable;
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

    /**
     * @return array<Score>
     */
    public function getLatestScores(int $nb, string $orderBy = 'createdAt', bool $ascending = false): array
    {
        return $this->createQueryBuilder('s')
            ->orderBy(sprintf('s.%s', $orderBy), $ascending ? 'ASC' : 'DESC')
            ->setMaxResults($nb)
            ->getQuery()
            ->getResult();
    }

    public function findAllScoresInLastSevenDays(): int
    {
        $sevenDaysAgo = (new DateTimeImmutable('now'))->sub(new DateInterval('P7D'))->setTime(0,0);
        return $this->createQueryBuilder('s')
            ->select('count(s.id) as c')
            ->where('s.createdAt >= :sevenDaysAgo')
            ->setParameter('sevenDaysAgo', $sevenDaysAgo)
            ->getQuery()
            ->getSingleScalarResult()
        ;
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
