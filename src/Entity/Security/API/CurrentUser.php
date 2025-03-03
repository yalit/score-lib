<?php

namespace App\Entity\Security\API;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use App\Entity\Security\User;
use App\Security\API\Provider\CurrentUserProvider;

#[ApiResource(
    operations: [new Get(provider: CurrentUserProvider::class)]
)]
class CurrentUser
{
    public string $name;
    /**
     * @var array<string> $roles
     */
    public array $roles;

    public static function fromUser(User $user): CurrentUser
    {
        $self = new self();
        $self->name = $user->getName();
        $self->roles = $user->getRoles();
        return $self;
    }
}
