import { ApiProperty } from '@nestjs/swagger';
import { ObjectID } from 'mongodb';

type TypeCard = {
    name: string,
    price: number,
    image: string,
    quantity: number,
    status: string
}

export class CreateCartDto {

    @ApiProperty({
        required: true,
        type: String,
    })
    name: string;
    @ApiProperty({
        required: true,
        type: String,
    })
    phone: string;
    @ApiProperty({
        required: true,
        type: String,
    })
    address: string;
    @ApiProperty({
        required: true,
        type: Array,
    })
    cart: TypeCard[];
    @ApiProperty({
        required: true,
        type: String,
        default: "None"
    })
    status: string;
}
