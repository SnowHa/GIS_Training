
export class Bank {
    name :string;
    total_balance : number;
    
    constructor(b: object = {"Name": "", "Total_balance": 0}){
        this.name= b["Name"];
        this.total_balance= b["Total_balance"];
    }
}