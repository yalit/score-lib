<?php

namespace App\Library\Factory;

use App\Library\Entity\ScoreFile;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Uid\Uuid;

readonly class ScoreFileFactory
{
    public function __construct(
        private string $scoreFileUploadDir,
        private SluggerInterface $slugger,
    ) {}

    public function createFromUploadedFile(UploadedFile $uploadedFile, ScoreFile &$scoreFile): void
    {
        $uploadedFileName =  pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $this->slugger->slug($uploadedFileName);
        $uploadedFileExtension = $uploadedFile->guessExtension();
        $scoreFile->setName($safeFilename);
        $scoreFile->setExtension($uploadedFileExtension);

        $extension = $uploadedFile->guessExtension();
        if ($extension === 'bin') {
            $mimeData = explode("/", $uploadedFile->getClientMimeType());
            $extension = $mimeData[count($mimeData) - 1];
        }
        $uniqueFileName = sprintf('%s_%s.%s', (Uuid::v4())->toString(), $scoreFile->getName(), $extension);
        $path = $this->scoreFileUploadDir . '/' . $uniqueFileName;

        $scoreFile->setPath($path);
        $scoreFile->setMimeType($uploadedFile->getClientMimeType());
        $scoreFile->setSize($uploadedFile->getSize());
        $scoreFile->setExtension($extension);

        $uploadedFile->move($this->scoreFileUploadDir, $uniqueFileName);
    }
}
