<?php

namespace App\Infra\Doctrine\Generator;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Id\AbstractIdGenerator;
use Symfony\Component\Uid\Uuid;

class DoctrineStringUUIDGenerator extends AbstractIdGenerator
{
    public function generateId(EntityManagerInterface $em, ?object $entity): string
    {
        return (UUID::v4())->toString();
    }
}
