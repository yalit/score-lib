<?php

namespace App\Library\Entity;

use App\Infra\Doctrine\Generator\DoctrineStringUUIDGenerator;
use App\Library\Repository\ScoreReferenceRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\NotNull;

#[ORM\Entity(repositoryClass: ScoreReferenceRepository::class)]
class ScoreReference
{
    #[ORM\Id]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator(class: DoctrineStringUUIDGenerator::class)]
    #[ORM\Column]
    /** @phpstan-ignore-next-line  */
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[NotBlank]
    #[NotNull]
    #[Groups([Score::SCORE_READ, Score::SCORE_WRITE])]
    private ?string $value = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups([Score::SCORE_READ, Score::SCORE_WRITE])]
    private ?string $information = null;

    #[ORM\ManyToOne(inversedBy: 'otherReferences')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Score $score = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function __toString(): string
    {
        return $this->value ?? '';
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(string $value): void
    {
        $this->value = $value;
    }

    public function getInformation(): ?string
    {
        return $this->information;
    }

    public function setInformation(?string $information): void
    {
        $this->information = $information;
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
}
