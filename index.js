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
        //calls the static method form the Members calls to fetch a member.
        var foundMember = Member.getMemberById(id, this.members);
        if (foundMember.length > 0)
            return foundMember[0];
        else
            return "Member id number : " + id + " not found.";
    };
    Organization.prototype.removeMember = function (id) { };
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
        return foundMember;
    };
    return Member;
}());
var org = new Organization();
org.addMember("Joseph", "Rothson");
org.addMember("Mary", "Gonzalez");
org.addMember("Jordan", "Smith");
org.addMember("Lynn", "Reed");
org.addMember("Marco", "Puewler");
console.log(org.getMemberById(1003));
