# Contexte
Pour évaluer vos aptitutes de développeur senior fullstack Java Spring Boot + Angular, 
nous vous proposons de concevoir un projet kata réaliste et court (3 à 5 heures),
inspiré directement des besoins métiers clés de notre plateforme e-learning de skolae.

# Besoin Metier
SKOLAE est composé d'un réseaux d'écoles (GES & EDUCTIVE) et fait partie des plus importants réseaux d’enseignement supérieur privé. 
Ses établissements de Bac à Bac+5 délivrent des titres reconnus par l’État niveaux 5, 6 et 7 ainsi que des titres RNCP et préparent à certains diplômes d’État.
Avec ses 23 écoles accessibles en alternance et plus de 50 ans d’expertise pédagogique, SKOLAE a besoin d'enrichir et d'assouplir son processus d'inscription.
Supposons qu'actuellement les données de certaines écoles inscrites sur la plateforme résident dans la même base de donnée postgresql skolae_db et dans le même schema public (C'est un cas d'usage, pas un scenarionreel).
Avec cette structure on n'est pas a l'abri de perte ou d'interference des donnees utilisateurs.
Il se pose donc un probleme de sécurite et de performance que nous soyons adresser. Pour ce faire nous optons pour une structure multi tenant du site de formation en ligne de skolae.
Dans cette optique, nous cindons le processus d'inscription des écoles gérées par la plateforme skolae en plusieurs étapes, pour inscrire progressivement les écoles dans un schema multi tenant.

# fiche Fonctionnelle
A la phase de pre-inscriptemandeur une école peut s'inscrire accedant au formulaire sur la plateforme de Sokolae. 
Une fois le formulaire de la pre-inscription envoyé, les données de l'établissement scolaire sont enregistées dans la base de donnée skolae_db et dans le schema public. 
Nous souhaitons extraires les données de l'établissement ainsi pre-inscrit dans la base skolae_db, et l'inscrire dans la base de dommées skolae_tenants. 
Il s'agit d'une structure multi tenant par schema.
Dans ce texte vous allez developer la phase d'inscription sous forme d'un scheduler springboot (CRON s'executant automatiquement et nuitament) pour piocher les données depuis la base de donnée skolae_db vers la base de données skolae_tenants,
et inscrire dans skolae_tenants les établissments pre-inscrits dans skolae_db. 

# fiche Technique
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
2. Etape trois: pensez à bien definir skolae_db comme readDatasource et skolae_tenants commme writeDatasource
3. Vous recurperez toutes les ecoles prinscrites dans skolae_db dans v d'une prodedure read, vous parcourerez la liste, 
   puis, pour chaque ecole, vous créerez de maniere dynamique un schema postgres pour chaque école dans la base de donnée skolea_tenants à partir du nom de l'école courant. 
   Par exemple pour l'école ayant pour nom d'etablissement "Eductive Paris", le scheduler devra créer le schama "eductive_paris" dans la table skolae_tenants.
   verifier les syntax que doivent respecter les noms de schema sous postgresql (Il ne devrait pas y avoir d'espace ni de tiret du 6 dans le nom d'un schama postgres)
3. Une fois le schema créee pour lécole courante dans la boucle, vous inscrivez cette école dans son propre schema en ajoutant a l'entité Ecole de nouveaux champs de table comme
   "isVerified" et upadatedAt, comme ci-dessous:
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
4. N'hesitez pas d'utiliser Transactional pour garantir l'intergrité des traitements, et Caffeine par exemple pour le caching tenant.
4. A l'éxecution de votre scheduler, on devra voir crées 5 nouveaux schema postgres dans la base de donnees skolae_tenants comme suit: 
   "eductive-paris", "pole-eduction-lyon", "centre-edu", "formation-sure", "edurecka". 
   Et dans chacun de ces schemas on devra voir une table Ecole dans laquelle est enregistées l'école portant le nom de ce schema.
5. Créer également un controller (un endpoint GET par exemple) permettant d'executer ce scheduler manuellement.


    Vous trouverez à la racine de ce dossier le repertoire registration-service qui est un projet springboot gradle avec des dependances répondant aux exigences techniques,
    mais vous pouvez généner un projet maven ou gradle selon votre convenance.

2. Frontend d'énscription

  Frontend (Angular 17+)

  Formulaire : nom de l'établissement, pôle de formation, format d'enseignement, etc...
  Upload d'un fichier PDF (Justificatif d'etablissement)
  Appel à l'API backend et affichage des ecole preinscrites en attente de validation

Ce projet Frontend pre-registration-frontend (à la racine de ce dossier) est un dashbord à moitié dévelopé. Votre tache consiste à faire mettre en place une page de login qui s'afficherait au demerage de ce front.
Vous n'êtes pas appelé à developper le backend de cette authentification. Gerez par contre bien les routes et les redirections.


## Ce qui est attendu
- Developer les tâches attendues côté bckend en suivant les specifications. Gardez a l'esprit qu'apres execution de votre scheduler, 
  on veut retrouver toutes les écoles de Table Ecole de la base de données skolea_db, dans la base de données skolea_tenants, mais chacun dans un schema séparé.
- Developer les tâches attendues côté frontend.
  (A rendre sous 2 jours à compter de la date de reception)

