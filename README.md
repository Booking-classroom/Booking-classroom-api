# 🛠️ Back-end - Booking Classroom

## 📖 Description
Ce projet constitue l'API back-end pour un système de réservation de salle.  
Il permet la gestion des utilisateurs, des salles, du matériel, ainsi que des créneaux de réservation disponibles.  

## 🚀 Fonctionnalités
- 🔑 **Authentification & Gestion des utilisateurs** (JWT, rôles)
- 📅 **Gestion des réservations** (ajout, modification, suppression)
- 📜 **Gestion des salles** (ajout, modifications, suppression)
- 🏗️ **Gestion du matériel** (ajout, suppression, mise à jour)
- 📡 **Endpoints sécurisés** via des middlewares

## 🏗️ Installation

### 1️⃣ **Cloner le projet**
```bash
git clone https://github.com/Booking-classroom/Booking-classroom-api.git
cd booking-classroom
```
###2️⃣ **Installer les dépendances**
```bash
npm install
```
###3️⃣ **Configurer les variables d'environnement**
```bash
DB_PASSWORD=postgres
DB_USER=postgres
DB_NAME=postgres
JWT_SECRET=fjziaeghjzqOPSFKGSJOSQJSDNGIUFZHQFSBIQZG
```
adapte selon ta base de données
###4️⃣ **Démarrer le serveur**
```bash
npm run start:dev
```
🛠️ Technologies utilisées
Nest.js avec Express 🚀
docker avec postgres 🛢️
JWT pour l'authentification 🔑
TypeScript pour une meilleure structure ⌨️

📡 Endpoints API

| Module                 | Méthode | Endpoint                                         | Description |
|------------------------|---------|-------------------------------------------------|-------------|
| **Classroom**          | POST    | `/api/classroom`                                | Créer une salle |
|                        | GET     | `/api/classroom`                                | Obtenir toutes les salles |
|                        | GET     | `/api/classroom/:id`                            | Obtenir une salle par ID |
|                        | GET     | `/api/classroom/availability/:isAvailable`      | Vérifier la disponibilité d'une salle |
|                        | PATCH   | `/api/classroom/:id`                            | Mettre à jour une salle |
|                        | DELETE  | `/api/classroom/:id`                            | Supprimer une salle |
| **User**               | POST    | `/api/users`                                    | Créer un utilisateur |
|                        | GET     | `/api/users`                                    | Obtenir tous les utilisateurs |
|                        | GET     | `/api/users/:id`                                | Obtenir un utilisateur par ID |
|                        | GET     | `/api/users/email/:email`                       | Obtenir un utilisateur par email |
|                        | PATCH   | `/api/users/:id`                                | Mettre à jour un utilisateur |
|                        | DELETE  | `/api/users/:id`                                | Supprimer un utilisateur |
| **Material**           | POST    | `/api/material`                                 | Ajouter du matériel |
|                        | GET     | `/api/material`                                 | Obtenir tout le matériel |
|                        | GET     | `/api/material/:id`                             | Obtenir un matériel par ID |
|                        | PATCH   | `/api/material/:id`                             | Mettre à jour un matériel |
|                        | DELETE  | `/api/material/:id`                             | Supprimer un matériel |
| **Reservation**        | POST    | `/api/reservation`                              | Créer une réservation |
|                        | GET     | `/api/reservation`                              | Obtenir toutes les réservations |
|                        | GET     | `/api/reservation/:id`                          | Obtenir une réservation par ID |
|                        | GET     | `/api/reservation/classroom/:id`                | Obtenir les réservations d'une salle |
|                        | GET     | `/api/reservation/user/:id`                     | Obtenir les réservations d'un utilisateur |
|                        | PATCH   | `/api/reservation/:id`                          | Mettre à jour une réservation |
|                        | DELETE  | `/api/reservation/:id`                          | Supprimer une réservation |
| **Reservation Material** | POST  | `/api/reservationMaterial`                      | Associer du matériel à une réservation |
|                        | GET     | `/api/reservationMaterial`                      | Obtenir les associations matériel-réservation |
|                        | GET     | `/api/reservationMaterial/:id`                  | Obtenir une association par ID |
|                        | PATCH   | `/api/reservationMaterial/:id`                  | Mettre à jour une association |
|                        | DELETE  | `/api/reservationMaterial/:id`                  | Supprimer une association |
| **Auth**               | POST    | `/api/auth/signin`                              | Connexion utilisateur |
|                        | POST    | `/api/auth/signup`                              | Inscription utilisateur |

