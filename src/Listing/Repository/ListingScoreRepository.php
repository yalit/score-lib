<?php

namespace App\Listing\Repository;

use App\Listing\Entity\Listing;
use App\Listing\Entity\ListingScore;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ListingScore>
 */
class ListingScoreRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ListingScore::class);
    }
    
    public function save(ListingScore $listingScore): void
    {
        $this->getEntityManager()->persist($listingScore);
        $this->getEntityManager()->flush();
    }

    public function delete(ListingScore $listingScore): void
    {
        $this->getEntityManager()->remove($listingScore);
        try {
            $this->getEntityManager()->flush();
        } catch (\Exception $e) {
            dd($e);
        }
    }
}
