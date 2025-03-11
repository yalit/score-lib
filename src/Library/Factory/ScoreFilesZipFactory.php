<?php

namespace App\Library\Factory;

use App\Library\Entity\Score;
use RuntimeException;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use ZipArchive;

readonly class ScoreFilesZipFactory
{
    public function __construct(
        private Filesystem       $filesystem,
        private SluggerInterface $slugger,
        private TranslatorInterface $translator
    ) {
    }

    /**
     * Returns the path of the created zip file
     */
    public function createZip(Score $score): string
    {
        $zip = new ZipArchive();
        $zipName = sprintf('/tmp/%s.zip', $this->slugger->slug($score->getTitle() ?? $this->translator->trans("library.score.default_title.label"))->lower());


        if ($this->filesystem->exists($zipName)) {
            $this->filesystem->remove($zipName);
        }

        if ($zip->open($zipName, ZipArchive::CREATE) !== TRUE) {
            throw new RuntimeException('Failed to create zip archive');
        }

        foreach ($score->getFiles() as $file) {
            $filePath = $file->getPath();
            if (!$filePath) {
                continue;
            }
            $zip->addFile($filePath, $file->getName() . '.' . $file->getExtension());
        }

        $zip->close();

        return $zipName;
    }
}
