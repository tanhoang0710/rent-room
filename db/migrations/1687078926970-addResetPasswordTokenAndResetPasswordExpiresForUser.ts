import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddResetPasswordTokenAndResetPasswordExpiresForUser1687078926970
  implements MigrationInterface
{
  name = 'AddResetPasswordTokenAndResetPasswordExpiresForUser1687078926970';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`resetPasswordToken\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`resetPasswordExpires\` datetime NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`resetPasswordExpires\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`resetPasswordToken\``,
    );
  }
}
