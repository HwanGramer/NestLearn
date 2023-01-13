import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board.model";

//? 핸들러 레벨 파이프도 짜봐야할듯

export class BoardStatusValidationPipe implements PipeTransform{
    readonly BoardOptions = [
        BoardStatus.PUBLIC,
        BoardStatus.PRIVATE
    ]
    transform(value: any, metadata: ArgumentMetadata) {
        console.log(value);   //? 클라이언트에서 보낸 값
        console.log(metadata);  //? 인자에 대한 메타데이터 { metatype: [Function: String], type: 'body', data: 'status' } 메타데이터 예시

        value = value.toUpperCase();  //? 대소문자 구별X

        if(this.isStatusValid(value)){
            throw new BadRequestException({status : false , msg : `${value} isn't in the status Options`}); //? 에러 객체던짐
        }

        return value; //? value가 제대로된 값이라면 return
    }

    isStatusValid(value : any) : boolean{
        const index = this.BoardOptions.indexOf(value);
        return index === -1; //? 해당 index가 -1 이면 잘못온거임.
    }
}