import { ApiProperty } from '@nestjs/swagger';
import { LANGUAGE } from 'src/config/enum';

type namePage = {
  name: string;
  language: LANGUAGE;
}

export class CreatePageDto {
    @ApiProperty({type: [Object], required: true})
    name: namePage[];

    @ApiProperty({ type: String, required: true })
    paths: string;

}
