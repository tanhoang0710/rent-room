import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetDefaultValueForPostEntity1687151870800
  implements MigrationInterface
{
  name = 'SetDefaultValueForPostEntity1687151870800';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`posts\` CHANGE \`attributeId\` \`attributeId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` CHANGE \`userId\` \`userId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` CHANGE \`overviewId\` \`overviewId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` CHANGE \`imagesId\` \`imagesId\` int NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`posts\` CHANGE \`imagesId\` \`imagesId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` CHANGE \`overviewId\` \`overviewId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` CHANGE \`userId\` \`userId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` CHANGE \`attributeId\` \`attributeId\` int NOT NULL`,
    );
  }
}
