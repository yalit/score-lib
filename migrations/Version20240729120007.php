<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240729120007 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE artist (id VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE score (id VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, description VARCHAR(1028) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE score_artist (score_id VARCHAR(255) NOT NULL, artist_id VARCHAR(255) NOT NULL, INDEX IDX_E283D15912EB0A51 (score_id), INDEX IDX_E283D159B7970CF8 (artist_id), PRIMARY KEY(score_id, artist_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE score_score_category (score_id VARCHAR(255) NOT NULL, score_category_id VARCHAR(255) NOT NULL, INDEX IDX_BFA56B2612EB0A51 (score_id), INDEX IDX_BFA56B26D70D2C97 (score_category_id), PRIMARY KEY(score_id, score_category_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE score_category (id VARCHAR(255) NOT NULL, value VARCHAR(255) NOT NULL, description VARCHAR(1028) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE score_file (id VARCHAR(255) NOT NULL, score_id VARCHAR(255) DEFAULT NULL, name VARCHAR(255) NOT NULL, path VARCHAR(255) NOT NULL, mime_type VARCHAR(255) DEFAULT NULL, size INT NOT NULL, extension VARCHAR(255) DEFAULT NULL, INDEX IDX_A687B76612EB0A51 (score_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE score_reference (id VARCHAR(255) NOT NULL, score_id VARCHAR(255) NOT NULL, value VARCHAR(255) NOT NULL, INDEX IDX_F08AB3C212EB0A51 (score_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE score_artist ADD CONSTRAINT FK_E283D15912EB0A51 FOREIGN KEY (score_id) REFERENCES score (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE score_artist ADD CONSTRAINT FK_E283D159B7970CF8 FOREIGN KEY (artist_id) REFERENCES artist (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE score_score_category ADD CONSTRAINT FK_BFA56B2612EB0A51 FOREIGN KEY (score_id) REFERENCES score (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE score_score_category ADD CONSTRAINT FK_BFA56B26D70D2C97 FOREIGN KEY (score_category_id) REFERENCES score_category (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE score_file ADD CONSTRAINT FK_A687B76612EB0A51 FOREIGN KEY (score_id) REFERENCES score (id)');
        $this->addSql('ALTER TABLE score_reference ADD CONSTRAINT FK_F08AB3C212EB0A51 FOREIGN KEY (score_id) REFERENCES score (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE score_artist DROP FOREIGN KEY FK_E283D15912EB0A51');
        $this->addSql('ALTER TABLE score_artist DROP FOREIGN KEY FK_E283D159B7970CF8');
        $this->addSql('ALTER TABLE score_score_category DROP FOREIGN KEY FK_BFA56B2612EB0A51');
        $this->addSql('ALTER TABLE score_score_category DROP FOREIGN KEY FK_BFA56B26D70D2C97');
        $this->addSql('ALTER TABLE score_file DROP FOREIGN KEY FK_A687B76612EB0A51');
        $this->addSql('ALTER TABLE score_reference DROP FOREIGN KEY FK_F08AB3C212EB0A51');
        $this->addSql('DROP TABLE artist');
        $this->addSql('DROP TABLE score');
        $this->addSql('DROP TABLE score_artist');
        $this->addSql('DROP TABLE score_score_category');
        $this->addSql('DROP TABLE score_category');
        $this->addSql('DROP TABLE score_file');
        $this->addSql('DROP TABLE score_reference');
    }
}
