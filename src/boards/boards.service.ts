import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
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
    createBoard(createBoardDto : CreateBoardDto) : Board{
        //! 여기서 문제점. 클라이언트에서 title , description를 보내지 않아도 에러없이 만들어지는데? 
        //! 코드에서만 빨간밑줄이 생길뿐 프로그램상 에러는 발생하지않음... 
        const board : Board = {
            id : uuid(),
            title : createBoardDto.title,
            description : createBoardDto.description,
            status : BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }

    getBoardById(id : string) : Board{
        return this.boards.find((borad)=>{
            return borad.id === id;
        }) //? borads에서 파라미터로 넘어온 id와 같은걸 리턴한다.
    }

    deleteBoardById(id : string) : object{

        this.boards.filter((element , index)=>{
            return element.id !== id;
        })

        return {suc : true , msg : '삭제성공'};
    }

}
 