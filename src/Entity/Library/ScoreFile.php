<?php

namespace App\Entity\Library;

use App\Doctrine\Generator\DoctrineStringUUIDGenerator;
use App\Repository\Library\ScoreFileRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\CustomIdGenerator;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Serializer\Attribute\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: ScoreFileRepository::class)]
class ScoreFile
{
    #[ORM\Id]
    #[ORM\GeneratedValue('CUSTOM')]
    #[CustomIdGenerator(class: DoctrineStringUUIDGenerator::class)]
    #[ORM\Column]
    private ?string $id = null;

    #[Vich\UploadableField('score_file', fileNameProperty: 'name', size: 'size', mimeType: 'mimeType')]
    private ?UploadedFile $file = null;

    #[ORM\Column(length: 255)]
    #[Groups([Score::SCORE_READ])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $path = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $mimeType = null;

    #[ORM\Column]
    private ?int $size = null;

    #[ORM\ManyToOne(targetEntity: Score::class, inversedBy: 'files')]
    private ?Score $score = null;

    public function __toString(): string
    {
        return $this->name;
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
