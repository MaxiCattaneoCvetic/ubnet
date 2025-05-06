export class ShapeDataResponseDto {
    _id: string
    type: string
    clientId: string
    circle?: {
        center: {
            lat: number;
            lng: number;
        },
        radius: number
    }
    polygon?: {
        path: {
            lat: number;
            lng: number;
        }[]
    }

}