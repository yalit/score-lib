<?php

namespace App\Listing\Repository;

use App\Listing\Entity\Listing;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Listing>
 */
class ListingRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Listing::class);
    }

    public function save(Listing $listing): void
    {
        $this->getEntityManager()->persist($listing);
        $this->getEntityManager()->flush();
    }

    public function delete(Listing $listing): void
    {
        $this->getEntityManager()->remove($listing);
        try {
            $this->getEntityManager()->flush();
        } catch (\Exception $e) {
            dd($e);
        }
    }
}
