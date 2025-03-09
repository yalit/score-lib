<?php

namespace App\Security\Entity\API;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use App\Security\API\Provider\CurrentUserProvider;
use App\Security\Entity\User;

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
