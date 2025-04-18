<?php

namespace App\Library\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use App\Infra\Doctrine\Generator\DoctrineStringUUIDGenerator;
use App\Library\Repository\ScoreFileRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\CustomIdGenerator;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints\File;

#[ORM\Entity(repositoryClass: ScoreFileRepository::class)]
#[ApiResource(operations: [
    new Get()
])]
class ScoreFile
{
    #[ORM\Id]
    #[ORM\GeneratedValue('CUSTOM')]
    #[CustomIdGenerator(class: DoctrineStringUUIDGenerator::class)]
    #[ORM\Column]
    #[Groups([Score::SCORE_READ])]
    /** @phpstan-ignore-next-line  */
    private ?string $id = null;

    #[File(extensions: ['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg'])]
    private ?UploadedFile $file = null;

    #[ORM\Column(length: 255)]
    #[Groups([Score::SCORE_READ, Score::SCORE_WRITE])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $path = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $mimeType = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups([Score::SCORE_READ])]
    private ?string $extension = null;

    #[ORM\Column]
    private ?int $size = null;

    #[ORM\ManyToOne(targetEntity: Score::class, inversedBy: 'files')]
    private ?Score $score = null;

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

    public function getPath(): ?string
    {
        return $this->path;
    }

    public function setPath(string $path): void
    {
        $this->path = $path;
    }

    public function getMimeType(): ?string
    {
        return $this->mimeType;
    }

    public function setMimeType(?string $mimeType): void
    {
        $this->mimeType = $mimeType;
    }

    public function getSize(): ?int
    {
        return $this->size;
    }

    public function setSize(int $size): void
    {
        $this->size = $size;
    }

    public function getExtension(): ?string
    {
        return $this->extension;
    }

    public function setExtension(?string $extension): void
    {
        $this->extension = $extension;
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

    public function getFile(): ?UploadedFile
    {
        return $this->file;
    }

    public function setFile(?UploadedFile $file): void
    {
        $this->file = $file;
    }
}
