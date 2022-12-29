import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class RegisterUserResponseDto {
  @Expose()
  @IsNumber()
  age: number;

  @Expose()
  @IsString()
  firstName: string;

  @Expose()
  @IsString()
  lastName: string;

  get fullName(): string {
    return this.firstName + this.lastName;
  }
}
