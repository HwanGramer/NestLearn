import { Body, Controller, Get, Post, Req} from '@nestjs/common';
import { Request } from 'express';
import { Board } from './board.model';
import { BoardsService } from './boards.service';

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
    createBoard(@Body('title') title : string, @Body('description') description : string , @Req() req : Request) : Board {
        console.log(req.body);
        // console.log(title);
        // console.log(description);
        return this.boardsService.createBoard(title , description);
    }

}
