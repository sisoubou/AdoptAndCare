# AdoptAndCare - Cyber_Refuge

Une application web rétro pour consulter et adopter des animaux. Naviguez pour trouver votre compagnon idéal !

## Technologies utilisées

* **Vue 3** : Utilisation de la Composition API et des fonctionnalités réactives (`ref`, `computed`, `watch`).
* **Vite** : Outil de build configuré avec le plugin `@tailwindcss/vite` pour supporter Tailwind v4.
* **Vue Router** : Gestion de la navigation dynamique, des paramètres de route (`:id`) et des sous-routes pour les détails.
* **Pinia** : Store centralisé pour la gestion des animaux et des favoris avec persistance des données.
* **Tailwind CSS v4** : Framework CSS utilisé pour l'interface graphique rétro via la directive `@import`.
* **Axios** : Client HTTP pour la consommation d'APIs RESTful (races d'animaux et simulation d'envoi).

## Installation et Lancement

1.  **Cloner le projet**
    ```bash
    git clone <votre-lien-git>
    cd AdoptAndCare
    ```

2.  **Installer les dépendances**
    ```bash
    npm install
    ```

3.  **Lancer le serveur de développement**
    ```bash
    npm run dev
    ```
    L'application sera accessible sur `http://localhost:5173`.

## Architecture des Routes

| Chemin | Composant | Description |
| :--- | :--- | :--- |
| `/` | `HomeView` | Page d'accueil interactive. |
| `/animals` | `AnimalsView` | Explorateur d'animaux avec filtres et recherche. |
| `/animals/:id` | `AnimalDetailView` | Fiche détaillée avec sous-routes (Infos/Contact). |
| `/add-animal` | `AddAnimalView` | Formulaire d'ajout d'un nouveau compagnon. |
| `/about` | `AboutView` | Encyclopédie complète des races (Wiki). |
| `/breed/:species/:id` | `BreedDetailView` | Spécifications techniques d'une race via API. |

## Gestion d'état (Pinia Store)

Le store `animals.store.js` centralise la logique de l'application :
* **État** : Stocke la liste des animaux (`listAnimals`) et les IDs des favoris (`favoriteAnimals`).
* **Actions** : 
    * `addAnimal` : Ajoute un animal avec un ID unique et sauvegarde dans le `localStorage`.
    * `removeAnimal` : Supprime un animal de la collection.
    * `toggleFavorite` : Alterne l'état de favori d'un animal.

## Difficultés Rencontrées & Solutions

* **Problème de configuration Tailwind** : La nouvelle version (v4) nécessitait un plugin Vite spécifique pour résoudre les imports CSS. 
    * *Solution* : Installation de `@tailwindcss/vite` et mise à jour de `vite.config.js`.
* **Données API incomplètes** : Certaines races ne possédaient pas d'URL d'image directe dans la réponse API.
    * *Solution* : Construction dynamique de l'URL via le `reference_image_id` et mise en place d'un système de "fallback" (image par défaut) en cas d'erreur 404.
* **Persistance des données** : Les ajouts d'animaux étaient perdus au rafraîchissement.
    * *Solution* : Synchronisation du store Pinia avec le `localStorage` du navigateur.

## Organisation et Répartition

* **Répartition** : Projet réalisé en **individuel** par Serena Fadda.
* **Organisation** : Développement par étapes : architecture des routes, création du store, intégration des APIs RESTful et enfin polissage de l'interface utilisateur (UI) rétro.

## Sources de données (APIs)

* **TheCatAPI / TheDogAPI** : Récupération des races et caractéristiques.
* **JSONPlaceholder** : Simulation d'appels POST pour les formulaires d'adoption.

---
*Projet réalisé pour le cours Framework Web 2 - Session Mars 2026.*