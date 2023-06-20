import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeColumnWhenJoinCategoryWithPost1687239271281
  implements MigrationInterface
{
  name = 'ChangeColumnWhenJoinCategoryWithPost1687239271281';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`categoryId\``);
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD \`categoryId\` int NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_168bf21b341e2ae340748e2541\` ON \`posts\` (\`categoryId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_168bf21b341e2ae340748e2541d\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_168bf21b341e2ae340748e2541d\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_168bf21b341e2ae340748e2541\` ON \`posts\``,
    );
    await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`categoryId\``);
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD \`categoryId\` varchar(255) NULL`,
    );
  }
}
