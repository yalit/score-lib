<?php

namespace DataFixtures\Library;

use App\Library\Entity\ScoreCategory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ScoreCategoryFixtures extends Fixture
{
    public const SCORE_CATEGORY_REFERENCE = 'score-category_%s';

    /**
     * @inheritDoc
     */
    public function load(ObjectManager $manager): void
    {
        for ($i = 1; $i <= 10; $i++) {
            $scoreCategory = new ScoreCategory();
            $scoreCategory->setValue('Category ' . $i);
            $manager->persist($scoreCategory);
            $this->addReference(sprintf(self::SCORE_CATEGORY_REFERENCE, $i), $scoreCategory);
        }

        $manager->flush();
    }
}
