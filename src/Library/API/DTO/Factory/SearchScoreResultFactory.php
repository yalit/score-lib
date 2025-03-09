<?php

namespace App\Library\API\DTO\Factory;

use App\Library\API\DTO\SearchScoreResult;
use App\Library\Entity\Search\SearchMatching;

class SearchScoreResultFactory
{
    public static function createFromRawTypesenseResult(array $result): SearchScoreResult
    {
        $id = $result['document']['id'];
        $title = $result['document']['title'];

        $matchings = [];

        foreach ($result['highlights'] as $highlight) {
            $field = $highlight['field'];
            $snippet = "";
            if (array_key_exists('snippet', $highlight)) {
                $snippet = $highlight['snippet'];
            } elseif (array_key_exists('snippets', $highlight) && is_array($highlight['snippets']) && count($highlight['snippets']) > 0) {
                $snippet = $highlight['snippets'][0];
            }
            if ($snippet !== "") {
                $matchings[] = new SearchMatching($field, $snippet);
            }
        }

        return new SearchScoreResult($id, $title, $matchings);
    }
}
