<?php

namespace App\Form\Library\DataTransformer;

use App\Entity\Library\Factory\ArtistFactory;
use App\Entity\Library\Artist;
use App\Repository\Library\ArtistRepository;
use Symfony\Component\Form\DataTransformerInterface;

/**
 * @implements DataTransformerInterface<Artist, string>
 */
readonly class TextToArtistDataTransformer implements DataTransformerInterface
{
    public function __construct(
            private readonly ArtistRepository $repository
    ) {}

    /**
     * Transforms an object (Artist) to a string.
     *
     * @param  Artist|null $value
     */
    public function transform(mixed $value): string
    {
        if (null === $value) {
            return '';
        }

        return $value->getName();
    }

    /**
     * Transforms a string (number) to an object (Artist).
     */
    public function reverseTransform(mixed $value): ?Artist 
    {
        if (!$value) {
            return null;
        }

        $artist = $this->repository->find($value);

        if (null == $artist) {
            $artist = ArtistFactory::create($value);
        }

        return $artist;
    }
}

