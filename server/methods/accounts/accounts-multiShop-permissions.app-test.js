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
    describe.only("Validate Admin permissions", function () {
        const shopId = getShop()._id;
        const shopName = getShop().name;
        console.log(getShop());
        const sessionId = Random.id();
        it("verify permissions against roles", function (done) {
            const fakeUser = Factory.create("user");
            let roles = [];
            Roles.addUsersToRoles(fakeUser._id, 'admin', Roles.GLOBAL_GROUP);
            expect(Roles.userIsInRole(fakeUser._id, 'admin', Roles.GLOBAL_GROUP)).to.be.true;

            console.log(roles);
            var x;
            for (x in roles) {
                console.log(x);
                expect(Reaction.hasPermission([x], fakeUser, shopId)).to.be.true;
            }
                return done();
            });
        });
});


//update fake user to admin role
