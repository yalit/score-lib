<?php

namespace DataFixtures\Library;

use App\Entity\Library\Artist;
use App\Entity\Library\Enum\ArtistType;
use App\Entity\Library\Factory\ScoreArtistFactory;
use App\Entity\Library\Factory\ScoreReferenceFactory;
use App\Entity\Library\Score;
use App\Entity\Library\ScoreArtist;
use App\Entity\Library\ScoreCategory;
use App\Entity\Library\ScoreFile;
use App\Entity\Library\ScoreReference;
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
                'A description for Score ' . $i,
                [ScoreReferenceFactory::create(chr(rand(65, 90)) . (string) rand(100, 999))],
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
        string $description,
        array $refs = [],
        array $artists = [],
        array $categories = [],
        array $files = [],
    ): Score {
        $score = new Score();
        $score->setTitle($title);
        $score->setDescription($description);
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
