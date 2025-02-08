<?php

namespace App\Twig\Components\Library;

use App\Entity\Library\Score;
use App\Form\Library\ScoreFormType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use Symfony\UX\LiveComponent\LiveCollectionTrait;

#[AsLiveComponent]
final class ScoreForm extends AbstractController
{
    use DefaultActionTrait;
    use LiveCollectionTrait;

    #[LiveProp(fieldName: 'form')]
    public ?Score $score = null;

    protected function instantiateForm(): FormInterface
    {
        return $this->createForm(
            ScoreFormType::class,
            $this->score
        );
    }
}
