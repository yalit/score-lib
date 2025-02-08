<?php

namespace App\Form\Library;

use App\Entity\Library\ScoreReference;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ScoreReferenceFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        //TODO : translation
        $builder
            ->add('value', TextType::class, [
                'attr' => ['placeholder' => 'reference']
            ])
            ->add('information', TextType::class, [
                'attr' => ['placeholder' => 'additional information']
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => ScoreReference::class,
        ]);
    }
}
