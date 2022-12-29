import { IsNumber, IsString } from 'class-validator';

export class RegisterUserResponseDto {
  @IsNumber()
  age: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  get fullName(): string {
    return this.firstName + this.lastName;
  }
}
