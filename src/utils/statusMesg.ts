export class ApiResponse{
    status:any;
    message:any;
    data:any;
    constructor(status=200,message='success',data=[]){
        this.status=status;
        this.message=message;
        this.data=data;
    }
}
export class ErrorResponse{
    status:any;
    message:any;
    data:any;
    constructor(status=400,message='Fails'){
        this.status=status;
        this.message=message;
    }
}
