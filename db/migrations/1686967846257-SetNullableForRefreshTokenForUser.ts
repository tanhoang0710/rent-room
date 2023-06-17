import { MigrationInterface, QueryRunner } from "typeorm";

export class SetNullableForRefreshTokenForUser1686967846257 implements MigrationInterface {
    name = 'SetNullableForRefreshTokenForUser1686967846257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NOT NULL`);
    }

}
