const { response } = require("express");
const { uploadFile } = require("../helpers");

const loadFiles = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.records) {
    res.status(400).json("No hay archivos que subir.");
    return;
  }

  try {
    // txt, md
    //const name = await uploadFile(req.files, ["txt", "md"], "texts");
    const name = await uploadFile(req.files, undefined, "imgs");
    res.json({ name });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};


const updateImage = async(req, res = response ) => {

  const { id, collection } = req.params;

  let modelo;

  switch ( collection ) {
      case 'usuarios':
          modelo = await Usuario.findById(id);
          if ( !modelo ) {
              return res.status(400).json({
                  msg: `No existe un usuario con el id ${ id }`
              });
          }
      
      break;

      case 'productos':
          modelo = await Producto.findById(id);
          if ( !modelo ) {
              return res.status(400).json({
                  msg: `No existe un producto con el id ${ id }`
              });
          }
      
      break;
  
      default:
          return res.status(500).json({ msg: 'Se me olvidó validar esto'});
  }


  // Limpiar imágenes previas
  if ( modelo.img ) {
      // Hay que borrar la imagen del servidor
      const pathImagen = path.join( __dirname, '../uploads', collection, modelo.img );
      if ( fs.existsSync( pathImagen ) ) {
          fs.unlinkSync( pathImagen );
      }
  }


  const nombre = await subirArchivo( req.files, undefined, collection );
  modelo.img = nombre;

  await modelo.save();


  res.json( modelo );

}

module.exports = {
  loadFiles,
  updateImage
};
