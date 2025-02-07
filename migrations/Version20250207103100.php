<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250207103100 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE score ADD reference_id VARCHAR(255) DEFAULT NULL, DROP description');
        $this->addSql('ALTER TABLE score ADD CONSTRAINT FK_329937511645DEA9 FOREIGN KEY (reference_id) REFERENCES score_reference (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_329937511645DEA9 ON score (reference_id)');
        $this->addSql('ALTER TABLE score_category DROP description');
        $this->addSql('ALTER TABLE score_reference ADD information VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE score DROP FOREIGN KEY FK_329937511645DEA9');
        $this->addSql('DROP INDEX UNIQ_329937511645DEA9 ON score');
        $this->addSql('ALTER TABLE score ADD description VARCHAR(1028) DEFAULT NULL, DROP reference_id');
        $this->addSql('ALTER TABLE score_category ADD description VARCHAR(1028) DEFAULT NULL');
        $this->addSql('ALTER TABLE score_reference DROP information');
    }
}
