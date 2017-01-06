var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var pg = require( 'pg' );
var urlEncodedParser = bodyParser.urlencoded( { extended: false } );
var port = process.env.PORT || 3003;
var connectionString = 'postgres://localhost:5432/inventory';
// spin up server
app.listen( port, function(){
  console.log( 'server up on:', port );
}); // end spin up server

// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve( 'views/index.html' ) );
}); // end home base

// add new objects to the inventory
app.post( '/addItem', urlEncodedParser, function( req, res ){
  console.log( 'addItem route hit:', req.body );
  pg.connect( connectionString, function( err, client, done ){
      if( err ){
        console.log( err );
      }
      else{
        console.log( 'connected to db' );
        // use wildcards to insert record
        client.query( 'INSERT INTO items ( item, color, size ) values ( $1, $2, $3 )', [ req.body.name, req.body.color, req.body.size] );
        done();
        res.send( 'post is in' );
      }
    }); // end db connection
  }); // endPost

// get all objects in the inventory
app.get( '/getItems', function( req, res ){
  console.log( 'getItems route hit' );
  // get all items in the table and return them to client
  // connect to db
  pg.connect( connectionString, function( err, client, done ){
    if( err ){
      console.log( err );
    } // end error
    else{
      console.log( 'connected to db' );
      var query = client.query( 'SELECT * from items') ;
      // array for inventory items
      var inventoryItems = [];
      query.on( 'row', function( row ){
        // push this items into the new array
        inventoryItems.push( row );
      });
      query.on( 'end', function(){
        // finish the operation
        done();
        // send back data
        console.log( inventoryItems );
        // will this work?
        res.send( inventoryItems );
      });
    } // end no error
  }); // end connect
  }); // end testGet

// static folder
app.use( express.static( 'public' ) );
