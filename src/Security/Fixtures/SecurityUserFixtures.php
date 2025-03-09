<?php

namespace SecurityFixtures;

use App\Security\Entity\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class SecurityUserFixtures extends Fixture
{
    public const ADMIN_NAME = 'admin';
    public const USER_NAME = 'user';
    public const SET_MANAGER_NAME = 'set_manager';

    public const USER_EMAIL = '%s@email.com';
    public const USER_REFERENCE = 'user_%s';

    public const PASSWORD = 'Password123)';

    /**
     * @inheritDoc
     */
    public function load(ObjectManager $manager): void
    {
        $admin = UserFactory::createAdmin(self::ADMIN_NAME, sprintf(self::USER_EMAIL, self::ADMIN_NAME), self::PASSWORD);
        $manager->persist($admin);
        $this->addReference(sprintf(self::USER_REFERENCE, self::ADMIN_NAME), $admin);

        for ($i = 1; $i <= 5; $i++) {
            $userName = sprintf(self::USER_NAME . $i);
            $user = UserFactory::createUser($userName, sprintf(self::USER_EMAIL, $userName), self::PASSWORD);
            $manager->persist($user);
            $this->addReference(sprintf(self::USER_REFERENCE, $userName), $user);
        }

        $manager->flush();
    }
}
