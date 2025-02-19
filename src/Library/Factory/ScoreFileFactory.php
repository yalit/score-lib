<?php

namespace App\Library\Factory;

use App\Entity\Library\ScoreFile;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Uid\Uuid;

readonly class ScoreFileFactory
{
    public function __construct(
        private string $scoreFileUploadDir,
        private readonly SluggerInterface $slugger,
    ) {}

    public function createFromUploadedFile(UploadedFile $uploadedFile, ?ScoreFile &$scoreFile = null): ScoreFile
    {
        $scoreFile = $scoreFile ?? new ScoreFile();
        $uploadedFileName =  pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $this->slugger->slug($uploadedFileName);
        $uploadedFileExtension = $uploadedFile->guessExtension();
        $scoreFile->setName($uploadedFileName);
        $scoreFile->setExtension($uploadedFileExtension);

        $uniqueFileName = sprintf('%s_%s.%s', (Uuid::v4())->toString(), $scoreFile->getName(), $uploadedFile->guessExtension());
        $path = $this->scoreFileUploadDir . '/' . $uniqueFileName;

        $scoreFile->setPath($path);
        $scoreFile->setMimeType($uploadedFile->getClientMimeType());
        $scoreFile->setSize($uploadedFile->getSize());

        $uploadedFile->move($this->scoreFileUploadDir, $uniqueFileName);
        return $scoreFile;
    }
}
