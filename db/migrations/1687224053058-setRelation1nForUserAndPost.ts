import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetRelation1nForUserAndPost1687224053058
  implements MigrationInterface
{
  name = 'SetRelation1nForUserAndPost1687224053058';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_f951865b16a3229609a9b42ea8\` ON \`posts\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_ae05faaa55c866130abef6e1fee\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_ae05faaa55c866130abef6e1fee\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_f951865b16a3229609a9b42ea8\` ON \`posts\` (\`overviewId\`)`,
    );
  }
}
