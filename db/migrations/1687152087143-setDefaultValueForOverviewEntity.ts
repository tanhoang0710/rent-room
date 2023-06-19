import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetDefaultValueForOverviewEntity1687152087143
  implements MigrationInterface
{
  name = 'SetDefaultValueForOverviewEntity1687152087143';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`overviews\` CHANGE \`create\` \`create\` datetime NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`overviews\` CHANGE \`create\` \`create\` datetime NOT NULL`,
    );
  }
}
