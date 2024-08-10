<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240810215311 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE score_reference ADD main_score_id VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE score_reference ADD CONSTRAINT FK_F08AB3C2CBC91B24 FOREIGN KEY (main_score_id) REFERENCES score (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_F08AB3C2CBC91B24 ON score_reference (main_score_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE score_reference DROP FOREIGN KEY FK_F08AB3C2CBC91B24');
        $this->addSql('DROP INDEX UNIQ_F08AB3C2CBC91B24 ON score_reference');
        $this->addSql('ALTER TABLE score_reference DROP main_score_id');
    }
}
