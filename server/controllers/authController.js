const pgClient = require('pg');
const { request } = require('../app');
/**
 * Fonction qui va connecter l'utilisateur demander comment créer un utilisateur
 * @param {*} req 
 * @param {*} res 
 */
const connectionObj = new pgClient.Pool({user: 'uapv2102630', host: '127.0.0.1', 
    database: 'etd', password: 'X9WRfH', port: 5432 });
exports.login = (req, res) => {
    const login = req.query.login;
    const password = req.query.password;
    console.log('Login : ' + login + ' Mot de passe: ' + password);
    sql = "SELECT * FROM fredouil.compte WHERE mail = $1 AND motpasse = $2";
    updateStatutConnexion = "UPDATE fredouil.compte SET statutconnexion = 1 WHERE mail = $1";
    connectionObj.connect((err, client, done) => {
        if(err) {
            console.log('Error connecting to pg server' + err.stack);
        }
        else{
            console.log('Connection established / pg db server') ;
            client.query(sql,[login,password] ,(err, result) => {
                const responseData = {};
                if(err){
                    console.log('Erreur d\'exécution de la requete' + err.stack);
                    responseData.statusMsg='Connexion échouée';
                }
                // requête réussie => traitement du résultat stocké dans l'objet result
                else if((result.rows[0] != null) && (result.rows[0].password == request.body.pwd)){
                    request.session.isConnected = true; 
                    request.session.mail = login;
                    responseData.data=result.rows[0].lastname;
                    responseData.statusMsg='Connexion réussie : bonjour '+result.rows[0].firstname;
                    client.query(updateStatutConnexion,[login],(err,result) => {
                        if(err){
                            console.log('Erreur d\'exécution de la requete' + err.stack);
                            responseData.statusMsg='Erreur d\'update de statut de connexion';
                        }
                    }
                    );

                }
                else{
                    console.log('Connexion échouée : informations de connexion incorrecte');
                    responseData.statusMsg='Connexion échouée : informations de connexion incorrecte';
                };
                    res.send(responseData); // renvoi du résultat (ou des messages d'erreur)
            });
            client.release(); //= done()
        }
    });
};

/**
 * Fonction qui permet de détruire la session
 * @param {*} req 
 * @param {*} res 
 */
exports.logout = (req, res) => {
    updateStatutConnexion = "UPDATE fredouil.compte SET statutconnexion = 0 WHERE mail = $1";
    connectionObj.connect((err, client, done) => {
        if(err) {
            console.log('Erreur a la connexion du serveur' + err.stack);
        }
        else{
            console.log('connexion établie pour la déconnexion') ;
            client.query(updateStatutConnexion,[req.session.login],(err,result) => {
                if(err){
                    console.log('Erreur d\'exécution de la requete' + err.stack);
                    responseData.statusMsg='Erreur d\'update de statut de connexion';
                }
                else{
                    console.log('Déconnexion réussie');
                }
            });
            client.release(); //= done()
        }
    });
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Erreur lors de la déconnexion');
        }
        res.redirect('/');
    });
};
