const { Router } = require( 'express' );
const path = require( 'path' );
const { unlink } = require( 'fs-extra' );

const router = Router();
const Image = require( '../models/Image' );

router.get( '/', async ( req, res ) => {
    const images = await Image.find();
    res.render( 'index', { images } );
} );

router.get( '/upload', ( req, res ) => {
    res.render( '../views/upload' );
} );

router.post( '/upload', async ( req, res ) => {
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

    await image.save();
    res.redirect( '/' );
} );

router.get( '/image/:id', async ( req, res ) => {
    const { id } = req.params;
    const img = await Image.findById( id );
    res.render( 'profile', { img } );
} );

router.get( '/image/:id/delete', async ( req, res ) => {
    const { id } = req.params;
    const img = await Image.findByIdAndDelete( id );
    unlink( path.resolve( './src/public' + img.path ) );
    res.redirect( '/' );
} );

module.exports = router;