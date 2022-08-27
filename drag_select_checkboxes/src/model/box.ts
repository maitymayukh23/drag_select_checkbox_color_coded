export class Box {
    boxId: number=0;
    status: boolean=false;
    color:string='white';
    constructor(boxId:number,status:boolean,color:string){
        this.boxId=boxId;
        this.status=status;
        this.color=color;
    }
}
