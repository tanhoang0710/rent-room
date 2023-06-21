import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePriceAndArea1687307138711 implements MigrationInterface {
  name = 'CreatePriceAndArea1687307138711';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`price\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`code\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`area\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`code\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD \`areaCode\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD \`priceCode\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_d26af8b62ec6176718f534d2591\` FOREIGN KEY (\`areaCode\`) REFERENCES \`area\`(\`code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_6697f841c467cb421bd9a86fc62\` FOREIGN KEY (\`priceCode\`) REFERENCES \`price\`(\`code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_6697f841c467cb421bd9a86fc62\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_d26af8b62ec6176718f534d2591\``,
    );
    await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`priceCode\``);
    await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`areaCode\``);
    await queryRunner.query(`DROP TABLE \`area\``);
    await queryRunner.query(`DROP TABLE \`price\``);
  }
}
