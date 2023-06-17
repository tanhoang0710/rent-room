import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshTokenForUser1686967423656 implements MigrationInterface {
    name = 'AddRefreshTokenForUser1686967423656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`refreshToken\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`refreshToken\``);
    }

}
