<?php

namespace App\Tests\Functional;

use SecurityFixtures\SecurityUserFixtures;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

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
    }

    protected function logIn(string $username): void
    {
        $this->client->request('GET', '/login');
        $this->client->submitForm('login', [
            '_username' => $username.'@email.com',
            '_password' => SecurityUserFixtures::PASSWORD
        ]);
        self::assertResponseRedirects();
        $this->client->followRedirect();
        self::assertResponseIsSuccessful();
    }
}
