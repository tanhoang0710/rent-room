import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetDefaultValueForAttributeEntity1687150871816
  implements MigrationInterface
{
  name = 'SetDefaultValueForAttributeEntity1687150871816';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`attributes\` CHANGE \`arcreage\` \`arcreage\` varchar(255) NOT NULL DEFAULT '100m2'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD \`description\` text NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD \`description\` mediumtext NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`attributes\` CHANGE \`arcreage\` \`arcreage\` varchar(255) NOT NULL`,
    );
  }
}
