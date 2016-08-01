import { Meteor } from "meteor/meteor";
import { expect } from "meteor/practicalmeteor:chai";
import { Roles } from "meteor/alanning:roles";
import { getUser } from "/server/imports/fixtures/users";
import { getShop } from "/server/imports/fixtures/shops";
import { Accounts, Packages, Orders, Products, Shops, Cart }  from "/lib/collections";
import Fixtures from "/server/imports/fixtures";
import { Reaction } from "/server/api";


Fixtures();

//generate second shop
describe("Permissions for Multi Shop", function () {
    describe("Validate Admin permissions", function () {
        const shopId = getShop()._id;
        const shopName = getShop().name;
        console.log(getShop());
        const fakeUser = Factory.create("account");
        const sessionId = Random.id();
        it("verify permissions against roles", function (done) {
            //console.log("shopID =" + shopId);
            console.log("accountInfo=" + fakeUser._id);
            //console.log(getUser().username);
            let names = [];
            function roleNames(callback) {
                Roles.addUsersToRoles(fakeUser._id, 'admin', Roles.GLOBAL_GROUP);
                //expect(Roles.userIsInRole(fakeUser._id, 'admin', shopId)).to.be.true;
                //const user = Meteor.users.findOne(fakeUser._id);
                callback(expect(Roles.userIsInRole(fakeUser._id, 'admin', Roles.GLOBAL_GROUP)).to.be.true);

                console.log("user", fakeUser);
            }
            console.log(roleNames());
            //names.push(roleNames);
            console.log(names);
            var x;
            for (x in names) {
                console.log(x);
                expect(Reaction.hasPermission([x], fakeUser, shopId)).to.be.true;
            }
                return done();
            });
        });

        it("", function (done) {
// create additional user
                return done();
            });
});


//update fake user to admin role
