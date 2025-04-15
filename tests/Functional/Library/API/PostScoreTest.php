<?php

namespace App\Tests\Functional\Library\API;

use App\Tests\Functional\AppWebTestCase;
use Symfony\Component\Mime\Part\DataPart;
use Symfony\Component\Mime\Part\Multipart\FormDataPart;

class PostScoreTest extends AppWebTestCase
{
    public function testPostScoreCreation(): void
    {
        $this->logIn('admin');
        $data = new FormDataPart([
            'title' => 'Title',
        ]);

        $this->client->request('POST', '/api/scores', [
            'headers' => $data->getPreparedHeaders()->toArray(),
            'data' => $data->bodyToString(),
            'file' => DataPart::fromPath(__DIR__ . '/Files/test_score.pdf', 'test_score.pdf')->bodyToString()
        ]);
    }
}
