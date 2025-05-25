import { ApiProperty } from "@nestjs/swagger";

export class SubscriptionPlanUpdateDto {
    @ApiProperty({
        description: 'Updated title/name of the subscription plan',
        example: "Business Fiber Plus",
        type: String
    })
    title?: string;

    @ApiProperty({
        description: 'Updated description of plan features and benefits',
        example: "200MB symmetric fiber + 100 TV channels",
        type: [String]
    })
    detail?: string[];

    @ApiProperty({
        description: 'Updated monthly price of the plan',
        example: 89.99,
        type: Number
    })
    price?: number;

    @ApiProperty({
        description: 'Sets whether the plan is available for subscription',
        example: true,
        type: Boolean
    })
    isActive?: boolean;

    @ApiProperty({
        description: 'Optional promotional text or badge for the plan',
        example: "Most Popular",
        type: String,
        required: false
    })
    sideText?: string;


    @ApiProperty({
        description: 'Updated speed values (required for internet plans)',
        example: { upload: "200Mbps", download: "200Mbps" },
        required: true
    })
    uploadDownloadValues?: { upload: string, download: string };

    @ApiProperty({
        description: 'Whether to highlight this plan as featured (required for internet plans)',
        example: true,
        type: Boolean,
        required: true
    })
    isFeature?: boolean;
}