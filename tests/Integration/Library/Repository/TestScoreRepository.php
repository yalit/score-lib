<?php

namespace App\Tests\Integration\Library\Repository;

use App\Library\Repository\ScoreRepository;
use DateInterval;
use DateTimeImmutable;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class TestScoreRepository extends KernelTestCase
{
    private ScoreRepository $repository;
    protected function setUp(): void
    {
        static::bootKernel();
        // @phpstan-ignore-next-line
        $this->repository = static::getContainer()->get(ScoreRepository::class);
    }

    public function testFindAll(): void
    {
        $allScores = $this->repository->findAll();

        self::assertCount(100, $allScores);
    }

    public function testFindAllFromLastSevenDays(): void
    {
        $allScores = $this->repository->findAll();
        $sevenDaysAgo = (new DateTimeImmutable('now'))->sub(new DateInterval('P7D'))->setTime(0, 0);
        $allScoresInLastSevenDays = array_filter($allScores, function ($score) use ($sevenDaysAgo) {
            return $score->getCreatedAt() >= $sevenDaysAgo;
        });

        $nbScoresInLastSevenDaysFromRepository = $this->repository->findAllScoresInLastSevenDays();
        self::assertEquals(count($allScoresInLastSevenDays), $nbScoresInLastSevenDaysFromRepository);
    }
}
