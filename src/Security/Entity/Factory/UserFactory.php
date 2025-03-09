<?php

namespace App\Security\Entity\Factory;

use App\Security\Entity\Enum\UserRole;
use App\Security\Entity\User;

class UserFactory
{
    public static function createAdmin(string $name, string $email, string $password): User
    {
        return self::getUser($name, $email, $password, UserRole::ADMIN);
    }

    public static function createUser(string $name, string $email, string $password): User
    {
        return self::getUser($name, $email, $password, UserRole::USER);
    }

    private static function getUser(string $name, string $email, string $password, UserRole $role): User
    {
        $user = new User();
        $user->setName($name);
        $user->setEmail($email);
        $user->setPlainPassword($password);
        $user->setRole($role);

        return $user;
    }
}
