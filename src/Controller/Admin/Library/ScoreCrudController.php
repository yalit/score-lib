<?php

namespace App\Controller\Admin\Library;

use App\Entity\Library\Score;
use App\Form\Library\ScoreCategoryFormType;
use App\Form\Library\ScoreFileFormType;
use App\Form\Library\ScoreReferenceFormType;
use App\Library\Form\ScoreArtistFormType;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\CollectionField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class ScoreCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Score::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return parent::configureCrud($crud)
            ->setEntityLabelInSingular('entity.score.label.singular')
            ->setEntityLabelInPlural('entity.score.label.plural')
        ;

    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('title', 'entity.score.fields.title.label'),
            TextField::new('description', 'entity.score.fields.description.label'),
            AssociationField::new('mainReference', 'entity.score.fields.mainReference.label'),
            CollectionField::new('refs', 'entity.score.fields.refs.label')
                ->setEntryType(ScoreReferenceFormType::class)
                ->setFormTypeOption('by_reference', false),
            CollectionField::new('artists', 'entity.score.fields.artists.label')
                ->setEntryType(ScoreArtistFormType::class)
                ->setFormTypeOption('by_reference', false),
            CollectionField::new('categories', 'entity.score.fields.categories.label')
                ->setEntryType(ScoreCategoryFormType::class)
                ->setFormTypeOption('by_reference', false),
            CollectionField::new('files', 'entity.score.fields.files.label')
                ->setEntryType(ScoreFileFormType::class)
                ->setFormTypeOption('by_reference', false)
        ];
    }
}
