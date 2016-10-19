const express = require( "express" );
// var express = require( "express" );
const { json } = require( "body-parser" );
// var json = require( "body-parser" ).json;
const app = express();
const port = 4000;

app.use( json() );

const books = [
	{
		  title: "Harry Potter"
		, author: "J.K Rowling"
	}
	, {
		  title: "Rainbow Six"
		, author: "Tom Clancy"
	}
	, {
		  title: "Lord of the Rings"
		, author: "Tolkein"
	}
];

// HANDLING this type of request - $http.get( "someurl.com" )
app.get( "/api/books", ( request, response ) => {
	response.json( books );
} );

// app.get( "/", function( req, res ) {
//
// } )

// $http.post( "someurl.com", { data: "string" } );
app.post( "/api/books", ( req, res ) => {
	for ( let i = 0; i < books.length; i++ ) {
		if ( books[ i ].title === req.body.title ) {
			return res.status( 400 ).json( { error: "Book already exists" } );
		}
	}
	books.push( req.body );
	return res.status( 201 ).json( books );
} );

app.put( "/api/books", ( req, res ) => {
	for ( let i = 0; i < books.length; i++ ) {
		if ( books[ i ].title === req.body.title ) {
			books[ i ].author = req.body.author;
			return res.status( 200 ).json( books );
		}
	}
	return res.status( 404 ).json( { error: "Book title not found!" } );
} );


app.listen( port, () => console.log( `Express listening on ${ port }` ) );
// app.listen( port, function() { console.log( "Express listening on " + port ) } );
