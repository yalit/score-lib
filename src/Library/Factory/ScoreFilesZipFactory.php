<?php

namespace App\Library\Factory;

use App\Entity\Library\Score;
use RuntimeException;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\String\Slugger\AsciiSlugger;
use Symfony\Component\String\Slugger\SluggerInterface;
use ZipArchive;

readonly class ScoreFilesZipFactory
{
    public function __construct(
        private Filesystem       $filesystem,
        private SluggerInterface $slugger
    ) {
    }

    /**
     * Returns the path of the created zip file
     */
    public function createZip(Score $score): string
    {
        $zip = new ZipArchive();
        $zipName = sprintf('/tmp/%s.zip', $this->slugger->slug($score->getTitle())->lower());

        if ($this->filesystem->exists($zipName)) {
            $this->filesystem->remove($zipName);
        }

        if ($zip->open($zipName, ZipArchive::CREATE) !== TRUE) {
            throw new RuntimeException('Failed to create zip archive');
        }

        foreach ($score->getFiles() as $file) {
            $zip->addFile($file->getPath(), $file->getName() . '.' . $file->getExtension());
        }

        $zip->close();

        return $zipName;
    }
}
