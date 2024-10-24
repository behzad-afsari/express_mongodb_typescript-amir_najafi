import{ IsDefined, IsEmail, IsStrongPassword, MaxLength, MinLength} from "class-validator"

export default class registerDto {
    
    @MaxLength(20)
    @MinLength(3)
    @IsDefined()
    username: string;

    @IsEmail()
    @IsDefined()
    email : string;
    
    @MinLength(3)
    @MaxLength(30)
    @IsDefined()
    password: string;
}
