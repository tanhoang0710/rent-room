import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeImageForeignKeyNameOnPost1687222892964
  implements MigrationInterface
{
  name = 'ChangeImageForeignKeyNameOnPost1687222892964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_c3151166f34d2bf359ef9473183\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c3151166f34d2bf359ef947318\` ON \`posts\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_c3151166f34d2bf359ef947318\` ON \`posts\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` CHANGE \`imageIdId\` \`imageId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD UNIQUE INDEX \`IDX_294625b251f17eca44cc57fbeb\` (\`imageId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_294625b251f17eca44cc57fbeb\` ON \`posts\` (\`imageId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_294625b251f17eca44cc57fbeb8\` FOREIGN KEY (\`imageId\`) REFERENCES \`images\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_294625b251f17eca44cc57fbeb8\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_294625b251f17eca44cc57fbeb\` ON \`posts\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP INDEX \`IDX_294625b251f17eca44cc57fbeb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` CHANGE \`imageId\` \`imageIdId\` int NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_c3151166f34d2bf359ef947318\` ON \`posts\` (\`imageIdId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_c3151166f34d2bf359ef947318\` ON \`posts\` (\`imageIdId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_c3151166f34d2bf359ef9473183\` FOREIGN KEY (\`imageIdId\`) REFERENCES \`images\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
