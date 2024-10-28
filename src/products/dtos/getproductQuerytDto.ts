import{IsDate, IsDateString, IsDefined, IsEmail, IsFQDN, IsInt, IsOptional, IsStrongPassword, Max, MaxLength, Min, MinLength} from "class-validator"

export class getproductQuerytDto {
    @IsOptional()    
    title: string;
    
    @IsOptional()    
    description : string;
    
    @IsOptional()    
    start_price: number;
    
    @IsOptional()    
    end_price: number;
    
    @IsOptional()    
    tags: string[];
    
    @IsOptional()
    page: number
    
    @IsOptional()
    page_size: number
}
