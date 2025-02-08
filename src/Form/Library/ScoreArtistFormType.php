<?php

namespace App\Form\Library;

use App\Entity\Library\Enum\ArtistType;
use App\Entity\Library\ScoreArtist;
use App\Form\Library\DataTransformer\TextToArtistDataTransformer;
use App\Form\Library\Field\ScoreArtistAutoCompleteField;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EnumType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ScoreArtistFormType extends AbstractType
{
    public function __construct(private readonly TextToArtistDataTransformer $textToArtistDataTransformer)
    {}

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('artist', ScoreArtistAutoCompleteField::class)
            ->add('type', EnumType::class, [
                'class' => ArtistType::class
            ])
            ;
        $builder->get('artist')->addModelTransformer($this->textToArtistDataTransformer);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => ScoreArtist::class,
        ]);
    }
}
