import { ApiProperty } from "@nestjs/swagger";

export class SubscriptionPlanUpdateDto {

    @ApiProperty({
        description: 'Title of subscription plan',
        example: "Premium",
        type: String
    })
    title?: string;

    @ApiProperty({
        description: 'Title of subscription plan',
        example: "Premium",
        type: String
    })
    detail?: string;

    @ApiProperty({
        description: 'Title of subscription plan',
        example: "Premium",
        type: Number
    })
    price?: number;


    @ApiProperty({
        description: 'Title of subscription plan',
        example: "Premium",
        type: Boolean
    })
    isActive?: boolean;


    @ApiProperty({
        description: 'Title of subscription plan',
        example: "Premium",
        type: String
    })
    region?: string;

    @ApiProperty({
        description: 'Title of subscription plan',
        example: "Premium",
        type: String,
        required: false
    })
    sideText?: string;

    @ApiProperty({
        description: 'Indicate if the plan is a promotion plan',
        example: "Premium",
        type: Boolean,
        required: true,

    })
    isPromotionPlan?: boolean;


    @ApiProperty({
        description: 'Indicate status of the plan - Is required only for internet plan',
        example: "Premium",
        required: true,

    })
    uploadDownloadValues?: { upload: string, download: string };


    @ApiProperty({
        description: 'indicate if the plan is a feature plan- Is required only for internet plan',
        example: "Premium",
        type: Boolean,
        required: true,

    })
    isFeature?: boolean;
}