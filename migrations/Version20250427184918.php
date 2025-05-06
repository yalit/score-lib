<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250427184918 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE listing (id VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE listing_score (id VARCHAR(255) NOT NULL, score_id VARCHAR(255) DEFAULT NULL, listing_id VARCHAR(255) DEFAULT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_C477EFDD12EB0A51 (score_id), INDEX IDX_C477EFDDD4619D1A (listing_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE listing_score ADD CONSTRAINT FK_C477EFDD12EB0A51 FOREIGN KEY (score_id) REFERENCES score (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE listing_score ADD CONSTRAINT FK_C477EFDDD4619D1A FOREIGN KEY (listing_id) REFERENCES listing (id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE listing_score DROP FOREIGN KEY FK_C477EFDD12EB0A51
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE listing_score DROP FOREIGN KEY FK_C477EFDDD4619D1A
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE listing
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE listing_score
        SQL);
    }
}
