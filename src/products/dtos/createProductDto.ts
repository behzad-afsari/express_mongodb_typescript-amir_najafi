import{IsDate, IsDateString, IsDefined, IsEmail, IsFQDN, IsInt, IsOptional, IsStrongPassword, Max, MaxLength, Min, MinLength} from "class-validator"

export class createProductDto {
    
    @MaxLength(20,{message: "max 20 charachter"})
    @MinLength(3 )
    @IsDefined()
    title: string;

    @IsDefined()
    description : string;
    
    @IsDefined()
    @Max(1000)
    price: string;

    @IsOptional()
    tags: string[];

    @IsDefined()
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
