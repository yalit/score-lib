<?php

namespace App\Entity\Library;

use App\Entity\Library\Enum\ArtistType;
use App\Repository\Score\ScoreArtistRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ScoreArtistRepository::class)]
class ScoreArtist
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'artists')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Score $score = null;

    #[ORM\ManyToOne(inversedBy: 'scores')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Artist $artist = null;

    #[ORM\Column(type: Types::STRING, length: 255, enumType: ArtistType::class)]
    private ArtistType $type;

    public function __toString(): string
    {
        return sprintf('%s (%s)', $this->artist->getName(), $this->type->value);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getScore(): ?Score
    {
        return $this->score;
    }

    public function setScore(?Score $score): static
    {
        $this->score = $score;

        return $this;
    }

    public function getArtist(): ?Artist
    {
        return $this->artist;
    }

    public function setArtist(?Artist $artist): static
    {
        $this->artist = $artist;

        return $this;
    }

    public function getType(): ArtistType
    {
        return $this->type;
    }

    public function setType(ArtistType $type): void
    {
        $this->type = $type;
    }
}