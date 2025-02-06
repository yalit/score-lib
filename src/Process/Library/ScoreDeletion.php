<?php

namespace App\Process\Library;

use App\Entity\Library\Score;

class ScoreDeletion
{
    public function __construct(private readonly Score $score) 
    {}

    public function getScore(): Score
    {
        return $this->score;
    }
}
