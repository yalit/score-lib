<?php

namespace App\Voter\Security;

use App\Entity\Security\Enum\UserRole;
use App\Entity\Security\User;
use App\Voter\AbstractCrudVoter;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

/**
 * User CRUD voter.
 * @template-extends AbstractCrudVoter<User>
 */
class UserCrudVoter extends AbstractCrudVoter
{
    protected function supportsSubject(mixed $subject): bool
    {
        if (null === $subject) {
            return true;
        }

        return $subject instanceof User;
    }

    /**
     * @param User $subject
     */
    protected function voteOnCreate(TokenInterface $token, mixed $subject): bool
    {
        return $this->voteOnCrud($this->getUser($token), $subject);
    }

    /**
     * @param User $subject
     */
    protected function voteOnRead(TokenInterface $token, mixed $subject): bool
    {
        return $this->voteOnCrud($this->getUser($token), $subject);
    }

    /**
     * @param User $subject
     */
    protected function voteOnUpdate(TokenInterface $token, mixed $subject): bool
    {
        return $this->voteOnCrud($this->getUser($token), $subject);
    }

    /**
     * @param User $subject
     */
    protected function voteOnDelete(TokenInterface $token, mixed $subject): bool
    {
        return $this->voteOnCrud($this->getUser($token), $subject);
    }

    private function voteOnCrud(?User $loggedInUser, ?User $subject): bool
    {
        if (null === $loggedInUser) {
            return false;
        }

        if ($this->isAdmin($loggedInUser)) {
            return true;
        }

        if (null === $subject) {
            return true;
        }

        return $loggedInUser->getId() === $subject->getId();
    }

    private function getUser(TokenInterface $token): ?User
    {
        /** @var ?User $user */
        $user = $token->getUser();
        return $user;
    }

    private function isAdmin(User $user): bool
    {
        return $user->getRole() === UserRole::ADMIN;
    }
}
