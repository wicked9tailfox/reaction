import { Meteor } from "meteor/meteor";
import { expect } from "meteor/practicalmeteor:chai";
import { Roles } from "meteor/alanning:roles";
import { Packages } from "/lib/collections";
import { getShop } from "/server/imports/fixtures/shops";
import Fixtures from "/server/imports/fixtures";
import { sinon } from "meteor/practicalmeteor:sinon";

Fixtures();

// generate second shop
describe("Core permissions test", function () {
  describe.only("Validate Core User permissions", function () {
    let sandbox;
    let originals;
    const packageData = {"$set": {
      "settings.openexchangerates.appId": "fake",
      "settings.openexchangerates.refreshPeriod": "Every 1 hours"
    }};
    const shopId = getShop()._id;
    const fakeUser = Factory.create("user");

    before(function () {
      originals = {
        updateShopExternalServices: Meteor.server.method_handlers["shop/updateShopExternalServices"]
      };
    });

    beforeEach(function () {
      sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
      sandbox.restore();
    });

    function spyOnMethod(method, id) {
      return sandbox.stub(Meteor.server.method_handlers, `shop/${method}`, function () {
        check(arguments, [Match.Any]); // to prevent audit_arguments from complaining
        this.userId = id;
        return originals[method].apply(this, arguments);
      });
    }

    it("shop/updateShopExternalServices should return 403", function () {
      Roles.addUsersToRoles(fakeUser._id, "fake", shopId);
      let updatePackagesSpy = sandbox.spy(Packages, "update");
      spyOnMethod("updateShopExternalServices", fakeUser._id);
      expect(() => {
        Meteor.call("shop/updateShopExternalServices", packageData, "fake");
      }).to.throw(Meteor.Error, /Access Denied/);
      expect(updatePackagesSpy).to.not.have.been.called;
    });

    it("shop/updateShopExternalServices should execute when you have core permissions", function () {
      Roles.addUsersToRoles(fakeUser._id, "core", shopId);
      let updatePackagesSpy = sandbox.spy(Packages, "update");
      spyOnMethod("updateShopExternalServices", fakeUser._id);
      expect(() => {
        Meteor.call("shop/updateShopExternalServices", packageData, "fake");
      }).to.not.throw(Meteor.Error, /Access Denied/);
      expect(updatePackagesSpy).to.have.been.called;
    });
  });
});
