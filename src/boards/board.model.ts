//? 모델을 정의 할려면 Class를 이용하거나 interface를 이용하면 된다.
//? interface : 변수의 타입만을 체크한다.
//? class : 변수의 타입도 체크하고 인스턴스도 생성할 수 있다.
export interface Board{ //* interface를 이용하여 모델의 타입들을 지정해주자.
    id : string;
    title : string;
    description : string;
    status : BoardStatus
}

//? 여기에 다른값이 들어오면 에러가남 그게 바로 enum
export enum BoardStatus{
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
} 