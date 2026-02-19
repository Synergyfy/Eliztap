import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class InviteStaffDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Staff Member' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'staff@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ enum: [UserRole.MANAGER, UserRole.STAFF], example: UserRole.STAFF })
  @IsEnum(UserRole)
  role: UserRole;
}
