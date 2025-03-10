<?php

namespace App\Library\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Infra\Doctrine\Generator\DoctrineStringUUIDGenerator;
use App\Library\Repository\ScoreCategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: ScoreCategoryRepository::class)]
#[ORM\Index(name: 'score_category_value', columns: ['value'])]
#[ApiFilter(SearchFilter::class, properties: ['value' => 'partial'])]
#[ApiResource(
    operations: [
        new GetCollection(
            paginationEnabled: false,
            normalizationContext: ['groups' => [ScoreCategory::CATEGORY_READ]],
        ),
    ]
)]
class ScoreCategory
{
    public const CATEGORY_READ = 'scoreCategory:read';

    #[ORM\Id]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator(class: DoctrineStringUUIDGenerator::class)]
    #[ORM\Column]
    /** @phpstan-ignore-next-line  */
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups([Score::SCORE_READ, self::CATEGORY_READ, Score::SCORE_WRITE])]
    private ?string $value = null;

    /**
     * @var Collection<int, Score>
     */
    #[ORM\ManyToMany(targetEntity: Score::class, mappedBy: 'categories')]
    private Collection $scores;

    public function __construct()
    {
        $this->scores = new ArrayCollection();
    }

    public function __toString(): string
    {
        return $this->value;
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(string $value): void
    {
        $this->value = $value;
    }

    /**
     * @return Collection<int, Score>
     */
    public function getScores(): Collection
    {
        return $this->scores;
    }

    public function addScore(Score $score): static
    {
        if (!$this->scores->contains($score)) {
            $this->scores->add($score);
        }

        return $this;
    }

    public function removeScore(Score $score): static
    {
        if ($this->scores->removeElement($score)) {
            $score->removeCategory($this);
        }

        return $this;
    }
}
