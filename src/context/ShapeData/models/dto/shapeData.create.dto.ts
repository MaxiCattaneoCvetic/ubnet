import { ApiProperty } from "@nestjs/swagger";
import { ShapeDataType } from "../enum/shapeData.type.enum";

export class ShapeDataCreateDto {
    @ApiProperty({
        description: 'Tipo de figura (CIRCLE o POLYGON)',
        enum: ShapeDataType,
        example: ShapeDataType.CIRCLE,
    })
    type: ShapeDataType;

    @ApiProperty({
        description: 'ID del cliente asociado',
        example: '5f8b8b3e-2b9b-4b9b-8b3e-2b9b4b9b8b3e',
    })
    clientId: string;
}


export class ShapeDataCircle {
    @ApiProperty({
        description: 'Centro del círculo (latitud y longitud)',
        type: 'object',
        properties: {
            lat: { type: 'number', example: -34.603722 },
            lng: { type: 'number', example: -58.381592 },
        },
    })
    center: {
        lat: number;
        lng: number;
    };


    @ApiProperty({
        description: 'Radio del circulo',
        example: 1000,
    })
    radius: number;
}

export class ShapeDataCircleCreateDto extends ShapeDataCreateDto {
    @ApiProperty({
        description: 'Datos del círculo',
        type: ShapeDataCircle,
    })
    circle: ShapeDataCircle;
}

export class ShapeDataCircleUpdateDto extends ShapeDataCreateDto {
    @ApiProperty({
        description: 'Datos del círculo',
        type: ShapeDataCircle,
    })
    circle: ShapeDataCircle;


    @ApiProperty({
        description: 'id of schema',
        example: "asd1a5s6d",
    })
    _id: string;

}



export class PolygonData {
    @ApiProperty({
        description: 'Lista de coordenadas que forman el poligono',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                lat: { type: 'number', example: -34.603722 },
                lng: { type: 'number', example: -58.381592 },
            },
        },
    })
    path: {
        lat: number;
        lng: number;
    }[];
}
export class ShapeDataPolygonCreateDto extends ShapeDataCreateDto {

    @ApiProperty({
        description: 'Datos del poligono',
        type: PolygonData,
    })
    polygon: PolygonData;

}



export class ShapeDataPolygonUpdateDto extends ShapeDataCreateDto {
    @ApiProperty({
        description: 'Datos del poligono',
        type: PolygonData,
    })
    polygon: PolygonData;


    @ApiProperty({
        description: 'id of schema',
        example: "asd1a5s6d",
    })
    _id: string;

}