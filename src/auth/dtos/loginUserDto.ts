import{ IsDefined, IsEmail, IsStrongPassword, MaxLength, MinLength} from "class-validator"

export default class loginDto {
    
    @IsEmail()
    @IsDefined()
    email : string;
    
    // @IsStrongPassword()
    @MinLength(3)
    @MaxLength(30)
    @IsDefined()
    password: string;
}
