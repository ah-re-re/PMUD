import { ApiProperty } from '@nestjs/swagger';

type typeName = {
    name: string;
    language: string;
}

type typeDes = {
    des: string;
    language: string;
}



export class CreateCategoryDto {
    @ApiProperty({ type: [Object], required: true })
    name: typeName[];

    @ApiProperty({ type: [Object], required: true })
    description: typeDes[];

    @ApiProperty({ required: false })
    url: string;

    @ApiProperty({ type: String, required: false })
    parent_id?: string;

    @ApiProperty({ type: String, required: true })
    page: string;
}