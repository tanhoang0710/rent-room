import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTypePostEnitity1687145796819 implements MigrationInterface {
  name = 'ChangeTypePostEnitity1687145796819';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`posts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`star\` varchar(255) NOT NULL DEFAULT '0', \`labelCode\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`attributeId\` int NOT NULL, \`categoryCode\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`userId\` int NOT NULL, \`overviewId\` int NOT NULL, \`imagesId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`posts\``);
  }
}
