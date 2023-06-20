import { MigrationInterface, QueryRunner } from "typeorm";

export class SetRelation11ForLabelAndPost1687224660964 implements MigrationInterface {
    name = 'SetRelation11ForLabelAndPost1687224660964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`labelCode\` \`labelId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`labelId\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`labelId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD UNIQUE INDEX \`IDX_e987901d487ce30860da4b1a6f\` (\`labelId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_e987901d487ce30860da4b1a6f\` ON \`posts\` (\`labelId\`)`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_e987901d487ce30860da4b1a6f7\` FOREIGN KEY (\`labelId\`) REFERENCES \`labels\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_e987901d487ce30860da4b1a6f7\``);
        await queryRunner.query(`DROP INDEX \`REL_e987901d487ce30860da4b1a6f\` ON \`posts\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP INDEX \`IDX_e987901d487ce30860da4b1a6f\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`labelId\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`labelId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`labelId\` \`labelCode\` varchar(255) NOT NULL`);
    }

}
