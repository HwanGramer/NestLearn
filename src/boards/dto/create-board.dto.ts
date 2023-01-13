import { IsNotEmpty } from 'class-validator'
//? 유효성 체크
export class CreateBoardDto{
    @IsNotEmpty()  //? 빈 문자열이 오지않도록 체크
    title : string;

    @IsNotEmpty()
    description : string;
}