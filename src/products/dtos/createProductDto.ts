import{IsDate, IsDateString, IsEmail, IsFQDN, IsInt, IsOptional, IsStrongPassword, Max, MaxLength, Min, MinLength} from "class-validator"

export class createProductDto {
    
    @MaxLength(20,{message: "max 20 charachter"})
    @MinLength(3/* ,{message: "min 3 charachter"} */)
    titile: string;

    @IsEmail()
    description : string;

    @IsStrongPassword()
    @MinLength(8)
    @MaxLength(30)
    price: string;


    tags: string[];

    user: string;
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
