# WhereToPark

![](https://github.com/sdelree/WhereToPark/workflows/Front%20test/badge.svg)

Une version déployée de l'application se trouve à l'adresse suivante : [https://wheretopark-bordeaux-app.herokuapp.com/](https://wheretopark-bordeaux-app.herokuapp.com/) (Hébergement app: Heroku, hébergement base de données: MongoDB Atlas).

Plus de détails sur le projet (technos, membres du groupe et principe) sont disponibles dans le fichier [ORGA.md](ORGA.md).

## Lancement/installation de l'application

Afin de pouvoir tester l'application immédiatement, il suffit de se rendre à l'url de la version déployée indiquée ci-dessus.

Pour une installation locale, un fichier [docker-compose.yml](docker-compose.yml) est mis à disposition (les variables d'environnement qu'il contient peuvent être modifiées en fonction des besoins). Chaque partie de l'appli (backend et frontend) contiennent un Dockerfile pour construire leur image. Le script docker compose ajoute, en plus de ces deux images, une image MongoDB pour héberger la base de données.

## Utilisation

Le but de cette application est de trouver le meilleur parking autour d'une destination chosie.

L'utiliser est très simple ! Sur la page d'accueil, il faut entrer une destination. Pour obtenir une auto-complétion relative au début d'adresse déjà tapée, il suffit de s'arrêter de taper pendant une demi seconde environs. Il est alors possible de valider l'adresse soit en cliquant sur une proposition d'auto-complétion, soit en appuyant sur entrée.

L'application se met alors à rechercher les parkings les plus intéressants à proximité de la destination (elle leur attribue à chacun un score en fonction de leur distance, s'ils sont complets ou pas, les tarifs,...) et les affiche sur la carte. Pour chaque parking sélectionné, il est possible d'avoir plus d'information à leur sujet en cliquant dessus dans la liste qui se trouve en dessous de la zone de recherche.

Afin d'obtenir une recherche plus poussée, il est possible de créer un compte (bouton **Inscription**) puis de se connecter (bouton **Connexion**). Une fois connecté, il est possible d'enregister un véhicule avec certaines caractéristiques (électrique ou non, taille, ...). Une fois un ou plusieurs véhicules enregistrés, il seront disponibles sur le compte et donc accessibles de partout. Il est alors possible de sélectionner un véhicule avant de faire une recherche. Dans ce cas, des critères supplémentaires seront pris en compte dans le classement des parkings (bornes recharge électriques, hauteur maximale, ...).

