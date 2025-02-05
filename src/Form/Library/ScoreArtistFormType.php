<?php

namespace App\Form\Library;

use App\Entity\Library\Artist;
use App\Entity\Library\Enum\ArtistType;
use App\Entity\Library\ScoreArtist;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EnumType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ScoreArtistFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('artist', EntityType::class, [
                'class' => Artist::class,
                'choice_label' => 'name',
                'placeholder' => 'Choose an artist',
            ])
            ->add('type', EnumType::class, [
                'class' => ArtistType::class
            ])
            ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => ScoreArtist::class,
        ]);
    }
}
