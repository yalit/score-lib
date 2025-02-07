<?php

namespace App\Form\Library;

use App\Entity\Library\Score;
use App\Form\Library\DataTransformer\TextToScoreCategoriesDataTransformer;
use App\Form\Library\DataTransformer\TextToScoreReferencesDataTransformer;
use App\Form\Library\Field\ScoreCategoryAutoCompleteField;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ScoreFormType extends AbstractType
{
    public function __construct(
        private readonly TextToScoreReferencesDataTransformer $textToScoreReferencesDataTransformer,
        private readonly TextToScoreCategoriesDataTransformer $textToScoreCategoriesDataTransformer
    ) {}


    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', TextType::class, [
                'label' => ''
            ])
            ->add('categories', ScoreCategoryAutoCompleteField::class)
            // ->add('otherReferences', TextType::class,  [
            //     'autocomplete' => true,
            //     'tom_select_options' => [
            //         'create' => true,
            //         'createOnBlur' => true,
            //         'delimiter' => ',',
            //     ],
            // ])
        //     ->add('artists', CollectionType::class,  [
        //         'entry_type' => ScoreArtistType::class,
        //         'by_reference' => false,
        //         'allow_add' => true, 
        //         'allow_delete' => true
        //     ])
        //     ->add('files', CollectionType::class,  [
        //         'entry_type' => ScoreFileType::class,
        //         'by_reference' => false,
        //         'allow_add' => true, 
        //         'allow_delete' => true
        //     ])
        ;
        // $builder->get('otherReferences')->addModelTransformer($this->textToScoreReferencesDataTransformer);
        $builder->get('categories')->addModelTransformer($this->textToScoreCategoriesDataTransformer);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Score::class,
        ]);
    }
}

