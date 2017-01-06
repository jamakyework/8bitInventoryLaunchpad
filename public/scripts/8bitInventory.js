// properties by which searches can be done
var sizes = [ 'small', 'medium', 'large' ];
var colors = [ 'red', 'orange', 'yellow', 'green', 'mermaid treasure', 'blue', 'purple' ];

////// global array of items in inventory //////
var items = [];


$( document ).ready( function(){
  var colorIn = $("colorIn").val();
  var nameIn= $("nameIn").val();
  var sizeIn= $("sizeIn").val() ;

  var addObject = function( colorIn, nameIn, sizeIn ){
    console.log( 'in addObject' );
    // assemble object from new fields
    var newItem = {
      color: colorIn,
      name: nameIn,
      size: sizeIn
    }; // end testObject
    console.log( 'adding:', newItem );
    ////// TODO: add ajax call to addItem route to add this item to the table
    // add to items array
    $.ajax({
    type: "POST",
    url: "/addItem",
    data: newItem,
    success: function( response){
      console.log( 'back from post call:', response );
    }, // end success
    error: function(){
      console.log( 'error with ajax call...');
    } // end error
  }); // end ajax
   items.push( newItem );
}; // end addObject


var getObjects = function(){
  console.log( 'in getObjects');
  // populate the items array
  ////// TODO: replace the stuff in this function with getting items from the database ////////
  ////// hint: make a get call to the getInventory and use it's response data to fill the items array ////////\
  // test get function
$.ajax({
  type: 'GET',
  url: '/getInventory',
  success: function( response ){
    console.log( 'back from get call:', response );
    // displayMatches( response );
  }, // end success
  error: function(){
    console.log( 'error with ajax call...');
  } // end error
}); // end ajax
items.push( response );
}; // end getInventory

  var searchInventory = function( colorCheck, sizeCheck ){
    console.log( 'in searchInventory. Looking for:', colorCheck, sizeCheck );
    // array of matches
    var matches = [];
    for ( var i = 0; i < items.length; i++ ) {
      if( items[i].color == colorCheck && items[i].size == sizeCheck ){
        // match, add to array
        matches.push( items[i] );
      } // end if
    } // end for
    console.log( 'matches:', matches );
    ////// TODO: display matches
    displayMatches(matches);
  }; // end searchInventory

var displayMatches = function( allMatches ){
  // empty outputDiv
  $( '#outputDiv' ).html( '' );
  var outputText = '';
  for (var i = 0; i < allMatches.length; i++) {
    $( '#outputDiv' ).append( '<p>' + allMatches[i].name + '</p>' );
  } // end for
}; // end displayMatches

  // get objects when doc is ready
  getObjects();
  // the below are tests to show what is returned when running searchInventory
  addObject( 'blue', 'blueberry', 'small' );
  searchInventory( 'blue', 'small' );
  searchInventory( 'blue', 'large' );
}); // end doc ready
