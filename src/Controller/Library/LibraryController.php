<?php

namespace App\Controller\Library;

use App\Repository\Library\ScoreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/library')]
class LibraryController extends AbstractController
{
    #[Route('', name: 'app_library_index')]
    public function index(ScoreRepository $scoreRepository): Response
    {
        return $this->render('library/index.html.twig', [
            'scores' => $scoreRepository->findAll(),
        ]);
    }
}
