import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UsePipes, ValidationPipe} from '@nestjs/common';
import { Request } from 'express';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('/boards')
export class BoardsController {
    arr : ReadonlyArray<number> = [11,3,4,5] // 읽기전용배열
    //? 접근 제한자(public, protected, private)을 생성자(constructor) 파라미터에 선언 하면 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언됩니다
    constructor(private boardsService : BoardsService){ //? 여기서 파라미터를 사용을 어떻게 해야되나 생각하고있었는데 파라미터로 들어온 boardsService가
                                                        //? 암묵적으로 프로퍼티로 변한다고 한다. constructor 생성자에서만 반응함.
    }

    @Get('/')
    getAllBoard() : Board[] {
        return this.boardsService.getAllBoards()
    }

    //?@Request()	req                                깃허브에 이 내용 적을것  클라이언트에서 오는것들 , req ,res 전부 다
    //! 깃허브에 이 내용 적을것  클라이언트에서 오는것들 , req ,res 전부 다 깃허브에 이 내용 적을것  클라이언트에서 오는것들 , req ,res 전부 다                     
    //! 깃허브에 이 내용 적을것  클라이언트에서 오는것들 , req ,res 전부 다 깃허브에 이 내용 적을것  클라이언트에서 오는것들 , req ,res 전부 다                     
    //? @Response(), @Res()*	res
    //? @Next()	next
    //? @Session()	req.session
    //? @Param(key?: string)	req.params / req.params[key]
    //? @Body(key?: string)	req.body / req.body[key]
    //? @Query(key?: string)	req.query / req.query[key]
    //? @Headers(name?: string)	req.headers / req.headers[name]
    //? @Ip()	req.ip   
    //? @HttpCode(status:number)	 
    @Post('/') 
    @UsePipes(ValidationPipe) //? NestJS의 기본 유효성체크Pipe 핸들러 파이프
    createBoard(@Body() createBoardDto : CreateBoardDto, @Req() req : Request) : Board {
        console.log(req.body);
        // console.log(title);
        // console.log(description);
        return this.boardsService.createBoard(createBoardDto);
    }


    //? 파라미터가 여러개가 있을경우 ( @Params() params : string[] ) 이렇게도 가능.
    @Get('/:id')
    getBoardById(@Param('id') id : string) : Board{
        return this.boardsService.getBoardById(id);
    }

    @Get('/test/:testId')
    getBoardTest(@Param('testId') test : number) : object{
        return {status : true , msg : test};
    }

    @Delete('/:id')
    deleteBoardByID(@Param('id') id : string) : object{
        return this.boardsService.deleteBoardById(id);
    }


    @Patch('/:id/status')                               //? Body안에 이름 써야됨.
    updateBoardStatus(@Param('id') id : string     //? 파라미터 파이프임.
    ,@Body('status' , BoardStatusValidationPipe) status : BoardStatus) : Board{
        return this.boardsService.updateBoardStatus(id , status);
    }

}
