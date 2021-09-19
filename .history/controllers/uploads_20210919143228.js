const { response } = require("express");

const loadFiles = (req, res= response) =>{

    res.json({'Hola desde uploads'})
}

module.exports={ 
    loadFiles
}