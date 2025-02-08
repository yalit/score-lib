<?php

namespace App\Form\Library\Field;

use App\Form\Library\AutoCompleter\ArtistAutoCompleter;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Routing\RouterInterface;
use Symfony\UX\Autocomplete\Form\AsEntityAutocompleteField;

#[AsEntityAutocompleteField]
class ScoreArtistAutoCompleteField extends AbstractType
{
    public function __construct(private readonly RouterInterface $router) {}

    public function configureOptions(OptionsResolver $resolver) :void
    {
        $resolver->setDefaults([
            'autocomplete' => true,
            'tom_select_options' => [
                'create' => true,
                'createOnBlur' => true,
                'delimiter' => ',',
                'maxItems' => 1
            ],
            'autocomplete_url' => $this->router->generate('ux_entity_autocomplete', ['alias' => ArtistAutoCompleter::ALIAS]),
        ]);
    }

    public function getParent(): string
    {
        return TextType::class;
    }
}
