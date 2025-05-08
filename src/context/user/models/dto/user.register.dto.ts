import { ApiProperty } from "@nestjs/swagger";


export class UserRegisterDto {
    @ApiProperty({
        description: 'Name of user',
        example: "Maxi",
    })
    public readonly name: string;

    @ApiProperty({
        description: 'Last name of user',
        example: "Cvetic",
    })
    public readonly lastName: string;

    @ApiProperty({
        description: 'Email of user',
        example: "ubnet@gmail.com",
    })
    public readonly email: string;

    @ApiProperty({
        description: 'Password of user',
        example: "1234",
    })
    public readonly password: string;

}




export class UserRegisterDto_response {

    @ApiProperty({
        description: 'Name of user',
        example: "Maxi",
    })
    public readonly name: string;

    @ApiProperty({
        description: 'Last name of user',
        example: "Cvetic",
    })
    public readonly lastName: string;

    @ApiProperty({
        description: 'Email of user',
        example: "ubnet@gmail.com",
    })
    public readonly email: string;




}
