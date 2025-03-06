<?php

namespace App\Tests\Functional;

use App\Entity\Security\User;
use App\Repository\Security\UserRepository;
use DataFixtures\Security\SecurityUserFixtures;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\BrowserKit\Cookie;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;

class AppWebTestCase extends WebTestCase
{
    protected KernelBrowser $client;

    protected function setUp(): void
    {
        parent::setUp();
        $this->client = static::createClient();
    }

    protected function tearDown(): void
    {
        parent::tearDown();
        self::ensureKernelShutdown();
        unset($this->client);
    }

    protected function logIn(string $username): void
    {
        $this->client->request('GET', '/login');
        $this->client->submitForm('Login', [
            '_username' => $username.'@email.com',
            '_password' => SecurityUserFixtures::PASSWORD
        ]);
        self::assertResponseRedirects();
        $this->client->followRedirect();
        self::assertResponseIsSuccessful();
    }
}
