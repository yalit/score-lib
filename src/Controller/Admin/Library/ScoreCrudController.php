<?php

namespace App\Controller\Admin\Library;

use App\Entity\Library\Score;
use App\Library\Form\ScoreArtistFormType;
use App\Library\Form\ScoreCategoryType;
use App\Library\Form\ScoreFileType;
use App\Library\Form\ScoreReferenceType;
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
                ->allowAdd()
                ->allowDelete()
                ->setEntryType(ScoreReferenceType::class)
                ->setFormTypeOption('by_reference', false),
            CollectionField::new('artists', 'entity.score.fields.artists.label')
                ->allowAdd()
                ->allowDelete()
                ->setEntryType(ScoreArtistFormType::class)
                ->setFormTypeOption('by_reference', false),
            CollectionField::new('categories', 'entity.score.fields.categories.label')
                ->allowAdd()
                ->allowDelete()
                ->setEntryType(ScoreCategoryType::class)
                ->setFormTypeOption('by_reference', false),
            CollectionField::new('files', 'entity.score.fields.files.label')
                ->allowAdd()
                ->allowDelete()
                ->setEntryType(ScoreFileType::class)
                ->setFormTypeOption('by_reference', false)
        ];
    }
}
