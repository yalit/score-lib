<?php

namespace App\Library\Listener;

use App\Library\Entity\ScoreFile;
use App\Library\Factory\ScoreFileFactory;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsDoctrineListener;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Event\PreRemoveEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;

#[AsDoctrineListener(event: Events::prePersist)]
#[AsDoctrineListener(event: Events::preUpdate)]
#[AsDoctrineListener(event: Events::preRemove)]
readonly class ScoreFileUploadSubscriber
{
    public function __construct(private ScoreFileFactory $scoreFileFactory)
    {
    }

    public function prePersist(PrePersistEventArgs $args): void
    {
        $entity = $args->getObject();

        if(!($entity instanceof ScoreFile)) {
            return;
        }

        $this->handleUploadedScoreFile($entity);
    }

    public function preUpdate(PreUpdateEventArgs $args): void
    {
        $entity = $args->getObject();

        if(!($entity instanceof ScoreFile)) {
            return;
        }

        $this->handleUploadedScoreFile($entity);
    }

    public function preRemove(PreRemoveEventArgs $args): void
    {
        $entity = $args->getObject();

        if(!($entity instanceof ScoreFile)) {
            return;
        }

        $this->removeUploadedScoreFile($entity);
    }

    private function handleUploadedScoreFile(ScoreFile $scoreFile): void
    {
        if (!$scoreFile->getFile()) {
            return;
        }
        $this->scoreFileFactory->createFromUploadedFile($scoreFile->getFile(), $scoreFile);
        $scoreFile->setFile(null);
    }

    private function removeUploadedScoreFile(ScoreFile $scoreFile): void
    {
        if (!$scoreFile->getPath()) {
            return;
        }

        unlink($scoreFile->getPath());
    }
}
