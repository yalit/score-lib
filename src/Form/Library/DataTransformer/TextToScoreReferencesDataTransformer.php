<?php

namespace App\Form\Library\DataTransformer;

use App\Entity\Library\Factory\ScoreReferenceFactory;
use App\Entity\Library\ScoreReference;
use App\Repository\Library\ScoreReferenceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Form\DataTransformerInterface;

/**
 * @implements DataTransformerInterface<ArrayCollection<ScoreReference>, string>
 */
readonly class TextToScoreReferencesDataTransformer implements DataTransformerInterface
{
  /**
     * Transforms an object (ScoreReference) to a string (number).
     *
     * @param  ArrayCollection<ScoreReference>|null $value
     */
    public function transform(mixed $value): string
    {
        if (null === $value) {
            return '';
        }

        return implode(", ", array_map(fn(ScoreReference $ref) => $ref->getValue(), $value->toArray()));
    }

    /**
     * Transforms a string (number) to an object (scoreReference).
     *
     * @param mixed $value
     * @return ArrayCollection<ScoreReference>
     */
    public function reverseTransform(mixed $value): ArrayCollection
    {
        $scoreReferences = new ArrayCollection();

        if ($value) {
            foreach(explode(",", $value) as $reference) {
                $scoreReferences->add(ScoreReferenceFactory::create(trim($reference)));
            }
        }

        return $scoreReferences;
    }
}

