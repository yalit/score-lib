<?php

namespace App\Library\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\QueryParameter;
use App\Infra\Doctrine\Generator\DoctrineStringUUIDGenerator;
use App\Library\API\Processor\ScorePutProcessor;
use App\Library\API\Provider\LastScoresProvider;
use App\Library\API\Provider\ScorePutProvider;
use App\Library\API\Provider\ScoresProvider;
use App\Library\API\Provider\SearchScoreResultsProvider;
use App\Library\Entity\Enum\ArtistType;
use App\Library\Repository\ScoreRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: ScoreRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/scores/lasts',
            normalizationContext: ["groups" => [Score::SCORE_READ]],
            provider: LastScoresProvider::class,
        ),
        new GetCollection(
            normalizationContext: ["groups" => [Score::SCORE_READ]],
            parameters: [
                'order[:property]' => new QueryParameter(filter: 'score.order_filter')
            ],
            provider: ScoresProvider::class
        ),
        new Get(normalizationContext: ["groups" => [Score::SCORE_READ]]),
        new Post(
            normalizationContext: ["groups" => [Score::SCORE_READ]],
            denormalizationContext: ["groups" => [Score::SCORE_WRITE]],
        ),
        new Post(
            uriTemplate: '/scores/{id}/files',
            inputFormats: ['multipart' => ['multipart/form-data']],
            description: "Upload files to the score",
            normalizationContext: ["groups" => [Score::SCORE_READ]],
            denormalizationContext: ["groups" => [Score::SCORE_WRITE]],
            deserialize: false,
        ),
        new Put(
            normalizationContext: ["groups" => [Score::SCORE_READ]],
            denormalizationContext: ["groups" => [Score::SCORE_WRITE]],
        ),
        new Delete()
    ]
)]
class Score
{
    public const SCORE_READ = 'score:read';
    public const SCORE_WRITE = 'score:write';

    #[ORM\Id]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator(class: DoctrineStringUUIDGenerator::class)]
    #[ORM\Column]
    #[Groups([self::SCORE_READ])]
    /** @phpstan-ignore-next-line  */
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups([self::SCORE_READ, self::SCORE_WRITE])]
    private ?string $title = null;

    #[ORM\OneToOne(targetEntity: ScoreReference::class, cascade: ['persist', 'remove'])]
    #[Groups([self::SCORE_READ, self::SCORE_WRITE])]
    private ScoreReference $reference;

    /**
     * @var Collection<int, ScoreReference>
     */
    #[ORM\OneToMany(targetEntity: ScoreReference::class, mappedBy: 'score', cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[Groups([self::SCORE_READ, self::SCORE_WRITE])]
    private Collection $otherReferences;

    /**
     * @var Collection<int, ScoreCategory>
     */
    #[ORM\ManyToMany(targetEntity: ScoreCategory::class, inversedBy: 'scores', cascade: ['persist', 'remove'])]
    #[Groups([self::SCORE_READ, self::SCORE_WRITE])]
    private Collection $categories;

    /**
     * @var Collection<int, ScoreArtist>
     */
    #[ORM\OneToMany(targetEntity: ScoreArtist::class, mappedBy: 'score', cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[Groups([self::SCORE_READ, self::SCORE_WRITE])]
    private Collection $artists;

    /**
     * @var Collection<int, ScoreFile>
     */
    #[ORM\OneToMany(targetEntity: ScoreFile::class, mappedBy: 'score', cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[Groups([self::SCORE_READ, self::SCORE_WRITE])]
    private Collection $files;

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE, nullable: false)]
    private DateTimeImmutable $createdAt;

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE, nullable: false)]
    private DateTimeImmutable $updatedAt;

    public function __construct()
    {
        $this->otherReferences = new ArrayCollection();
        $this->categories = new ArrayCollection();
        $this->files = new ArrayCollection();

        $this->createdAt = new DateTimeImmutable();
        $this->updatedAt = new DateTimeImmutable();
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

    public function setReference(ScoreReference $scoreReference): void
    {
        $this->reference = $scoreReference;
    }

    public function getReference(): ScoreReference
    {
        return $this->reference;
    }

    /**
     * @return Collection<int, ScoreReference>
     */
    public function getotherReferences(): Collection
    {
        return $this->otherReferences;
    }

    public function addOtherReference(ScoreReference $ref): void
    {
        if (!$this->otherReferences->contains($ref)) {
            $this->otherReferences->add($ref);
            $ref->setScore($this);
        }
    }

    public function removeOtherReference(ScoreReference $ref): void
    {
        if ($this->otherReferences->removeElement($ref)) {
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

    /**
     * @return Collection<int, ScoreArtist>
     */
    public function getComposers(): Collection
    {
        return $this->artists->filter(fn(ScoreArtist $artist) => $artist->getType() == ArtistType::COMPOSER);
    }

    /**
     * @return Collection<int, ScoreArtist>
     */
    public function getLyricists(): Collection
    {
        return $this->artists->filter(fn(ScoreArtist $artist) => $artist->getType() == ArtistType::LYRICIST);
    }

    /**
     * @return Collection<int, ScoreArtist>
     */
    public function getOtherArtists(): Collection
    {
        return $this->artists->filter(fn(ScoreArtist $artist) => $artist->getType() == ArtistType::OTHER);
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

    public function getUpdatedAt(): DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(DateTimeImmutable $updatedAt): void
    {
        $this->updatedAt = $updatedAt;
    }
}
