import{IsDate, IsDateString, IsEmail, IsFQDN, IsInt, IsOptional, IsStrongPassword, Max, MaxLength, Min, MinLength} from "class-validator"

export class createUserDto {
    
    @MaxLength(20,{message: "max 20 charachter"})
    @MinLength(3/* ,{message: "min 3 charachter"} */)
    username: string;

    @IsEmail()
    email : string;

    @IsStrongPassword()
    @MinLength(8)
    @MaxLength(30)
    password: string;

    // @IsOptional()
    // @IsInt()
    // @Min(0)
    // @Max(99)
    // age: number;

    // @IsDateString()
    // birthDay : Date;

    // @IsFQDN()
    // site: string;
}
