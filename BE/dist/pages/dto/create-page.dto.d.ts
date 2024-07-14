import { LANGUAGE } from 'src/config/enum';
type namePage = {
    name: string;
    language: LANGUAGE;
};
export declare class CreatePageDto {
    name: namePage[];
    paths: string;
}
export {};
