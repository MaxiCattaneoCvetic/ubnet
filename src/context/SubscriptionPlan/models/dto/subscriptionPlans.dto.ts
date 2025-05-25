import { ApiProperty } from "@nestjs/swagger";

export class SubscriptionPlanCreateDto {

    @ApiProperty({
        description: 'Title of subscription plan',
        example: "Premium",
        type: String
    })
    title: string;

    @ApiProperty({
        description: 'Title of subscription plan',
        example: "Premium",
        type: String
    })
    detail: string;

    @ApiProperty({
        description: 'Title of subscription plan',
        example: "Premium",
        type: Boolean
    })
    isActive: boolean;

    @ApiProperty({
        description: 'Plan type',
        example: "fiber",
        type: String
    })
    planType: string;



    @ApiProperty({
        description: 'Indicate if the plan is a promotion plan',
        example: "Premium",
        type: Boolean,
        required: true,

    })
    isPromotionPlan: boolean;

    @ApiProperty({
        description: 'Title of subscription plan',
        example: "Premium",
        type: String,
        required: false
    })
    sideText?: string;


    @ApiProperty({
        description: 'indicate if the plan is a feature plan- Is required only for internet plan',
        example: "Premium",
        type: Boolean,
        required: false,

    })
    isFeature?: boolean;

    @ApiProperty({
        description: 'Price of subscription plan',
        example: "Premium",
        type: Number,
        required: false,

    })
    price?: number;

    @ApiProperty({
        description: 'Indicate status of the plan - Is required only for internet plan',
        example: "Premium",
        required: false,
    })
    uploadDownloadValues?: { upload: string, download: string };


}


export class SubscriptionPlanResponseDto extends SubscriptionPlanCreateDto {
    @ApiProperty({
        description: 'Id of subscription plan',
        example: "1234",
        type: String
    })
    readonly _id: string

}