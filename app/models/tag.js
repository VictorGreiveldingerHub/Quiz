const CoreModel = require('./coreModels');
const dbConnection = require('../dbConnection');

// Création d'une classe par entité 
class Tag extends CoreModel {
    // Mise en place des propriétés
    name;
    
    // Petite méthode pour afficher une phrase de présentation du tag
    getName() {
        return "Hello je suis le tag " + this.name;
    };
    
    // Mise en place du constructor
    // Prend en param un objet qui contient toutes les valeurs à recopier dans l'instance
    constructor(obj) {
        super(obj);
        this.name = obj.name;
    };
    
    // Méthode pour afficher tous les tags
    static findAll(callback) {
        // Query pour récupérer tous les tags de la BDD ...
        const query = `SELECT * FROM "tags"`;
                
        
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
                
                // Donc avant de récup les résults => on les tranforme en instance de Tag
                let allTags = [];
                
                for (let prop in data.rows) {
                    // console.log(data.rows[prop]);
                    // console.log(data.rows);
                    const tags = new Tag(data.rows[prop]);
                    // console.log(tags);
                    allTags.push(tags);
                };
                // console.log(allTags);
                callback(null, allTags);
            };
        });
    };
    
    // Méthode pour récupérer le tag a l'Id "x"
    static findById(id, callback) {
        const query = `SELECT * FROM "tags" WHERE "id" = $1`;
        const values = [id]; // Récupérer le bon Id
        
        dbConnection.query(query, values, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                // verification que le résultat existe avant transformation
                if (data.rows[0]) {
                    // console.log(data.rows[0]);
                    const myTag = new Tag(data.rows[0]);
                    callback(null, myTag);
                } else {
                    callback(null, undefined);
                };
                
            };
        });
    };
    
    // Méthode pour update un tag
    update(callback) {
        const query = `UPDATE "tags" SET
            "name" = $1,
            "status" = $2,
            "updated_at" = CURRENT_TIMESTAMP
            WHERE "id" = $3
            RETURNING id, updated_at`;
        const values = [this.name, this.status, this.id];
        
        // console.log(values);
        // // console.log(updatedInfos);
        // console.log(query);
        // console.log(this);
        
        // return;
        
        dbConnection.query(query, values, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                const updatedInfos = data.rows[0];
                this.updated_at = updatedInfos.updated_at;
                callback(null, this);
            };
        });
    };
    
    // Méthode pour insérer un nouveau tag
    // Ici je veux créer un nouveau tag, puis l'insérer dans la BDD
    insert(callback) {
        const query = `INSERT INTO "tags" ("name") VALUES ($1) RETURNING id, created_at`;
        const values = [this.name];
        
        dbConnection.query(query, values, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                const returnedInfos = data.rows[0];
                console.log(data);
                // Si l'insertion se passe bien on récup dans data.rows[0] les infos qu'on a demandé
                this.id = returnedInfos.id;
                this.created_at = returnedInfos.created_at;
                callback(null, this);
            };
        });
    };
    
    // Méthode pour supprimer un tag, apres l'avoir récupérer
    delete(callback) {
        const query = `DELETE FROM "tags" WHERE "id" = $1`;
        const values = [this.id];
        
        dbConnection.query(query, values, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                delete data.rows[0];
            };
        });
    };
};

// On export la classe !
module.exports = Tag;