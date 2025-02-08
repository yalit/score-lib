<?php

namespace App\Form\Library;

use App\Entity\Library\Score;
use App\Form\Library\DataTransformer\TextToArtistDataTransformer;
use App\Form\Library\DataTransformer\TextToScoreCategoriesDataTransformer;
use App\Form\Library\DataTransformer\TextToScoreReferenceDataTransformer;
use App\Form\Library\Field\ScoreCategoryAutoCompleteField;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\UX\LiveComponent\Form\Type\LiveCollectionType;

class ScoreFormType extends AbstractType
{
    public function __construct(
        private readonly TextToScoreCategoriesDataTransformer $textToScoreCategoriesDataTransformer,
        private readonly TextToScoreReferenceDataTransformer $textToScoreReferenceDataTransformer,
        private readonly TextToArtistDataTransformer $textToArtistDataTransformer
    ) {}


    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        //TODO : add proper label and translation
        $builder
            ->add('title', TextType::class, [
                'label' => ''
            ])
            ->add('reference', TextType::class)
            ->add('categories', ScoreCategoryAutoCompleteField::class)
            ->add('otherReferences', LiveCollectionType::class, [
                'entry_type' => ScoreReferenceFormType::class,
                'block_name' => 'references'
            ])
            ->add('artists', LiveCollectionType::class, [
                'entry_type' => ScoreArtistFormType::class,
                'block_name' => 'artists'
            ])
        //     ->add('files', CollectionType::class,  [
        //         'entry_type' => ScoreFileType::class,
        //         'by_reference' => false,
        //         'allow_add' => true, 
        //         'allow_delete' => true
        //     ])
        ;
        $builder->get('reference')->addModelTransformer($this->textToScoreReferenceDataTransformer);
        $builder->get('categories')->addModelTransformer($this->textToScoreCategoriesDataTransformer);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Score::class,
        ]);
    }
}

