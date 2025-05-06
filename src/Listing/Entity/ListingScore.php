<?php

namespace App\Listing\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use App\Infra\Doctrine\Generator\DoctrineStringUUIDGenerator;
use App\Library\Entity\Score;
use App\Listing\Repository\ListingScoreRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\PositiveOrZero;

#[ORM\Entity(repositoryClass: ListingScoreRepository::class)]
#[ApiResource(
    uriTemplate: '/listings/{listingId}/score/{id}',
    operations: [new Get()],
    uriVariables: [
        'listingId' => new Link(
            fromProperty: 'scores',
            fromClass: Listing::class
        ),
        'id' => new Link(
            fromClass: ListingScore::class
        )
    ]
)]
class ListingScore
{
    #[ORM\Id]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator(class: DoctrineStringUUIDGenerator::class)]
    #[ORM\Column]
    #[Groups([Listing::LISTING_READ, Listing::LISTING_WRITE])]
    #[ApiProperty(identifier: true)]
    /** @phpstan-ignore-next-line */
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups([Listing::LISTING_READ, Listing::LISTING_WRITE])]
    private ?string $name = null;

    #[ORM\ManyToOne(targetEntity: Score::class)]
    #[Groups([Listing::LISTING_READ, Listing::LISTING_WRITE])]
    private Score $score;

    #[ORM\ManyToOne(targetEntity: Listing::class)]
    private Listing $listing;

    #[ORM\Column(name: 'score_order', type: Types::INTEGER, length: 255)]
    #[Groups([Listing::LISTING_READ, Listing::LISTING_WRITE])]
    #[PositiveOrZero]
    #[NotBlank]
    private ?int $order;

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

    public function getListing(): Listing
    {
        return $this->listing;
    }

    public function setListing(Listing $listing): void
    {
        $this->listing = $listing;
    }

    public function getScore(): Score
    {
        return $this->score;
    }

    public function setScore(Score $score): void
    {
        $this->score = $score;
    }

    public function getOrder(): ?int
    {
        return $this->order;
    }

    public function setOrder(?int $order): void
    {
        $this->order = $order;
    }
}
