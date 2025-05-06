import { ApiProperty } from "@nestjs/swagger"
import { Types } from "mongoose"
import { SubscriptionPlanResponseDto } from "src/context/SubscriptionPlan/models/dto/subscriptionPlans.dto"

export class ZoneCreateDto {
    @ApiProperty({
        description: 'Name of the zone',
        example: "Comodoro Rivadavia",
        type: String
    })
    name: string

    @ApiProperty({
        description: 'Plans of the zone',
        example: "[1234, 1234]",
        type: [String]
    })
    plans: Types.ObjectId[]
}

export class ZoneReponseDto {
    @ApiProperty({
        description: 'ID of the zone',
        type: String
    })
    _id: string

    @ApiProperty({
        description: 'Name of the zone',
        type: String
    })
    name: string

    @ApiProperty({
        description: 'Plans of the zone',
        type: [String]
    })
    plans: Types.ObjectId[]

}




export class ZoneResponseWithPlansDto {
    @ApiProperty({
        description: 'ID of the zone',
        type: String
    })
    _id: string

    @ApiProperty({
        description: 'Name of the zone',
        type: String
    })
    name: string


    @ApiProperty({
        description: 'Plans of the zone',
        type: [SubscriptionPlanResponseDto]
    })
    plans: SubscriptionPlanResponseDto[]


}