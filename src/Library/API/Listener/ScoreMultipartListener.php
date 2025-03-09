<?php

namespace App\Library\API\Listener;

use App\Library\Entity\ScoreFile;
use Symfony\Component\HttpFoundation\Request;

readonly class ScoreMultipartListener
{
    public function handleRequest(Request $request): void
    {
        $existingScore = $request->attributes->get('data');

        if ($existingScore === null) {
            return;
        }

        $files = $request->files->all();

        foreach ($files as $uploadedFile) {
            $file = new ScoreFile();
            $file->setFile($uploadedFile);
            $existingScore->addFile($file);
        }

        $request->attributes->set('data', $existingScore);
    }
}
