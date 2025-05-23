<?php

namespace App\Security\API\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Security\Entity\API\CurrentUser;
use App\Security\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @implements ProviderInterface<CurrentUser>
 */
final readonly class CurrentUserProvider implements ProviderInterface
{
    public function __construct(private Security $security)
    {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|null
    {
        /** @var ?User $user */
        $user = $this->security->getUser();

        if (!$user instanceof UserInterface) {
            return null;
        }

        return CurrentUser::fromUser($user);
    }
}
