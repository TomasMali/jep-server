

const Visiting = require('./boardModel')
const express = require('express')
const router = express.Router()


// First route, get all visiting
/**Da chiamare
 * http://localhost:3000/visiting/
 * 
 */
// First route, get all Menu
router.get('/', (req, res, next) => {
    //  const id = req.params.telegramId;
    Visiting.find()
          .exec().
          then(doc => {
              if(doc.length){
               //   console.log(doc.length)
                  res.status(200).json({
                      message: doc
                  })
              }
              else
              res.status(200).json({
                  message: false
              })
         
          })
          .catch(err => {
              console.log(err)
              res.status(500).json({ error: 'errtr ' +err })
          })
  
  })


// First route, get all users
/**
 * http://localhost:3000/visiting/getVisiting/MLATMS92P09Z100D
 */
router.get('/getVisiting/:piva', (req, res, next) => {
    const piva = req.params.piva;
    Visiting.find({PIVA: piva})
          .exec().
          then(doc => {
            if (doc.length) {
                res.status(200)
                    .json({ message: doc});
            }
            else
                res.status(200)
                    .json({ message: "Nessun risultato trovao" });
    
         
          })
          .catch(err => {
              console.log(err)
              res.status(500).json({ error: err })
          })
  
  })


/**
 *  POST REQUEST Inserisce un menu solo se non esiste. 
 * // Da chimare  
{
	"piva": "MLATMS92P09Z100C",
	"docname" : "tomas.C20"
}

 */
router.post('/insert', (req, res, next) => {
    const wi_ = req.body.wi;
    const storyPoints_ = req.body.storyPoints;
    const owner_ = req.body.owner;
    const description_ = req.body.description;
    const state_ = req.body.state;




    Visiting.find({ wi: wi_ }, function (err, docs) {
        if (docs.length) {
            Visiting.updateOne(
                    { wi: wi_ },
                    {$set: { "state" : state_}}
                ).exec()
                    .then(result => {
                        if (result.nModified != 0)
                        res.status(200)
                        .json({ message: "Work Item: " + wi_ + "  modificato correttamente"});
                        else
                        res.status(200)
                        .json({ message: "Documento non modificato correnttamente"});
                      
                    })


        } else {
            // Lo creo nuovo
            const workItem = new Visiting({
                wi: wi_,
                storyPoints: storyPoints_,
              owner: owner_,
              description: description_,
              state: state_

            });
            

            workItem.save()
                .then(result => {
              //      console.log("Menu " + result + " inserted correctly!")
                  res.send( "New inserted correctly!")
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ error: err })
                });


        }
    });

})








/**
 *  POST REQUEST Login password 
 * // Da chimare  
{
	"pass": ".....",
}
 */
router.post('/login', (req, res, next) => {
    const pass = req.body.pass;
  
  if(pass == "jexp2020_admin")
  res.send(true)
    else
    res.send(false)

})































module.exports = router;