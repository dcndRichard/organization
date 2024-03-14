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
  private waitingList: MemberWaitingListQueue;
  constructor(name: string = "NoName Co.") {
    this.name = name;
    this.maxMembers = 5;
    this.members = [];
    this.availMemberIds = idGenerator(1001, this.maxMembers); //an array of desinated ids
    this.waitingList = new MemberWaitingListQueue();
  }
  getVacantMemberships() {
    return this.availMemberIds;
  }
  getMembers() {
    return this.members;
  }
  getWaitingList() {
    return this.waitingList;
  }

  addMember(fn: string, ln: string) {
    // fn = fn.toLowerCase();
    // ln = ln.toLowerCase();

    if (this.members.length >= this.maxMembers) {
      this.waitingList.enqueue({ fn: fn, ln: ln });
      return false;
    }

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
    if (this.members.length < this.maxMembers) {
      let member = this.waitingList.dequeue()?.value;
      this.addMember(member!['fn'],member!['ln']);
    }
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

class NodeQ {
  value: object;
  next: NodeQ | null;
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class MemberWaitingListQueue {
  first: NodeQ | null;
  last: NodeQ | null;
  length: number;
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
    // this.first = new NodeQ(value);
    // this.last = this.first;
    // this.length = 1;
  }
  enqueue(value: object) {
    let node: NodeQ = new NodeQ(value);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      this.last!.next = node;
      this.last = node;
    }
    this.length++;
    return this;
  }

  dequeue(): NodeQ | undefined {
    let temp = this.first;
    if (this.length === 0) return undefined;
    if (this.length === 1) {
      this.first = null;
      this.last = null;
    } else {
      this.first = this.first!.next;
      temp!.next = null;
    }
    this.length--;
    return temp!;
  }
  showQueueList(): string {
    let temp: NodeQ | null = this.first;
    let line: string = "";
    while (temp) {
      line += `${temp.value["fn"]} ${temp.value["ln"]}\n`;
      temp = temp.next;
    }
    return line;
  }
}




let org = new Organization();
org.addMember("Joseph", "Rothson");
org.addMember("Mary", "Gonzalez");
org.addMember("Jordan", "Smith");
org.addMember("Lynn", "Reed");
org.addMember("Marco", "Puewler");
org.addMember("tyler", "lockett");


console.log(org.getMembers())
console.log(org.getWaitingList())
console.log(org.removeMember(1002))
console.log(org.getWaitingList())
console.log(org.getMembers())
console.log(org.getVacantMemberships())




// waitingList.enqueue({ fn: "marshawn", ln: "lynch" });
// waitingList.enqueue({ fn: "cooper", ln: "kupp" });