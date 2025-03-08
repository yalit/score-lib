<?php

namespace App\Controller\Library;

use App\Entity\Library\Score;
use App\Entity\Library\ScoreFile;
use Symfony\Bridge\Doctrine\Attribute\MapEntity;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/library/score')]
class ScoreFileController extends AbstractController
{
    #[Route(path: '/{score}/download/{scoreFile}', name: 'app_library_scorefile_download', options: ['export' => true])]
    public function downloadFile(Score $score, ScoreFile $scoreFile): Response
    {
        if ($scoreFile->getScore()->getId() !== $score->getId()) {
            throw new NotFoundHttpException();
        }

        return $this->file($scoreFile->getPath());
    }
}
