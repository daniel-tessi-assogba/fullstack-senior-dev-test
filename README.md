# Contexte
Pour évaluer vos aptitutes de développeur senior fullstack Java Spring Boot + Angular, 
nous vous proposons de concevoir un projet kata réaliste et court (3 à 5 heures),
inspiré directement des besoins métiers clés de notre plateforme e-learning de skolae.

# Besoin Metier
SKOLAE est composé d'un réseaux d'écoles (GES & EDUCTIVE) et fait partie des plus importants réseaux d’enseignement supérieur privé. 
Ses établissements de Bac à Bac+5 délivrent des titres reconnus par l’État niveaux 5, 6 et 7 ainsi que des titres RNCP et préparent à certains diplômes d’État.
Avec ses 23 écoles accessibles en alternance et plus de 50 ans d’expertise pédagogique, SKOLAE a besoin d'enrichir et d'assouplir son processus d'inscription.
Actuellement les données des écoles inscrites sur la plateforme résident dans la meme base de donnée postgresql skolae_db et dans le meme schema public. Avec cette structure on n'est pas a l'abri de l'interference des donnees utilisateurs.
Il se pose donc un probleme de sécurite et de performance que nous soyons adresser. Pour ce faire nouis optons pour une structure multi tenant du site de formation en ligne de skolae.
Dans cette optique, nous cindons le processus d'inscription des écoles gérées par la plateforme skolae en plusieurs étapes, pour inscrire progressivement les écoles dans un schema multi tenant.

# fiche Fonctionnelle
A la phase de pre-inscriptemandeur une école peut s'inscrire accedant au formulaire sur la plateforme de Sokolae. 
Une fois le formulaire de la pre-inscription envoyé, les données de l'établissement scolaire sont enregistées dans la base de donnée skolae_db et dans le schema public. 
Nous souhaitons extraires les données de l'établissement ainsi pre-inscrit dans la base skolae_db, et l'inscrire dans la base de dommées skolae_tenants. 
Il s'agit d'une structure multi tenant par schema.
Dans ce texte vous allez developer la phase d'inscription sous forme d'un scheduler springboot (CRON s'executant automatiquement et nuitament) pour piocher les données depuis la base de donnée skolae_db vers la base de données skolae_tenants,
et inscrire dans skolae_tenants les établissments pre-inscrits dans skolae_db. 

# fiche Techniaue
Fonctionnalités à implémenter

1. Etape premier: Vous pouvez utiliser le projet gradle registration-service tout comme vous pouvez générer un projet maven selon votre choix.
2. Etape deux:
   Vous créerez dans le projet registration-service un script preinscription.sql qui crée les deux bases de données skolae_db et skolae_tenants (postgresql), 
   puis enregistre dans la base de données skolae_db les établissements repertoriées dans le ficher preinscription.json (fichier bouchon).
   Ce fichier se trouver à la raison de ce dossier et repond au modele suivant: 
       ``` modele entité
    class Ecole {
    id: uuid;
    nom_etablissement: string;
    pole_formation: string;
    annee_immatriculation: string;
    adresse_siege: string;
    nom_representant: string;
    prenom_representant: number;
    telephone: number;
    types_formation: string;
    createdAt: Datetime;
    }
      ```
2. Etape trois: pensez a bien definir skolae_db comme readDatasource et skolae_tenants commme writeDatasource
3. Vous recurperez toutes les ecoles prinscrites dans skolae_db dans une prodedure read, vous parcourerez la liste, 
   puis, pour chaque ecole, vous creerez de maniere dynamique un schema postgres pour chaque ecole a partir du nom de l'ecole. 
   Par exemple pour l'ecole ayant pour nom d'etablissement "Eductive Paris", le scheduler devra creer le schama "eductive_paris" dans la table skolae_tenants.
   verifier les syntax que doivent respecter les noms de schema sous postgresql (Il ne devrait pas y avoir d'espace ni de tiret du 6 dans le nom d'un schama postgres)
3. Une fois le schema creee pour cette école dans la boucle, vous inscrivez cette école dans son propre schema en ajoutant a l'entite Ecole les champs de table "isVerified",
   et upadatedAt, comme ci-dessous:
      ``` modele entité
    class Ecole {
    id: uuid;
    nom_etablissement: string;
    pole_formation: string;
    annee_immatriculation: string;
    adresse_siege: string;
    nom_representant: string;
    prenom_representant: number;
    telephone: number;
    types_formation: string;
    createdAt: Datetime;
    isVerified: Boolean
    updatedAt: Datetime;
    }
      ```
4. N'hesitez pas d'utiliser Transactional pour garantir l'intergrite des tratements, et Caffeine par exemple pour le caching tenant.
4. A l'éxecution de votre scheduler, on devra voir crées 5 nouveaux schema postgres dans la base de donnees skolae_tenants. 
   "eductive-paris", "pole-eduction-lyon", "centre-edu", "formation-sure", "edurecka". 
   Et dans chacun de ces schemas on devra voir une table Ecole dans laquelle est enregistées l'école portant le nom du schema.
5. Creer egalement un endpoint permettant d'executer ce scheduler manuellement.


    Vous trouverez à la racine de ce dossier le repertoire registration-service qui est un projet springboot gradle avec des dependances repondant aux exigences techniques,
    mais vous pouvez généner un projet maven ou gradle selon votre convenance.
    Un établissement scolaire a les caractéristiques suivantes :



2. Frontend d'énscription

  Frontend (Angular 17+)

  Formulaire : nom de l'établissement, pôle de formation, format d'enseignement, etc...
  Upload d'un fichier PDF (Justificatif d'etablissement)
  Appel à l'API backend et affichage des ecole preinscrites en attente de validation

Ce projet Frontend pre-registration-frontend (à la racine de ce dossier) est un dashbord à moitié dévelopé. Votre tache consiste à faire mettre en place une page de login qui s'afficherait au demerage de ce front.
Vous n'etes pas appelé a developper le backend de cette logique. Gerez par contre bien les routes et les redirections.


## Ce qui est attendu
- Developer les tâches attendues côté bckend en suivant les specifications.
- Developer les tâches attendues côté frontend.
  (A rendre sous 2 jours à compter de la date de reception)

