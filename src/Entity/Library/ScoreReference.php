<?php

namespace App\Entity\Library;

use App\Doctrine\Generator\DoctrineStringUUIDGenerator;
use App\Repository\Library\ScoreReferenceRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\NotNull;

#[ORM\Entity(repositoryClass: ScoreReferenceRepository::class)]
class ScoreReference
{
    #[ORM\Id]
    #[ORM\GeneratedValue('CUSTOM')]
    #[ORM\CustomIdGenerator(class: DoctrineStringUUIDGenerator::class)]
    #[ORM\Column]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[NotBlank]
    #[NotNull]
    private ?string $value = null;

    #[ORM\ManyToOne(inversedBy: 'refs')]
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
