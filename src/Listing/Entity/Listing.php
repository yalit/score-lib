<?php

namespace App\Listing\Entity;

use App\Infra\Doctrine\Generator\DoctrineStringUUIDGenerator;
use App\Library\Entity\ScoreArtist;
use App\Listing\Repository\ListingRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ListingRepository::class)]

class Listing
{
    #[ORM\Id]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator(class: DoctrineStringUUIDGenerator::class)]
    #[ORM\Column]
    /** @phpstan-ignore-next-line  */
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

		private DateTimeImmutable $date;
    /**
     * @var Collection<int, ListingScore²>
     */
    #[ORM\OneToMany(targetEntity: ListingScore::class, cascade: ['persist', 'remove'], mappedBy: 'listing')]
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

    public function getDate(): ?string
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
