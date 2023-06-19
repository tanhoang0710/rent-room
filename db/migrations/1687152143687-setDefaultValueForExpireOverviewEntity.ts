import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetDefaultValueForExpireOverviewEntity1687152143687
  implements MigrationInterface
{
  name = 'SetDefaultValueForExpireOverviewEntity1687152143687';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`overviews\` CHANGE \`expire\` \`expire\` datetime NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`overviews\` CHANGE \`expire\` \`expire\` datetime NOT NULL`,
    );
  }
}
