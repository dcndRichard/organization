const randNumbRange = (min, max): number => {
  //max not included in range
  const rand = Math.floor(Math.random() * (max - min) + min);
  return rand;
};

const idGenerator = (initialNum: number, max: number): number[] => {
  const ids: number[] = [];
  for (let i: number = initialNum; i < initialNum + max; i++) {
    ids.push(i);
  }
  return ids;
};

class Organization {
  name: string;
  maxMembers: number;
  members: object[];
  availMemberIds: number[];

  constructor(name: string = "NoName Co.") {
    this.name = name;
    this.maxMembers = 20;
    this.members = [];
    this.availMemberIds = idGenerator(1001, this.maxMembers); //an array of desinated ids
  }
  addMember(fn: string, ln: string) {
    //checks if any member ids are available
    if (this.availMemberIds.length === 0) return false;

    //create a new id for member
    let id: number = parseInt(
      this.availMemberIds
        .splice(randNumbRange(0, idGenerator.length - 1), 1)
        .join("")
    );
    //creates a new member
    let member: Member = new Member(id, fn, ln);

    //pushes new member to the members array
    this.members.push(member);
  }

  getMemberById(id): object | string {
    //calls the static method form the Members calls to fetch a member.
    let foundMember: object[] = Member.getMemberById(id, this.members);

    if (foundMember.length > 0) return foundMember[0];
    else return `Member id number : ${id} not found.`;
  }

  removeMember(id) {}
}

class Member {
  private id: number;
  private fn: string;
  private ln: string;
  public constructor(id:number, fn:string, ln:string) {
    this.id = id;
    this.fn = fn;
    this.ln = ln;
  }

  public static getMemberById(id, membersArr): object[] {
    let foundMember: object[] = membersArr.filter(member => {
      return member["id"] === id;
    });
    return foundMember;
  }
}

let org = new Organization();
org.addMember("Joseph", "Rothson");
org.addMember("Mary", "Gonzalez");
org.addMember("Jordan", "Smith");
org.addMember("Lynn", "Reed");
org.addMember("Marco", "Puewler");


console.log(org.getMemberById(1003));
