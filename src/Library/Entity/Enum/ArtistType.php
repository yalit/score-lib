<?php

namespace App\Library\Entity\Enum;

use Symfony\Contracts\Translation\TranslatableInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

enum ArtistType: string implements TranslatableInterface
{
    case COMPOSER = 'entity.artist.type.composer';
    case LYRICIST = 'entity.artist.type.lyricist';
    case OTHER = 'entity.artist.type.other';

    public function trans(TranslatorInterface $translator, ?string $locale = null): string 
    { 
        return $translator->trans($this->value, locale: $locale);    
    }
}
