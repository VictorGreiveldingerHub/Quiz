const dbConnection = require('../dbConnection');

// Création d'un coreModels pour éviter la répétition dans les classes 
class CoreModel {
    // Mise en place des propriétés
    id;
    status;
    created_at;
    updated_at;
    
    // Mise en place du constructor
    // Prend en param un objet qui contient toutes les valeurs à recopier dans l'instance
    constructor(obj) {
        this.id = obj.id;
        this.status = obj.status;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
    };
    
    // Mise en place de quelques Getter / Setter pour voir le fonctionnement,
    // Avant d'utiliser Sequelize qui le fera pour nous
    
    getId() {
        // Retourne seulement un id,
        return this.id;
    };
    
    setId(value) {
        // Ici je veux vérifier que id est bien un nombre entier
        if (Number.isInteger(value)) {
            // Si c'est bien un entier, je l'accepte
            this.id = value;
        } else {
            // On lève ou jeter une exception (==> une erreur qui est levée)
            throw Error("ID must be an integer value");
        };
    };
    
    // Test de this en méthode normal + statique
    showThis () { // Normal
        console.log(this);
    };
    
    static showStaticThis () { // statique
        console.log(this);
    };
    
    
    // Méthode pour afficher tous les users
    static findAll(callback) {
        // Query pour récupérer tous les users de la BDD ...
        
        // Mais pour pouvoir sépcifier la table dans laquelle aller récupérer les infos, il faut mettre une variable
        // statique dans chaque classe, lorsqu'on appelera cette methode avec "User.findAll", alors this correspondra
        // a User, et donc this.tableNAme sera la propriété tableName de User.
        // Donc rajout d'une prop statique dans TOUTES les classes !
        
        // const query = `SELECT * FROM "app_users"`;
        const query = `SELECT * FROM "${this.tableName}"`;
        
        // ... on passe la requête au client, avec un callback qu'on doit passer en argument à findAll(),
        dbConnection.query(query, (err, data) => {
            if (err) {
                console.log(err);
                // On passe l'erreur mais pas la data
                callback(err, null);
            } else {
                // console.log(data);
                // Pas d'erreur donc on renvoie la liste des résultats au callback
                // liste des résultats dans data.rows (==> liste d'objet)
                
                // Donc avant de récup les résults => on les tranforme en instance de User
                let allModels = [];
                
                for (let prop in data.rows) {
                    // console.log(data.rows[prop]);
                    // console.log(data.rows);
                    
                    // console.log(users);
                    allModels.push(new this(data.rows[prop]));
                };
                // console.log(allUsers);
                callback(null, allModels);
            };
        });
    };
};

// On export la classe !
module.exports = CoreModel;