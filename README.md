# AdoptAndCare - Cyber_Refuge

Une application web rétro pour consulter et adopter des animaux. Naviguez dans l'univers nostalgique du Windows 95 pour trouver votre compagnon idéal!

## Caractéristiques

- **Liste d'animaux** : Parcourir tous les animaux disponibles avec filtres par type
- **Détails des animaux** : Consulter les informations complètes de chaque animal
- **Gestion des races** : Afficher les détails des races d'animaux
- **Ajout d'animaux** : Interface pour ajouter de nouveaux animaux à la base de données
- **Recherche** : Barre de recherche pour filtrer les animaux
- **Responsive** : Adapté à différentes tailles d'écran

## Technologies

- **Vue 3** : Framework JavaScript progressif
- **Vite** : Outils de build ultra-rapides
- **Vue Router** : Routage côté client
- **Pinia** : Gestion d'état simple et intuitif
- **Tailwind CSS** : Framework CSS utilitaire
- **Axios** : Client HTTP pour les requêtes API

## Prérequis

- Node.js `^20.19.0` ou `>=22.12.0`

## Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd AdoptAndCare
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## Build pour la production

```bash
npm run build
```

Les fichiers générés se trouvent dans le dossier `dist/`.

## Aperçu du site

**Après la compilation :**
```bash
npm run preview
```

## Structure du projet

```
src/
├── components/
│   └── animals/
│       ├── AnimalCard.vue          # Carte d'un animal (liste)
│       ├── AnimalContact.vue       # Infos de contact
│       ├── AnimalIndex.vue         # Liste avec filtres
│       ├── AnimalInfo.vue          # Infos détaillées
│       └── SearchBar.vue           # Barre de recherche
├── router/
│   └── index.js                    # Configuration du routeur
├── stores/
│   └── animals.store.js            # Store Pinia pour les animaux
├── views/
│   ├── AboutView.vue               # Page À propos
│   ├── AddAnimalView.vue           # Ajouter un animal
│   ├── AnimalDetailView.vue        # Détails d'un animal
│   ├── AnimalsView.vue             # Vue principale (liste)
│   ├── BreedDetailView.vue         # Détails d'une race
│   ├── HomeView.vue                # Page d'accueil
│   └── NotFoundView.vue            # Erreur 404
├── assets/
│   └── main.css                    # Styles globaux
├── App.vue                         # Composant racine
└── main.js                         # Point d'entrée
```

## Routes disponibles

| Route | Description |
|-------|------------|
| `/` | Accueil |
| `/animals` | Liste de tous les animaux |
| `/animals/:id` | Détails d'un animal |
| `/breeds/:id` | Détails d'une race |
| `/add` | Ajouter un nouvel animal |
| `/about` | À propos |
| `/:pathMatch(.)*` | Page 404 |

## Gestion d'état (Pinia)

Le store `animals.store.js` gère :
- Liste des animaux
- Actions pour ajouter/modifier/supprimer des animaux
- État global de l'application

## Fonctionnalités

### AnimalCard
- Affiche la photo de l'animal
- Affiche le type d'animal
- Message "Image indisponible" si aucune image
- Lien vers les détails

### AnimalIndex
- Filtrage par type d'animal
- Recherche par nom
- Affichage en grille

### AnimalDetailView
- Informations complètes de l'animal
- Photo avec fallback "Image indisponible"
- Infos de contact
- Lien vers la race

### AddAnimalView
- Formulaire pour ajouter un nouvel animal
- Validation des données
- Intégration avec le store

## API Utilisée
The c

## Auteur

Projet développé par Serena Fadda en Mars 2026.


