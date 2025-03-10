const aiServices = require('../Services/ai.service')
module.exports.getReview = async(req, res) => {

    const code=req.body.code;
    
    // agar prompt nahi aya then follow below
    if(!code){
        return res.status(400).send('Sorry!!..promt is required');
    }
    const response = await aiServices(code);
    res.send(response);
}