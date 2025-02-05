<?php

namespace App\Form\Library;

use App\Doctrine\DataTransformer\TextToScoreReferenceDataTransformer;
use App\Entity\Library\Score;
use App\Entity\Library\ScoreCategory;
use App\Form\Library\DataTransformer\TextToScoreReferencesDataTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\UX\Autocomplete\Form\BaseEntityAutocompleteType;

class ScoreFormType extends AbstractType
{
    public function __construct(
        private readonly TextToScoreReferencesDataTransformer $textToScoreReferencesDataTransformer
    ) {}

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', TextType::class, [
                'label' => ''
            ])
            ->add('description', TextareaType::class)
            ->add('refs', TextType::class,  [
                'autocomplete' => true,
                'tom_select_options' => [
                    'create' => true,
                    'createOnBlur' => true,
                    'delimiter' => ',',
                ],
            ])
        //     ->add('categories', CollectionType::class,  [
        //         'entry_type' => ScoreCategoryType::class,
        //         'by_reference' => false,
        //         'allow_add' => true, 
        //         'allow_delete' => true
        //     ])
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

        $builder->get('refs')->addModelTransformer($this->textToScoreReferencesDataTransformer);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Score::class,
        ]);
    }
}

