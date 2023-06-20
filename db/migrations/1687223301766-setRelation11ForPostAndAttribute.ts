import { MigrationInterface, QueryRunner } from "typeorm";

export class SetRelation11ForPostAndAttribute1687223301766 implements MigrationInterface {
    name = 'SetRelation11ForPostAndAttribute1687223301766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_294625b251f17eca44cc57fbeb\` ON \`posts\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD UNIQUE INDEX \`IDX_7834c0afccd57fba7e0b066bcf\` (\`attributeId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_7834c0afccd57fba7e0b066bcf\` ON \`posts\` (\`attributeId\`)`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_7834c0afccd57fba7e0b066bcfc\` FOREIGN KEY (\`attributeId\`) REFERENCES \`attributes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_7834c0afccd57fba7e0b066bcfc\``);
        await queryRunner.query(`DROP INDEX \`REL_7834c0afccd57fba7e0b066bcf\` ON \`posts\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP INDEX \`IDX_7834c0afccd57fba7e0b066bcf\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_294625b251f17eca44cc57fbeb\` ON \`posts\` (\`imageId\`)`);
    }

}
