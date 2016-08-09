import { Meteor } from "meteor/meteor";
import { expect } from "meteor/practicalmeteor:chai";
import { Roles } from "meteor/alanning:roles";
import { getShop } from "/server/imports/fixtures/shops";
import Fixtures from "/server/imports/fixtures";
import { sinon } from "meteor/practicalmeteor:sinon";

Fixtures();

// generate second shop
describe("Core permissions test", function () {
  describe.only("Validate User permissions", function () {

    beforeEach(function () {
      sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
      sandbox.restore();
    });

    it("shop/updateShopExternalServices", function () {
      const shopId = getShop()._id;
      const fakeUser = Factory.create("user");
      // pull 'core' from the db
      Roles.addUsersToRoles(fakeUser._id, 'core', shopId);
      let someSpy = sandbox.spy()
      spy.Collections.Packages.update(_id, modifier);



    });
  });
});
