#  API REST Produits (Node.js + Express + MongoDB)
## Description
Cette API REST complète permet de gérer un catalogue de produits avec une base de données MongoDB. Elle expose des endpoints CRUD (Create, Read, Update, Delete) pour une gestion optimale des produits, avec un système de statut de stock contrôlé.

## Fonctionnalités

- CRUD Complet : Création, lecture, mise à jour et suppression de produits

- Gestion de Stock : Statuts de stock prédéfinis et contrôlés

- Validation des Données : Vérification des types et contraintes

- API RESTful : Design cohérent et standards HTTP respectés

## Technologies utilisées
 Node.js - Environnement d'exécution JavaScript

Express.js - Framework web minimaliste

Mongoose - ODM pour MongoDB

MongoDB - Base de données NoSQL

dotenv - Gestion des variables d'environnement

##  Prérequis
- Node.js 

- MongoDB 

 ## Installation et déploiement
### 1. Cloner le projet
```
git clone https://github.com/votre-compte/api-products.git
cd api-products
```
### 2. Installer les dépendances
```
npm install
```

### 3. Configuration de l'environnement
À la racine du projet, créez un fichier .env :


### 4. Démarrage du serveur
##### Mode développement :

``` 
npm run dev
```
###### Mode production :

```
npm start
```
Le serveur sera disponible sur :
-  http://localhost:3000

## Modèle de données
Schéma Product
Champ	Type	Contraintes	Description
productName	String	Requis	Nom du produit
price	Number	Requis, ≥ 0	Prix du produit
stockStatus	String	Enum: "en stock", "petite stock", "pas en stock"	Statut du stock
### Endpoints de l'API
#### Récupérer tous les produits
```
GET /products

Réponse :

json
[
  {
    "_id": "651234abcd12345678901234",
    "productName": "Chaussures de sport",
    "price": 59.99,
    "stockStatus": "en stock",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
``` 
#### Récupérer un produit par ID

- GET /products/:id

##### Paramètres :

- id - ID MongoDB du produit

#### Réponses :

- 200 - Produit trouvé

- 404 - Produit non trouvé

- 400 - ID invalide

#### Ajouter un nouveau produit
```
POST /products
Content-Type: application/json

Body :

json
{
  "productName": "Ordinateur portable",
  "price": 899.99,
  "stockStatus": "en stock"
}
```

#### Validation :

- productName : Requis, chaîne de caractères

- price : Requis, nombre positif

- stockStatus : Doit être l'une des valeurs autorisées
  ### Mettre à jour un produit
  ```
PATCH /products/:id
Content-Type: application/json

Body :

json
{
  "productName": "Ordinateur portable gaming",
  "price": 950
}
```
Notes :

Le champ stockStatus ne peut pas être modifié via cet endpoint

Seuls les champs fournis sont mis à jour
Mettre à jour le statut de stock

PATCH /products/:id/:status

Valeurs autorisées pour status :

en stock

petite stock

pas en stock

Exemple :

```
PATCH /products/651234abcd12345678901234/petite%20stock
```
### Supprimer un produit

DELETE /products/:id

Réponses :

200 - Produit supprimé avec succès

404 - Produit non trouvé

#### Codes de statut HTTP
Code	Signification
200	Succès
201	Créé avec succès
400	Requête invalide
404	Ressource non trouvée
500	Erreur serveur interne
### Validation des données
Valeurs autorisées pour stockStatus
"en stock" - Produit disponible en quantité suffisante

"petite stock" - Produit disponible mais en quantité limitée

"pas en stock" - Produit temporairement indisponible

Contraintes de validation
productName : Champ obligatoire

price : Doit être un nombre positif ou zéro

stockStatus : Doit appartenir à la liste des valeurs autorisées

