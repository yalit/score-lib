<?php

namespace App\Twig\Components\Library;

use App\Entity\Library\Score;
use App\Form\Library\ScoreFormType;
use App\Library\Factory\ScoreFileFactory;
use App\Repository\Library\ScoreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
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

    #[LiveAction]
    public function save(Request $request, ScoreRepository $scoreRepository, ScoreFileFactory $scoreFileFactory): RedirectResponse
    {
        $this->submitForm();

        /** @var Score $score */
        $score = $this->form->getData();

        $uploadedFiles = $request->files->all('score_form')['files'];
        foreach ($uploadedFiles as $file) {
            $scoreFile = $scoreFileFactory->createFromUploadedFile($file);
            $score->addFile($scoreFile);
        }

        $scoreRepository->save($score);

        return $this->redirectToRoute(route: "app_library_score_show", parameters: ["id" => $score->getId()]);
    }
}
