import { Exclude } from 'class-transformer';
import { IsInt, IsString, Max, Min, MinLength } from 'class-validator';

export class RegisterUserBodyDto {
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  @Exclude({ toPlainOnly: true })
  @IsString()
  @MinLength(6)
  fullName: string;

  @Min(14, { message: '최소 14세 이상만 사용 가능합니다.' })
  @Max(100, { message: '100세를 초과할 수 없습니다.' })
  @IsInt({ message: '나이를 입력해주세요.' })
  age: number;

  isEqualFullname(): boolean {
    return this.firstName + this.lastName === this.fullName;
  }
}
