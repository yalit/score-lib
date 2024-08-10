<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240810212824 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE score ADD main_reference_id VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE score ADD CONSTRAINT FK_32993751FFD6B10 FOREIGN KEY (main_reference_id) REFERENCES score_reference (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_32993751FFD6B10 ON score (main_reference_id)');
        $this->addSql('ALTER TABLE score_reference CHANGE score_id score_id VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE score DROP FOREIGN KEY FK_32993751FFD6B10');
        $this->addSql('DROP INDEX UNIQ_32993751FFD6B10 ON score');
        $this->addSql('ALTER TABLE score DROP main_reference_id');
        $this->addSql('ALTER TABLE score_reference CHANGE score_id score_id VARCHAR(255) NOT NULL');
    }
}
