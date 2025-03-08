<?php

namespace App\Controller\Library;

use App\Entity\Library\Score;
use App\Entity\Library\ScoreFile;
use App\Library\Factory\ScoreFilesZipFactory;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use ZipArchive;

#[Route('/library/score')]
class ScoreFileController extends AbstractController
{
    #[Route(path: '/{score}/download/all', name: 'app_library_scorefile_download_all', options: ['export' => true])]
    #[IsGranted("ROLE_USER")]
    public function downloadAllScoreFiles(Score $score, ScoreFilesZipFactory $scoreFilesZipFactory): Response
    {
        return $this->file($scoreFilesZipFactory->createZip($score));
    }

    #[Route(path: '/{score}/download/{scoreFile}', name: 'app_library_scorefile_download', options: ['export' => true])]
    #[IsGranted("ROLE_USER")]
    public function downloadFile(Score $score, ScoreFile $scoreFile): Response
    {
        if ($scoreFile->getScore()->getId() !== $score->getId()) {
            throw new NotFoundHttpException();
        }

        return $this->file($scoreFile->getPath());
    }
}
