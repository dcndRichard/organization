var randNumbRange = function (min, max) {
    //max not included in range
    var rand = Math.floor(Math.random() * (max - min) + min);
    return rand;
};
var idGenerator = function (initialNum, max) {
    var ids = [];
    for (var i = initialNum; i < initialNum + max; i++) {
        ids.push(i);
    }
    return ids;
};
var Organization = /** @class */ (function () {
    function Organization(name) {
        if (name === void 0) { name = "NoName Co."; }
        this.name = name;
        this.maxMembers = 5;
        this.members = [];
        this.availMemberIds = idGenerator(1001, this.maxMembers); //an array of desinated ids
        this.waitingList = new MemberWaitingListQueue();
    }
    Organization.prototype.getVacantMemberships = function () {
        return this.availMemberIds;
    };
    Organization.prototype.getMembers = function () {
        return this.members;
    };
    Organization.prototype.getWaitingList = function () {
        return this.waitingList;
    };
    Organization.prototype.addMember = function (fn, ln) {
        // fn = fn.toLowerCase();
        // ln = ln.toLowerCase();
        if (this.members.length >= this.maxMembers) {
            this.waitingList.enqueue({ fn: fn, ln: ln });
            return false;
        }
        //checks if any member ids are available
        if (this.availMemberIds.length === 0)
            return false;
        //create a new id for member
        var id = parseInt(this.availMemberIds
            .splice(randNumbRange(0, idGenerator.length - 1), 1)
            .join(""));
        //creates a new member
        var member = new Member(id, fn, ln);
        //pushes new member to the members array
        this.members.push(member);
    };
    Organization.prototype.getMemberById = function (id) {
        return Member.getMemberById(id, this.members);
    };
    Organization.prototype.removeMember = function (id) {
        var _a;
        //restore removed members id to availMemberIds array
        var removedMember = Member.removeMemberById(id, this.members);
        this.availMemberIds.push(removedMember["id"]);
        if (this.members.length < this.maxMembers) {
            var member = (_a = this.waitingList.dequeue()) === null || _a === void 0 ? void 0 : _a.value;
            this.addMember(member['fn'], member['ln']);
        }
        return removedMember;
    };
    return Organization;
}());
var Member = /** @class */ (function () {
    function Member(id, fn, ln) {
        this.id = id;
        this.fn = fn;
        this.ln = ln;
    }
    Member.getMemberById = function (id, membersArr) {
        var foundMember = membersArr.filter(function (member) {
            return member["id"] === id;
        });
        //if found, returns the object in the 1 item array or string message.
        if (foundMember.length > 0)
            return foundMember[0];
        else
            return "Member id: " + id + " not found,";
    };
    Member.removeMemberById = function (id, membersArr) {
        //loops over the membersArr in the organization to find id match, if found return an object containingremoved member, if not return string message.
        for (var i = 0; i < membersArr.length; i++) {
            if (membersArr[i]["id"] === id) {
                var removedMember = membersArr.splice(i, 1);
                return removedMember[0];
            }
        }
        return "Unsuccessful member removal. Member id: " + id + " not found.";
    };
    return Member;
}());
var NodeQ = /** @class */ (function () {
    function NodeQ(value) {
        this.value = value;
        this.next = null;
    }
    return NodeQ;
}());
var MemberWaitingListQueue = /** @class */ (function () {
    function MemberWaitingListQueue() {
        this.first = null;
        this.last = null;
        this.length = 0;
        // this.first = new NodeQ(value);
        // this.last = this.first;
        // this.length = 1;
    }
    MemberWaitingListQueue.prototype.enqueue = function (value) {
        var node = new NodeQ(value);
        if (!this.first) {
            this.first = node;
            this.last = node;
        }
        else {
            this.last.next = node;
            this.last = node;
        }
        this.length++;
        return this;
    };
    MemberWaitingListQueue.prototype.dequeue = function () {
        var temp = this.first;
        if (this.length === 0)
            return undefined;
        if (this.length === 1) {
            this.first = null;
            this.last = null;
        }
        else {
            this.first = this.first.next;
            temp.next = null;
        }
        this.length--;
        return temp;
    };
    MemberWaitingListQueue.prototype.showQueueList = function () {
        var temp = this.first;
        var line = "";
        while (temp) {
            line += temp.value["fn"] + " " + temp.value["ln"] + "\n";
            temp = temp.next;
        }
        return line;
    };
    return MemberWaitingListQueue;
}());
var org = new Organization();
org.addMember("Joseph", "Rothson");
org.addMember("Mary", "Gonzalez");
org.addMember("Jordan", "Smith");
org.addMember("Lynn", "Reed");
org.addMember("Marco", "Puewler");
org.addMember("tyler", "lockett");
console.log(org.getMembers());
console.log(org.getWaitingList());
console.log(org.removeMember(1002));
console.log(org.getWaitingList());
console.log(org.getMembers());
console.log(org.getVacantMemberships());
// waitingList.enqueue({ fn: "tyler", ln: "lockett" });
// waitingList.enqueue({ fn: "marshawn", ln: "lynch" });
// waitingList.enqueue({ fn: "cooper", ln: "kupp" });
