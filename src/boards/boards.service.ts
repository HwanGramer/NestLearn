import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid} from 'uuid';
//?  v1은 uuid의 버전을 뜻한다. 이름은 uuid로 사용한다. 

@Injectable()
export class BoardsService {
    private boards : Board[] = []; //?변수 모델에서만들어낸 타입을 지정 . 

    //? 게시물 전부 가져오기
    getAllBoards() : Board[]{
        return this.boards;
    }

    //? 게시물 만들기 
    //* 게시물을 생성하고 , id는 uuid라이브러리를 사용해서 만들어주고 , 만들기에 성공하면 만들어진 board를 리턴한다.
    createBoard(title : string , description : string) : Board{
        //! 여기서 문제점. 클라이언트에서 title , description를 보내지 않아도 에러없이 만들어지는데? 
        //! 코드에서만 빨간밑줄이 생길뿐 프로그램상 에러는 발생하지않음... 
        const board : Board = {
            id : uuid(),
            title : title,
            description : description,
            status : BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }


}
 