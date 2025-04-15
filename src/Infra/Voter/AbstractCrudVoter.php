<?php

namespace App\Infra\Voter;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

/**
 * Abstract CRUD voter.
 * @template T
 * @extends Voter<string, T>
 */
abstract class AbstractCrudVoter extends Voter
{
    public const CREATE = 'create';
    public const READ = 'read';
    public const UPDATE = 'update';
    public const DELETE = 'delete';

    protected function supports(string $attribute, mixed $subject): bool
    {
        return in_array($attribute, [self::CREATE, self::READ, self::UPDATE, self::DELETE], true)
            && $this->supportsSubject($subject);
    }

    /**
     * Ensure that the subject is supported by the voter.
     */
    abstract protected function supportsSubject(mixed $subject): bool;

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        return match ($attribute) {
            self::CREATE => $this->voteOnCreate($token, $subject),
            self::READ => $this->voteOnRead($token, $subject),
            self::UPDATE => $this->voteOnUpdate($token, $subject),
            self::DELETE => $this->voteOnDelete($token, $subject),
            default => false,
        };
    }

    /**
     * Vote on the create action.
     * @param T $subject
     */
    abstract protected function voteOnCreate(TokenInterface $token, mixed $subject): bool;

    /**
     * Vote on the read action.
     * @param T $subject
     */
    abstract protected function voteOnRead(TokenInterface $token, mixed $subject): bool;

    /**
     * Vote on the update action.
     * @param T $subject
     */
    abstract protected function voteOnUpdate(TokenInterface $token, mixed $subject): bool;

    /**
     * Vote on the delete action.
     * @param T $subject
     */
    abstract protected function voteOnDelete(TokenInterface $token, mixed $subject): bool;
}
