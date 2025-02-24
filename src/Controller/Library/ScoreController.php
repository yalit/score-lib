<?php

namespace App\Controller\Library;

use App\Entity\Library\Score;
use App\Form\Library\ScoreFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/library/score')]
class ScoreController extends AbstractController
{
    #[Route('/{id}', name: 'app_library_score_show', methods: ['GET'])]
    #[Route('/{id}/edit', name: 'app_library_score_edit', methods: ['GET'])]
    #[Route('/new', name: 'app_library_score_new', methods: ['GET'])]
    public function show(): Response
    {
        return $this->render('library/score/index.html.twig');
    }
}
