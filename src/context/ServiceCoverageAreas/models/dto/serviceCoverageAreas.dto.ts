import { ApiProperty } from "@nestjs/swagger";

export class ServiceCoverageAreasCreateDto {

}

export class ServiceCoverageAreasResponseDto {
    @ApiProperty({
        description: 'Id of service coverage area',
        example: "1234",
        type: String
    })
    readonly _id: string

}