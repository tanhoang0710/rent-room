import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetRelation11ForCategoryAndPost1687225801683
  implements MigrationInterface
{
  name = 'SetRelation11ForCategoryAndPost1687225801683';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_e987901d487ce30860da4b1a6f7\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e987901d487ce30860da4b1a6f\` ON \`posts\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_e987901d487ce30860da4b1a6f\` ON \`posts\``,
    );
    await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`labelId\``);
    await queryRunner.query(`ALTER TABLE \`posts\` ADD \`labelCode\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD UNIQUE INDEX \`IDX_5a999898b5e7538e3d034055ce\` (\`labelCode\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP COLUMN \`categoryCode\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD \`categoryCode\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD UNIQUE INDEX \`IDX_1b5d2f6076b4ba13444d7cb26c\` (\`categoryCode\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_5a999898b5e7538e3d034055ce\` ON \`posts\` (\`labelCode\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_1b5d2f6076b4ba13444d7cb26c\` ON \`posts\` (\`categoryCode\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_5a999898b5e7538e3d034055cea\` FOREIGN KEY (\`labelCode\`) REFERENCES \`labels\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_1b5d2f6076b4ba13444d7cb26c6\` FOREIGN KEY (\`categoryCode\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_1b5d2f6076b4ba13444d7cb26c6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_5a999898b5e7538e3d034055cea\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_1b5d2f6076b4ba13444d7cb26c\` ON \`posts\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_5a999898b5e7538e3d034055ce\` ON \`posts\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP INDEX \`IDX_1b5d2f6076b4ba13444d7cb26c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP COLUMN \`categoryCode\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD \`categoryCode\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP INDEX \`IDX_5a999898b5e7538e3d034055ce\``,
    );
    await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`labelCode\``);
    await queryRunner.query(`ALTER TABLE \`posts\` ADD \`labelId\` int NULL`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_e987901d487ce30860da4b1a6f\` ON \`posts\` (\`labelId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_e987901d487ce30860da4b1a6f\` ON \`posts\` (\`labelId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_e987901d487ce30860da4b1a6f7\` FOREIGN KEY (\`labelId\`) REFERENCES \`labels\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
