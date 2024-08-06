import { IsEmail, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class SendEmail {

  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(3)
  public readonly name: string;

  @IsString()
  public readonly asunto: string;

  @IsNumber()
  @MaxLength(10)
  @IsOptional()
  public readonly phoneNumber?: string;

  @IsString()
  @MinLength(2)
  public readonly message: string;
}
