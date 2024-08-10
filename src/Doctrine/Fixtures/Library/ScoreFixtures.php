<?php

namespace DataFixtures\Library;

use App\Entity\Library\Artist;
use App\Entity\Library\Enum\ArtistType;
use App\Entity\Library\Score;
use App\Entity\Library\ScoreArtist;
use App\Entity\Library\ScoreReference;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ScoreFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        for ($i = 1; $i <= 10; $i++) {
            $typeRandom = rand(0,2);
            $firstArtistType = match($typeRandom) {
                0 => ArtistType::COMPOSER,
                1 => ArtistType::LYRICIST,
                default => ArtistType::OTHER,
            };

            $secondArtistType = match(($typeRandom + 1) % 3) {
                0 => ArtistType::COMPOSER,
                1 => ArtistType::LYRICIST,
                default => ArtistType::OTHER,
            };

            $score = $this->getScore(
                'Score ' . $i,
                '',
                $this->getScoreReference(chr(rand(65,90)).(string)rand(100,999)),
                [$this->getScoreReference(chr(rand(65,90)).(string)rand(100,999))],
                [
                    $this->getScoreArtist(
                        $this->getReference(sprintf(ArtistFixtures::ARTIST_REFERENCE, rand(1,10))),
                        $firstArtistType
                    ),
                    $this->getScoreArtist(
                        $this->getReference(sprintf(ArtistFixtures::ARTIST_REFERENCE, rand(1,10))),
                        $secondArtistType
                    )
                ],
                [$this->getReference(sprintf(ScoreCategoryFixtures::SCORE_CATEGORY_REFERENCE, rand(1,10)))]
            );
            $manager->persist($score);
        }

        $manager->flush();
    }

    private function getScoreReference(string $value): ScoreReference
    {
        $reference = new ScoreReference();
        $reference->setValue($value);
        return $reference;
    }

    private function getScore(
        string  $title,
        string $description,
        ScoreReference $mainReference,
        array   $refs = [],
        array   $artists = [],
        array   $categories = [],
        array   $files = [],
    ): Score
    {
        $score = new Score();
        $score->setTitle($title);
        $score->setDescription($description);
        $score->setMainReference($mainReference);
        foreach ($refs as $ref) {
            $score->addRef($ref);
        }

        foreach ($artists as $artist) {
            $score->addArtist($artist);
        }

        foreach ($categories as $category) {
            $score->addCategory($category);
        }

        foreach ($files as $file) {
            $score->addFile($file);
        }

        return $score;
    }

    private function getScoreArtist(Artist $artist, ArtistType $type): ScoreArtist
    {
        $scoreArtist = new ScoreArtist();
        $scoreArtist->setArtist($artist);
        $scoreArtist->setType($type);
        return $scoreArtist;
    }

    /**
     * @return string[]
     */
    public function getDependencies(): array
    {
        return [
            ScoreCategoryFixtures::class,
            ArtistFixtures::class
        ];
    }
}
