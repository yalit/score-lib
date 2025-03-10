<?php

namespace App\Library\Controller;

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

    #[Route('/search/{q}', name: 'app_library_search')]
    public function searchResults(): Response
    {
        return $this->render('library/index.html.twig');
    }
}
