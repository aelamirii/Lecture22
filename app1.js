(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListController', ShoppingListController)
.provider('ShoppingListService', ShoppingListServiceProvider)
.config(Config)
;

Config.$inject = ['ShoppingListServiceProvider'];
function Config(ShoppingListServiceProvider) {
  ShoppingListServiceProvider.default.maxItems = 3;

};


// Shopping List Controller
ShoppingListController.$inject = ['ShoppingListService'];
function ShoppingListController(ShoppingListService) {

  var list = this;

  list.ItemName = "";
  list.ItemQuantity = "";


  list.addItem = function () {

    try {
      ShoppingListService.addItem(list.ItemName, list.ItemQuantity);
    } catch (e) {
      list.errorMessage = e.message;
    } finally {

    }

  };

  list.getItems = ShoppingListService.getItems();

  list.RemoveItem = function (indexItem) {
    ShoppingListService.RemoveItem(indexItem);
  };

};




function ShoppingListServiceService(maxItems) {

  var service = this;

  var Items = [];


  service.addItem = function (itemName, itemQuantity) {

    if( ( maxItems === undefined) ||
        ( maxItems !== undefined && Items.length < maxItems)
      )
        {

          var item ={
            name: itemName,
            quantity: itemQuantity
          };

          Items.push( item );

        }
        else {
          throw new Error ("Max items ("+ maxItems +") was reached");
        }
  };


  service.getItems = function () {
    return Items;
  };

  service.RemoveItem = function (indexItem) {
    Items.splice( indexItem , 1 );
  };

};



function ShoppingListServiceProvider() {

  var provider = this;

  provider.default = {
    maxItems: 10
  };

  provider.$get = function () {
    return new ShoppingListServiceService(provider.default.maxItems);
  };

};






})();
