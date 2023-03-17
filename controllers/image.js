const Clarifai = require('clarifai');


	const app = new Clarifai.App({

  apiKey: '60c7624765a94d0da89b167d2d1c9de6'

});

	const handleApiCall = (req,res ) => {

	//   app.models
	//   .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	//   .then(data => {
	//   	res.json(data);
	//   })
	//   .catch(err=> res.status(400).json('unable to work with API'))
	// }
	//   // above lines are old model
	  
	  app.models.predict('face-detection', req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res,db ) => {
const {id} = req.body;
db('users').where('id','=', id )
.increment('entries', 1)
.returning('entries')
.then(entries => {
	res.json(entries[0].entries);
})
	.catch(err => res.status(400).json('unable to get entries'))
}
module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};
