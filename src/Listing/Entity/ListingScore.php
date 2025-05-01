<?php

namespace App\Listing\Entity;

use App\Infra\Doctrine\Generator\DoctrineStringUUIDGenerator;
use App\Library\Entity\Score;
use App\Library\Entity\ScoreArtist;
use App\Listing\Repository\ListingScoreRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: ListingScoreRepository::class)]
class ListingScore
{
    #[ORM\Id]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator(class: DoctrineStringUUIDGenerator::class)]
    #[ORM\Column]
		#[Groups([Listing::LISTING_READ])]
    /** @phpstan-ignore-next-line  */
    private ?string $id = null;

    #[ORM\Column(length: 255)]
		#[Groups([Listing::LISTING_READ])]
    private ?string $name = null;

    /**
     * @var Collection<int, Score>
     */
    #[ORM\ManyToOne(targetEntity: Score::class)]
		#[Groups([Listing::LISTING_READ])]
    private Score $score;

    /**
     * @var Collection<int, Listing>
     */
    #[ORM\ManyToOne(targetEntity: Listing::class)]
    private Listing $listing;

    public function __toString(): string
    {
        return $this->name ?? "";
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getListing(): ?Listing
    {
        return $this->listing;
    }

    public function setListing(?Listing $listing): void
    {
        $this->listing = $listing;
    }

    public function getScore(): ?Score
    {
        return $this->score;
    }

    public function setScore(?Score $score): void
    {
        $this->score = $score;
    }

}
