import { MigrationInterface, QueryRunner } from "typeorm";

export class SetRelation11ForPostAndOverview1687223553186 implements MigrationInterface {
    name = 'SetRelation11ForPostAndOverview1687223553186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_7834c0afccd57fba7e0b066bcf\` ON \`posts\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD UNIQUE INDEX \`IDX_f951865b16a3229609a9b42ea8\` (\`overviewId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_f951865b16a3229609a9b42ea8\` ON \`posts\` (\`overviewId\`)`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_f951865b16a3229609a9b42ea83\` FOREIGN KEY (\`overviewId\`) REFERENCES \`overviews\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_f951865b16a3229609a9b42ea83\``);
        await queryRunner.query(`DROP INDEX \`REL_f951865b16a3229609a9b42ea8\` ON \`posts\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP INDEX \`IDX_f951865b16a3229609a9b42ea8\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_7834c0afccd57fba7e0b066bcf\` ON \`posts\` (\`attributeId\`)`);
    }

}
