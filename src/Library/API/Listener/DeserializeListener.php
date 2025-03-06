<?php

namespace App\Library\API\Listener;

use ApiPlatform\State\SerializerContextBuilderInterface;
use ApiPlatform\State\Util\RequestAttributesExtractor;
use ApiPlatform\Symfony\EventListener\DeserializeListener as DecoratedListener;
use App\Entity\Library\Score;
use App\Entity\Library\ScoreFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

readonly class DeserializeListener
{
    public function __construct(
        private DecoratedListener                 $decoratedListener,
        private SerializerContextBuilderInterface $serializerContextBuilder,
        private DenormalizerInterface             $denormalizer,
    )
    {
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        $request = $event->getRequest();

        if ($request->isMethodCacheable() || $request->isMethod(Request::METHOD_DELETE)) {
            $this->decoratedListener->onKernelRequest($event);
            return;
        }

        if (!($request->attributes->has('_api_resource_class') && $request->attributes->get('_api_resource_class') === Score::class)) {
            $this->decoratedListener->onKernelRequest($event);
        } else {
            $this->denormalizeScore($request);
        }
    }

    private function denormalizeScore(Request $request): void
    {
        $attributes = RequestAttributesExtractor::extractAttributes($request);
        if (empty($attributes)) {
            return;
        }

        $context = $this->serializerContextBuilder->createFromRequest($request, false, $attributes);

        $data = $request->request->all();
        $files = $request->files->all();

        $object = $this->denormalizer->denormalize($data, $attributes['resource_class'], null, $context);

        foreach ($files as $uploadedFile) {
            $file = new ScoreFile();
            $file->setFile($uploadedFile);
            $object->addFile($file);
        }

        $request->attributes->set('data', $object);
    }
}
