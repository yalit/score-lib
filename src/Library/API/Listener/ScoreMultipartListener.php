<?php

namespace App\Library\API\Listener;

use ApiPlatform\State\SerializerContextBuilderInterface;
use App\Entity\Library\ScoreFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

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
