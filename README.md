# KEYPROD TEST TECHNIQUE

## 1.Installer les dépendances
```
npm install
```

## 2. Compiler le projet
```
npm run serve
```

## 3.Lancer l'API de test

Ce projet utilise la librairie **json-server** pour fournir une API locale de test.

Pour que le projet fonctionne correctement il faut lancer la commande suivante dans un nouveau terminal de commande
```
json-server db.json --watch
```

Cela permet d'obtenir une API locale de test accessible via le port 3000 par défaut.

## 4. Donnees fictives de tests
La base de données au format json ("db.json"), fournie dans ce projet inclue quelques données d'exemple : 

* 4 commandes crées
* un catalogue de 8 produits "KeyNetic" et 8 produits "KeyVibe"