
export class Branch {
    name :string;
    balance : number;
    x: number;
    y:number;
    bank: string;
    constructor(b: object = {"Name": "", "Balance": 0, "X": 0, "Y": 0,"Bank": ""}){
        this.name= b["Name"];
        this.balance= b["Balance"];
        this.x= b["X"];
        this.y= b["Y"];
        this.bank= b["Bank"];
    }
}