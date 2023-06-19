import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetImageTypeImageEntity1687151970563
  implements MigrationInterface
{
  name = 'SetImageTypeImageEntity1687151970563';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`images\` DROP COLUMN \`image\``);
    await queryRunner.query(
      `ALTER TABLE \`images\` ADD \`image\` text NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`images\` DROP COLUMN \`image\``);
    await queryRunner.query(
      `ALTER TABLE \`images\` ADD \`image\` varchar(255) NOT NULL`,
    );
  }
}
