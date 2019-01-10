const admin = require('firebase-admin');

module.exports = function(req,res) {
    if(!req.body.phone || !req.body.code){
        return res.status(422).send({ error: 'You must provide a valid code and phone number' });
    }
  
    const phone = String(req.body.phone).replace(/[^\d]/g, '');
    const code = parseInt(req.body.code);


    admin.auth().getUser(phone)
     .then(()=> {
       const ref =  admin.database().ref('usercodes/' + phone)  
       ref.on('value', snapshot => {
            ref.off();
            const user = snapshot.val();

            if (user.code !== code || !user.codeValid) {
                return res.status(422).send({ error: 'Code not valid' });
            }

            ref.update({ codeValid: false});
            admin.auth().createCustomToken(phone)
             .then((token)=> res.send({ token: token}))
        })
     })
     .catch((e)=> {
        res.status(422).send({ error: e });
     })

}