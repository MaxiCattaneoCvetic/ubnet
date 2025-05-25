import { ApiProperty } from "@nestjs/swagger";

export class SubscriptionPlanCreateDto {
    @ApiProperty({
        description: 'Title or name of the subscription plan',
        example: "Basic Plan",
        type: String
    })
    title: string;

    @ApiProperty({
        description: 'Detailed description of what the plan includes',
        example: "Includes 50MB internet speed and basic TV channels",
        type: String
    })
    detail: string;

    @ApiProperty({
        description: 'Whether the plan is currently active and available for subscription',
        example: true,
        type: Boolean
    })
    isActive: boolean;

    @ApiProperty({
        description: 'Category or classification of the plan',
        example: "fiber",
        type: String
    })
    planType: string;

    @ApiProperty({
        description: 'Flag indicating if this plan is a special promotional offer',
        example: false,
        type: Boolean,
        required: true
    })
    isPromotionPlan: boolean;

    @ApiProperty({
        description: 'Optional additional text or tagline for the plan',
        example: "Best value",
        type: String,
        required: false
    })
    sideText?: string;

    @ApiProperty({
        description: 'Whether this plan should be highlighted as featured (only relevant for internet plans)',
        example: false,
        type: Boolean,
        required: false
    })
    isFeature?: boolean;

    @ApiProperty({
        description: 'Monthly cost of the subscription plan',
        example: 29.99,
        type: Number,
        required: false
    })
    price?: number;

    @ApiProperty({
        description: 'Upload and download speed specifications (required only for internet plans)',
        example: { upload: "50Mbps", download: "50Mbps" },
        required: false
    })
    uploadDownloadValues?: { upload: string, download: string };
}

export class SubscriptionPlanResponseDto extends SubscriptionPlanCreateDto {
    @ApiProperty({
        description: 'Unique identifier for the subscription plan',
        example: "5f8d04b3ab35de3a3427d9e0",
        type: String
    })
    readonly _id: string;
}