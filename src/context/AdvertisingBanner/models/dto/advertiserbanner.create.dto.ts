import { ApiProperty } from "@nestjs/swagger";

export class AdvertiserBannerCreateDto {
    @ApiProperty({
        description: 'Description of advertiser banner',
        example: "Winter Sale",
    })
    readonly description: string;

    @ApiProperty({
        description: 'Image url of advertiser banner',
        example: "https://image.com/1234",
    })
    readonly imageUrl: string;
}



export class AdvertiserBannerCreateDto_response extends AdvertiserBannerCreateDto {

    @ApiProperty({
        description: 'Status of advertiser banner',
        example: true,
    })
    readonly isActive: Boolean;

    @ApiProperty({
        description: 'Id',
        example: "1234",
    })
    readonly _id: string;
}

