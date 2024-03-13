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
        this.maxMembers = 20;
        this.members = [];
        this.availMemberIds = idGenerator(1001, this.maxMembers); //an array of desinated ids
    }
    Organization.prototype.getVacantMemberships = function () {
        return this.availMemberIds;
    };
    Organization.prototype.addMember = function (fn, ln) {
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
        //restore removed members id to availMemberIds array
        var removedMember = Member.removeMemberById(id, this.members);
        this.availMemberIds.push(removedMember["id"]);
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
var org = new Organization();
org.addMember("Joseph", "Rothson");
org.addMember("Mary", "Gonzalez");
org.addMember("Jordan", "Smith");
org.addMember("Lynn", "Reed");
org.addMember("Marco", "Puewler");
console.log(org.getVacantMemberships());
console.log(org.removeMember(1001));
console.log(org.getVacantMemberships());
