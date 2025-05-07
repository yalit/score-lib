<?php

namespace App\Tests\Functional\Security\Authenticator;

use App\Fixtures\Security\SecurityUserFixtures;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Bundle\SecurityBundle\Security;

class UserPasswordAuthenticatorTest extends WebTestCase
{
    public function testCorrectAuthentication(): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/login');
        $form = $crawler->selectButton('Login')->form();
        $form['_username'] = sprintf(SecurityUserFixtures::USER_EMAIL, SecurityUserFixtures::ADMIN_NAME);
        $form['_password'] = SecurityUserFixtures::PASSWORD;
        $client->submit($form);
        self::assertResponseRedirects();
        $client->followRedirect();
        self::assertResponseIsSuccessful();
        self::assertRouteSame('app_index');

        $security = static::getContainer()->get(Security::class);
        $user = $security->getUser();

        self::assertNotNull($user);
    }

    public function testAuthenticatorRedirectsToCorrectPath(): void
    {
        $client = static::createClient();
        $client->request('GET', '/library');
        self::assertResponseRedirects("/login");
        $crawler = $client->followRedirect();
        self::assertResponseIsSuccessful();

        self::assertRouteSame('app_login');

        $form = $crawler->selectButton('Login')->form();
        $form['_username'] = sprintf(SecurityUserFixtures::USER_EMAIL, SecurityUserFixtures::ADMIN_NAME);
        $form['_password'] = SecurityUserFixtures::PASSWORD;
        $client->submit($form);
        self::assertResponseRedirects('/library');
        $client->followRedirect();
        self::assertResponseIsSuccessful();
        self::assertRouteSame('app_library_index');
    }

    public function testAuthenticationDoesNotRedirectForApiUrls(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/listings');
        self::assertResponseRedirects("/login");
        $crawler = $client->followRedirect();
        self::assertResponseIsSuccessful();

        self::assertRouteSame('app_login');

        $form = $crawler->selectButton('Login')->form();
        $form['_username'] = sprintf(SecurityUserFixtures::USER_EMAIL, SecurityUserFixtures::ADMIN_NAME);
        $form['_password'] = SecurityUserFixtures::PASSWORD;
        $client->submit($form);
        self::assertResponseRedirects('/');
        $client->followRedirect();
        self::assertResponseIsSuccessful();
        self::assertRouteSame('app_index');
    }
}
