(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListController', ShoppingListController)
.provider('ShoppingListServiceProvider_Name', ShoppingListServiceProvider_Fonction)
.config(Config)
;

Config.$inject = ['ShoppingListServiceProvider_NameProvider'];
function Config(ShoppingListServiceProvider_NameProvider) {

  ShoppingListServiceProvider_NameProvider.default.maxItems = 3;

  console.log("Max Items : ", ShoppingListServiceProvider_NameProvider.default.maxItems);

};


ShoppingListController.$inject = ['ShoppingListServiceProvider_Name'];
function ShoppingListController(ShoppingListServiceProvider_Name) {

  var list = this;

  list.ItemName = "";
  list.ItemQuantity = "";

console.log("Max Items : ", ShoppingListServiceProvider_Name.default);

  list.addItem = function () {

    try {
      ShoppingListServiceProvider_Name.addItem(list.ItemName , list.ItemQuantity);
    } catch (e) {
      list.errorMessage = e.message;
    } finally {

    }

  };


  list.getItems = ShoppingListServiceProvider_Name.getItems();

  list.RemoveItem = function (indexItem) {
    ShoppingListServiceProvider_Name.RemoveItem(indexItem);
    list.errorMessage = "";
  };

};





function ShoppingListService_Service(MaxItems) {

  var service = this;

  var Items = [];

  service.addItem = function (itemName, itemQuantity) {

    if( (MaxItems === undefined) ||
        ( MaxItems !== undefined && Items.length < MaxItems)
      )
      {
        var item = {
          name: itemName,
          quantity: itemQuantity
        };

        Items.push(item);
      }
      else {
        throw new Error("Max of Items ( " +MaxItems+ " ) was reached");
      }

  };

  service.getItems = function () {
    return Items;
  };

  service.RemoveItem = function (indexItem) {
    Items.splice(indexItem , 1);
  };

};


function ShoppingListServiceProvider_Fonction() {

  var provider = this;

  provider.default = {
    maxItems: 10
  };

  provider.$get = function () {
    return new ShoppingListService_Service(provider.default.maxItems);
  };

};





})();
