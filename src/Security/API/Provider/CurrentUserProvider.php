<?php

namespace App\Security\API\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\Security\API\CurrentUser;
use App\Entity\Security\User;
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

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        /** @var ?User $user */
        $user = $this->security->getUser();

        if (!$user instanceof UserInterface) {
            return null;
        }

        return CurrentUser::fromUser($user);
    }
}
