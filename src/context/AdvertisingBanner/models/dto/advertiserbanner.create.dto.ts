import { ApiProperty } from "@nestjs/swagger";

export class AdvertiserBannerCreateDto {
    @ApiProperty({
        description: 'Description of advertiser banner',
        example: "Winter Sale",
        type: String
    })
    readonly description: string;

    @ApiProperty({
        description: 'Image url of advertiser banner',
        example: "https://image.com/1234",
        type: String
    })
    readonly imageUrl: string;

    @ApiProperty({
        description: 'Image url of advertiser banner',
        example: "https://image.com/mobile-123",
        type: String
    })
    readonly mobileImageUrl: string;



    @ApiProperty({
        description: 'Order of the banner, if you dont send it will be 0',
        example: 1,
        type: Number
    })
    readonly order: number;

}

export class AdvertiserBannerUpdateDto {

    @ApiProperty({
        example: "1234",
        type: String
    })
    readonly _id: string;


    @ApiProperty({
        example: "Winter Sale updated",
        type: String
    })
    readonly description: string;

    @ApiProperty({
        example: "https://image.com/1234",
        type: String
    })
    readonly imageUrl: string;


    @ApiProperty({
        example: false,
        type: Boolean
    })
    readonly isActive: Boolean;

    @ApiProperty({
        description: 'Image url of advertiser banner',
        example: "https://image.com/mobile-123",
        type: String
    })
    readonly mobileImageUrl: string;



    @ApiProperty({
        description: 'Order of the banner',
        example: 1,
        type: Number
    })
    readonly order: number;


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

