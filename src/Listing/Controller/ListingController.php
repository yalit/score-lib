<?php

namespace App\Listing\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/listing')]
class ListingController extends AbstractController
{
    #[Route('', name: 'app_listing_index')]
    public function index(): Response
    {
        return $this->render('listing/index.html.twig');
    }

//    #[Route('/search/{q}', name: 'app_listing_search')]
//    public function searchResults(): Response
//    {
//        return $this->render('listing/index.html.twig');
//    }
}
