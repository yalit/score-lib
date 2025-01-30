<?php

namespace App\Controller\Library;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/library')]
class LibraryController extends AbstractController
{
    #[Route('', name: 'app_library_index')]
    public function index(): Response
    {
        return $this->render('library/index.html.twig');
    }
}
