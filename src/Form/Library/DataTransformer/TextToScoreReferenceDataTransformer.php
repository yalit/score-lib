<?php

namespace App\Form\Library\DataTransformer;

use App\Entity\Library\Factory\ScoreReferenceFactory;
use App\Entity\Library\ScoreReference;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Form\DataTransformerInterface;

/**
 * @implements DataTransformerInterface<ArrayCollection<ScoreReference>, string>
 */
readonly class TextToScoreReferenceDataTransformer implements DataTransformerInterface
{
  /**
     * Transforms an object (ScoreReference) to a string (number).
     *
     * @param  ScoreReference|null $value
     */
    public function transform(mixed $value): string
    {
        if (null === $value) {
            return '';
        }

        return $value->getValue();
    }

    /**
     * Transforms a string (number) to an object (scoreReference).
     */
    public function reverseTransform(mixed $value): ?ScoreReference 
    {
        return null === $value ? $value : ScoreReferenceFactory::create($value);
    }
}

