const express = require( 'express' );
const path = require( 'path' );
const morgan = require( 'morgan' );
const multer = require( 'multer' );
const uuid = require( 'uuid/v4' );
const { format } = require( 'timeago.js' );

//initializations
const app = express();
require( './database' );

//settings
app.set( 'port', process.env.PORT || 3000 );
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'ejs' );

//middlewares
app.use( morgan( 'dev' ) );
app.use( express.urlencoded( { extended: false } ) );
const storage = multer.diskStorage( {
    destination: path.join( __dirname, 'public/img/uploads' ),
    filename: ( req, file, cb, filename ) => {
        cb( null, uuid() + path.extname( file.originalname ) );
    }
} );
app.use( multer( { 
    storage  
} ).single( 'image' ) );

//global variables
app.use( ( req, res, netx ) => {
    app.locals.format = format;
    netx();
} );

//routes
app.use( require( './routes/index.routes.js' ) );

//static files
app.use( express.static( path.join( __dirname, 'public' ) ) ); //carpeta public pueda ser accedida desde navegador

//init server
app.listen( app.get( 'port' ), () => {
    console.log( `Server on port ${ app.get( 'port' ) }` );
} );