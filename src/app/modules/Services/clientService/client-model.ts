
export class Client {
    firstName :string;
    lastName :string;
    balance : number= 0;
    dateOfBirth: string;
    branch: string;
    type: string; //either business or private
    id: number;
    constructor(b: object = {"First": "", "Last": "",
            "Dob": "1999-01-08", 
            "Balance": 0, "Branch": "","Type": "Private" ,"id": ""}){
            
            this.firstName= b["First"] ? b["First"] : b["firstName"];
            this.lastName= b["Last"] ? b["Last"] : b["lastName"];
            this.balance= b["Balance"] ? b["Balance"] : b["balance"] ? b["balance"] : 0;
            this.dateOfBirth= b["Dob"] ? (b["Dob"] as string).substring(0, 10) : b["dateOfBirth"];
            this.branch= b["Branch"] ? b["Branch"] : b["branch"];
            this.type= b["Type"] ? b["Type"] : b["type"];
            this.id= b["id"];
    }
}