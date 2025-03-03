<?php

namespace App\Entity\Security;

use App\Doctrine\Generator\DoctrineStringUUIDGenerator;
use App\Entity\Security\Enum\UserRole;
use App\Repository\Security\UserRepository;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\CustomIdGenerator;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Table;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[Entity(repositoryClass: UserRepository::class)]
#[Table(name: 'app_user')]
class User implements PasswordAuthenticatedUserInterface, UserInterface
{
    #[Id]
    #[Column(type: 'string', length: 128)]
    #[GeneratedValue('CUSTOM')]
    #[CustomIdGenerator(class: DoctrineStringUUIDGenerator::class)]
    private ?string $id = null;

    #[Column(type: 'string', length: 128)]
    private string $name;

    #[Column(type: 'string', length: 128)]
    private string $email;

    #[Column(type: 'string', length: 128, enumType: UserRole::class)]
    private UserRole $role;

    #[Column(type: 'string', length: 128)]
    private ?string $password = null;

    private ?string $plainPassword = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getRole(): UserRole
    {
        return $this->role;
    }

    public function setRole(UserRole $role): void
    {
        $this->role = $role;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(?string $password): void
    {
        $this->password = $password;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): void
    {
        $this->plainPassword = $plainPassword;
    }

    public function getRoles(): array
    {
        $roles = ['ROLE_USER'];

        $additionalRoles = match ($this->role) {
            UserRole::ADMIN => ['ROLE_ADMIN'],
            default => [],
        };

        return array_merge($roles, $additionalRoles);
    }

    public function eraseCredentials(): void
    {
        $this->plainPassword = null;
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }
}
