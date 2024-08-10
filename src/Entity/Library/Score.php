<?php

namespace App\Entity\Library;

use App\Doctrine\Generator\DoctrineStringUUIDGenerator;
use App\Repository\Library\ScoreRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ScoreRepository::class)]
class Score
{
    public const GROUP_READ = 'score:read';

    #[ORM\Id]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator(class: DoctrineStringUUIDGenerator::class)]
    #[ORM\Column]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 1028, nullable: true)]
    private ?string $description = null;

    /**
     * @var Collection<int, ScoreReference>
     */
    #[ORM\OneToMany(targetEntity: ScoreReference::class, mappedBy: 'score', cascade: ['persist'], orphanRemoval: true)]
    private Collection $refs;

    /**
     * @var Collection<int, ScoreCategory>
     */
    #[ORM\ManyToMany(targetEntity: ScoreCategory::class, inversedBy: 'scores', cascade: ['persist'])]
    private Collection $categories;

    /**
     * @var Collection<int, ScoreFile>
     */
    #[ORM\OneToMany(targetEntity: ScoreFile::class, mappedBy: 'score', cascade: ['persist'], orphanRemoval: true)]
    private Collection $files;

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE, nullable: false)]
    private DateTimeImmutable $createdAt;

    /**
     * @var Collection<int, ScoreArtist>
     */
    #[ORM\OneToMany(targetEntity: ScoreArtist::class, mappedBy: 'score', cascade: ['persist'], orphanRemoval: true)]
    private Collection $artists;

    #[ORM\OneToOne(targetEntity: ScoreReference::class, inversedBy: 'mainScore', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?ScoreReference $mainReference = null;

    public function __construct()
    {
        $this->refs = new ArrayCollection();
        $this->categories = new ArrayCollection();
        $this->files = new ArrayCollection();

        $this->createdAt = new DateTimeImmutable();
        $this->artists = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    /**
     * @return Collection<int, ScoreReference>
     */
    public function getRefs(): Collection
    {
        return $this->refs;
    }

    public function addRef(ScoreReference $ref):  void
    {
        if (!$this->refs->contains($ref)) {
            $this->refs->add($ref);
            $ref->setScore($this);
        }
    }

    public function removeRef(ScoreReference $ref):  void
    {
        if ($this->refs->removeElement($ref)) {
            // set the owning side to null (unless already changed)
            if ($ref->getScore() === $this) {
                $ref->setScore(null);
            }
        }
    }
    
    /**
     * @return Collection<int, ScoreCategory>
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(ScoreCategory $category): void
    {
        if (!$this->categories->contains($category)) {
            $this->categories->add($category);
            $category->addScore($this);
        }
    }

    public function removeCategory(ScoreCategory $category): void
    {
        $this->categories->removeElement($category);
    }

    /**
     * @return Collection<int, ScoreFile>
     */
    public function getFiles(): Collection
    {
        return $this->files;
    }

    public function addFile(ScoreFile $file): void
    {
        if (!$this->files->contains($file)) {
            $this->files->add($file);
            $file->setScore($this);
        }
    }

    public function removeFile(ScoreFile $file): void
    {
        if ($this->files->removeElement($file)) {
            // set the owning side to null (unless already changed)
            if ($file->getScore() === $this) {
                $file->setScore(null);
            }
        }
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTimeImmutable $createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    /**
     * @return Collection<int, ScoreArtist>
     */
    public function getArtists(): Collection
    {
        return $this->artists;
    }

    public function addArtist(ScoreArtist $artist): static
    {
        if (!$this->artists->contains($artist)) {
            $this->artists->add($artist);
            $artist->setScore($this);
        }

        return $this;
    }

    public function removeArtist(ScoreArtist $artist): static
    {
        if ($this->artists->removeElement($artist)) {
            // set the owning side to null (unless already changed)
            if ($artist->getScore() === $this) {
                $artist->setScore(null);
            }
        }

        return $this;
    }

    public function getMainReference(): ?ScoreReference
    {
        return $this->mainReference;
    }

    public function setMainReference(ScoreReference $mainReference): static
    {
        $this->mainReference = $mainReference;
        if ($mainReference->getMainScore() !== $this) {
            $mainReference->setMainScore($this);
        }

        return $this;
    }
}
