import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeColumnWhenJoinLabelAndCategoryWithPost1687226198086
  implements MigrationInterface
{
  name = 'ChangeColumnWhenJoinLabelAndCategoryWithPost1687226198086';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`REL_5a999898b5e7538e3d034055ce\` ON \`posts\``,
    );
    await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`labelCode\``);
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD \`labelCode\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_1b5d2f6076b4ba13444d7cb26c\` ON \`posts\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP COLUMN \`categoryCode\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD \`categoryCode\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_5a999898b5e7538e3d034055ce\` ON \`posts\` (\`labelCode\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_1b5d2f6076b4ba13444d7cb26c\` ON \`posts\` (\`categoryCode\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`REL_1b5d2f6076b4ba13444d7cb26c\` ON \`posts\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_5a999898b5e7538e3d034055ce\` ON \`posts\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP COLUMN \`categoryCode\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD \`categoryCode\` int NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_1b5d2f6076b4ba13444d7cb26c\` ON \`posts\` (\`categoryCode\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`labelCode\``);
    await queryRunner.query(`ALTER TABLE \`posts\` ADD \`labelCode\` int NULL`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_5a999898b5e7538e3d034055ce\` ON \`posts\` (\`labelCode\`)`,
    );
  }
}
