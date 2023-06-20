import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetRelation11ForPostAndImage1687222802276
  implements MigrationInterface
{
  name = 'SetRelation11ForPostAndImage1687222802276';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`posts\` CHANGE \`imagesId\` \`imageIdId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD UNIQUE INDEX \`IDX_c3151166f34d2bf359ef947318\` (\`imageIdId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_c3151166f34d2bf359ef947318\` ON \`posts\` (\`imageIdId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_c3151166f34d2bf359ef9473183\` FOREIGN KEY (\`imageIdId\`) REFERENCES \`images\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_c3151166f34d2bf359ef9473183\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_c3151166f34d2bf359ef947318\` ON \`posts\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP INDEX \`IDX_c3151166f34d2bf359ef947318\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` CHANGE \`imageIdId\` \`imagesId\` int NULL`,
    );
  }
}
