import { ApiProperty } from '@nestjs/swagger';

export class CreateSiteConfigDto {
    @ApiProperty({type: String, required: true})
    name: string;

    @ApiProperty({ type: String, required: true })
    value: string;

}
