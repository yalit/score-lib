<?php

namespace App\Controller\Library\API;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class APIScorePostController
{
    public function __invoke(Score $score, Request $request)
    {
        dd('Score', $score);
    }
}
