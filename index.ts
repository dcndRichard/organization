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
  private name: string;
  private maxMembers: number;
  private members: object[];
  private availMemberIds: number[];

  constructor(name: string = "NoName Co.") {
    this.name = name;
    this.maxMembers = 20;
    this.members = [];
    this.availMemberIds = idGenerator(1001, this.maxMembers); //an array of desinated ids
  }
  getVacantMemberships() {
    return this.availMemberIds;
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
    return Member.getMemberById(id, this.members);
  }

  removeMember(id): object | string {
    //restore removed members id to availMemberIds array
    let removedMember = Member.removeMemberById(id, this.members);
    this.availMemberIds.push(removedMember["id"]);
    return removedMember;
  }
}

class Member {
  private id: number;
  private fn: string;
  private ln: string;

  public constructor(id: number, fn: string, ln: string) {
    this.id = id;
    this.fn = fn;
    this.ln = ln;
  }

  public static getMemberById(
    id: number,
    membersArr: object[]
  ): object | string {
    let foundMember: object[] = membersArr.filter(member => {
      return member["id"] === id;
    });
    //if found, returns the object in the 1 item array or string message.
    if (foundMember.length > 0) return foundMember[0];
    else return `Member id: ${id} not found,`;
  }

  public static removeMemberById(
    id: number,
    membersArr: object[]
  ): object | string {
    //loops over the membersArr in the organization to find id match, if found return an object containingremoved member, if not return string message.
    for (let i: number = 0; i < membersArr.length; i++) {
      if (membersArr[i]["id"] === id) {
        let removedMember: object[] = membersArr.splice(i, 1);
        return removedMember[0];
      }
    }
    return `Unsuccessful member removal. Member id: ${id} not found.`;
  }
}

let org = new Organization();
org.addMember("Joseph", "Rothson");
org.addMember("Mary", "Gonzalez");
org.addMember("Jordan", "Smith");
org.addMember("Lynn", "Reed");
org.addMember("Marco", "Puewler");
console.log(org.getVacantMemberships())
console.log(org.removeMember(1001));
console.log(org.getVacantMemberships())

