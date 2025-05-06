<?php

namespace App\Listing\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\QueryParameter;
use App\Infra\Doctrine\Generator\DoctrineStringUUIDGenerator;
use App\Library\Entity\ScoreArtist;
use App\Listing\Repository\ListingRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Context;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

#[ORM\Entity(repositoryClass: ListingRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => Listing::LISTING_READ],
            parameters: [
                'order[:property]' => new QueryParameter(filter: 'listing.order_filter'),
            ]
        ),
        new Delete(),
        new Get(
            normalizationContext: ['groups' => Listing::LISTING_READ],
        ),
        new Post(
            normalizationContext: ["groups" => [Listing::LISTING_READ]],
            denormalizationContext: ["groups" => [Listing::LISTING_WRITE]],
        ),
        new Put(
            normalizationContext: ["groups" => [Listing::LISTING_READ]],
            denormalizationContext: ["groups" => [Listing::LISTING_WRITE]],
        ),
    ]
)]
class Listing
{
    public const LISTING_READ = "listing_read";
    public const LISTING_WRITE = "listing_write";

    #[ORM\Id]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator(class: DoctrineStringUUIDGenerator::class)]
    #[ORM\Column]
    #[Groups([self::LISTING_READ, self::LISTING_WRITE])]
    /** @phpstan-ignore-next-line */
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups([self::LISTING_READ, self::LISTING_WRITE])]
    private ?string $name = null;

    #[ORM\Column(type: Types::DATE_IMMUTABLE)]
    #[Groups([self::LISTING_READ, self::LISTING_WRITE])]
    #[Context([
        DateTimeNormalizer::FORMAT_KEY => 'Y-m-d',
    ])]
    private DateTimeImmutable $date;

    /**
     * @var Collection<int, ListingScore>
     */
    #[ORM\OneToMany(targetEntity: ListingScore::class, mappedBy: 'listing', cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[ORM\OrderBy(["order" => "ASC"])]
    #[Groups([self::LISTING_READ, self::LISTING_WRITE])]
    private Collection $scores;

    public function __construct()
    {
        $this->scores = new ArrayCollection();
        $this->date = new DateTimeImmutable();
    }

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

    public function getDate(): ?DateTimeImmutable
    {
        return $this->date;
    }

    public function setDate(?DateTimeImmutable $date): void
    {
        $this->date = $date;
    }

    /**
     * @return Collection<int, ScoreArtist>
     */
    public function getScores(): Collection
    {
        return $this->scores;
    }

    public function addScore(ListingScore $score): static
    {
        if (!$this->scores->contains($score)) {
            $this->scores->add($score);
            $score->setListing($this);
        }

        return $this;
    }

    public function removeScore(ListingScore $score): static
    {
        if ($this->scores->removeElement($score)) {
            // set the owning side to null (unless already changed)
            if ($score->getListing() === $this) {
                $score->setListing($this);
            }
        }

        return $this;
    }
}
