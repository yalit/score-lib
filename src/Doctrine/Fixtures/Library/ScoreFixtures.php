<?php

namespace DataFixtures\Library;

use App\Library\Entity\Artist;
use App\Library\Entity\Enum\ArtistType;
use App\Library\Entity\Factory\ScoreArtistFactory;
use App\Library\Entity\Factory\ScoreReferenceFactory;
use App\Library\Entity\Score;
use App\Library\Entity\ScoreArtist;
use App\Library\Entity\ScoreCategory;
use App\Library\Entity\ScoreFile;
use App\Library\Entity\ScoreReference;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ScoreFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        for ($i = 1; $i <= 100; $i++) {
            $typeRandom = rand(0, 2);
            $firstArtistType = match ($typeRandom) {
                0 => ArtistType::COMPOSER,
                1 => ArtistType::LYRICIST,
                default => ArtistType::OTHER,
            };

            $secondArtistType = match (($typeRandom + 1) % 3) {
                0 => ArtistType::COMPOSER,
                1 => ArtistType::LYRICIST,
                default => ArtistType::OTHER,
            };

            $score = $this->getScore(
                'Score ' . $i,
                ScoreReferenceFactory::create(chr(rand(65, 90)) . (string) rand(100, 999)),
                [ScoreReferenceFactory::create(chr(rand(65, 90)) . (string) rand(100, 999), sprintf("Information for Score %d", $i))],
                [
                    ScoreArtistFactory::create($firstArtistType, $this->getReference(sprintf(ArtistFixtures::ARTIST_REFERENCE, rand(1, 10)), Artist::class)),
                    ScoreArtistFactory::create($secondArtistType, $this->getReference(sprintf(ArtistFixtures::ARTIST_REFERENCE, rand(1, 10)), Artist::class)),
                ],
                [$this->getReference(sprintf(ScoreCategoryFixtures::SCORE_CATEGORY_REFERENCE, rand(1, 10)), ScoreCategory::class)]
            );
            $manager->persist($score);
        }

        $manager->flush();
    }

    /**
     * @param Array<ScoreReference> $refs
     * @param Array<ScoreArtist> $artists
     * @param Array<ScoreCategory> $categories
     * @param Array<ScoreFile> $files
     */
    private function getScore(
        string $title,
        ScoreReference $reference,
        array $refs = [],
        array $artists = [],
        array $categories = [],
        array $files = [],
    ): Score {
        $score = new Score();
        $score->setTitle($title);
        $score->setReference($reference);
        foreach ($refs as $ref) {
            $score->addOtherReference($ref);
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

