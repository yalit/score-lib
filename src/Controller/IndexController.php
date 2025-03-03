<?php

namespace App\Controller;

use App\Repository\Library\ScoreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class IndexController extends AbstractController
{
    #[Route('/', name: 'app_index', options:['expose' => true])]
    public function index(ScoreRepository $scoreRepository): Response
    {
        return $this->render('index/index.html.twig');
    }
}
