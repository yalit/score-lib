<?php

namespace App\Library\API\Listener;

use ApiPlatform\Symfony\EventListener\DeserializeListener as DecoratedListener;
use App\Library\Entity\Score;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\RequestEvent;

readonly class DeserializeListener
{
    public function __construct(
        private DecoratedListener      $decoratedListener,
        private ScoreMultipartListener $scoreListener
    )
    {
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        $request = $event->getRequest();

        if ($request->isMethodCacheable() || $request->isMethod(Request::METHOD_DELETE)) {
            return;
        }

        if ($request->isMethod(Request::METHOD_POST) && $request->attributes->has('_api_resource_class') && $request->attributes->has('data')) {
            $class = $request->attributes->get('_api_resource_class');
            match ($class) {
                Score::class => $this->scoreListener->handleRequest($request),
                default => throw new \RuntimeException('Unexpected API resource class')
            };
        } else {
            $this->decoratedListener->onKernelRequest($event);
        }
    }

}
