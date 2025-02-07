<?php

namespace App\Form\Library\DataTransformer;

use App\Entity\Library\Factory\ScoreCategoryFactory;
use App\Entity\Library\ScoreCategory;
use App\Entity\Library\ScoreReference;
use App\Repository\Library\ScoreCategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Form\DataTransformerInterface;

/**
 * @implements DataTransformerInterface<ArrayCollection<ScoreCategory>, string>
 */
readonly class TextToScoreCategoriesDataTransformer implements DataTransformerInterface
{
    public function __construct(private readonly ScoreCategoryRepository $repository) {}

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

        return implode(", ", array_map(fn(ScoreCategory $ref) => $ref->getValue(), $value->toArray()));
    }

    /**
     * Transforms a string (number) to an object (scoreReference).
     *
     * @param mixed $value
     * @return ArrayCollection<ScoreReference>
     */
    public function reverseTransform(mixed $value): ArrayCollection
    {

        if (!$value) {
            return new ArrayCollection();
        }

        /** @var ArrayCollection<ScoreCategory> $scoreCategories */
        $scoreCategories = new ArrayCollection();
        foreach(explode(",", $value) as $category) {
            $scoreCategory = $this->repository->find($category);
            
            if (!$scoreCategory) {
                $scoreCategory = ScoreCategoryFactory::create($category);
            }

            $scoreCategories->add($scoreCategory);
        }

        return $scoreCategories;
    }
}

