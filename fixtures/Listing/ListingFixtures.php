<?php

namespace App\Fixtures\Listing;

use App\Fixtures\Library\ScoreFixtures;
use App\Library\Entity\Score;
use App\Listing\Entity\Listing;
use App\Listing\Entity\ListingScore;
use DateInterval;
use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ListingFixtures extends Fixture implements DependentFixtureInterface
{
    public const NB_LISTING = 10;

    public function load(ObjectManager $manager): void
    {
        for ($i = 0; $i < self::NB_LISTING; $i++) {
            $scores = [];
            $nbScores = rand(1, self::NB_LISTING);
            for ($j = 0; $j < $nbScores; $j++) {
                $scores[] = $this->getListingScore(
                    sprintf("Listing %d - Score %d", $i, $j),
                    $this->getReference(sprintf("%s%d",ScoreFixtures::REFERENCE_PREFIX, rand(1, ScoreFixtures::NB_SCORES)), Score::class),
                    $nbScores - $j
                );
            }
            $score = $this->getScore(
                sprintf("Listing %d", $i),
                (new DateTimeImmutable())->sub(new DateInterval(sprintf("P%dD", rand(1,10)))),
                $scores
            );
            $manager->persist($score);
        }
        $manager->flush();
    }

    /**
     * @param Array<ListingScore> $scores
     */
    private function getScore(
        string            $name,
        DateTimeImmutable $date,
        array             $scores = [],
    ): Listing {
        $listing = new Listing();
        $listing->setName($name);
        $listing->setDate($date);
        foreach ($scores as $score) {
            $listing->addScore($score);
        }
        return $listing;
    }

    private function getListingScore(
        string $name,
        Score $score,
        int $order
    ): ListingScore {
        $listingScore = new ListingScore();
        $listingScore->setScore($score);
        $listingScore->setName($name);
        $listingScore->setOrder($order);
        return $listingScore;
    }

    /**
     * @return string[]
     */
    public function getDependencies(): array
    {
        return [
            ScoreFixtures::class,
        ];
    }
}
