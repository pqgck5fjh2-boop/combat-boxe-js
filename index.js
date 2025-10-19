'use strict'

// Les deux combattants avec techniques utilisant bonus
const combattants = [
  {
    id: 1,
    nom: "Ippo",
    caracteristiques: { 
      force: 1300,
      defense: 900,
      endurance: 25000,
      vitesse: 180
    },
    techniques: [ 
      { nom: "Smash", bonus: 0 },
      { nom: "Uppercut", bonus: 30 },
      { nom: "Gazelle Punch", bonus: 20 },
      { nom: "Dempsey Roll", bonus: 50 }
    ]
  },
  {
    id: 2,
    nom: "Challenger",
    caracteristiques: { 
      force: 1250,
      defense: 900,
      endurance: 26000,
      vitesse: 190
    },
    techniques: [ 
      { nom: "Jab", bonus: 0 },
      { nom: "Uppercut", bonus: 20 },
      { nom: "Crochet", bonus: 15 },
      { nom: "Enchaînement", bonus: 30, combo: 2 } // 2 coups
    ]
  }
];

// Fonction pour choisir une technique aléatoire
function choisirTechniqueAleatoire(techniques) {
  const index = Math.floor(Math.random() * techniques.length);
  return techniques[index];
}

// Coup critique avec 10% de chance
function coupCritique() {
  return Math.random() < 0.1;
}

// Calcul des dégâts
function calculerDegats(puissanceAttaque, defenseAdverse) {
  return Math.max(0, puissanceAttaque - (defenseAdverse / 10));
}

// On clone les combattants pour éviter de modifier les originaux
let ippo = JSON.parse(JSON.stringify(combattants[0]));
let joueur = JSON.parse(JSON.stringify(combattants[1]));

// Début du combat (10 rounds max)
for (let round = 1; round <= 10; round++) {
  console.log(`\nRound ${round}`);

  // Qui attaque en premier ? (vitesse)
  let premier, second;
  if (joueur.caracteristiques.vitesse > ippo.caracteristiques.vitesse) {
    premier = joueur;
    second = ippo;
  } else {
    premier = ippo;
    second = joueur;
  }

  // Chaque combattant attaque à son tour
  for (let attaquant of [premier, second]) {
    let defenseur = attaquant === ippo ? joueur : ippo;

    const technique = choisirTechniqueAleatoire(attaquant.techniques);
    const critique = coupCritique();

    console.log(`${attaquant.nom} utilise ${technique.nom}${critique ? " (COUP CRITIQUE)" : ""}`);

    // Coup critique => KO instantané
    if (critique) {
      console.log(`${defenseur.nom} est mis KO`);
      console.log(`${attaquant.nom} remporte le combat`);
      return;
    }

    // Calcul de la puissance de l’attaque
    const forceBase = attaquant.caracteristiques.force;
    const puissance = forceBase + technique.bonus;
    const nombreCoups = technique.combo || 1;

    let degatsTotal = 0;
    for (let i = 0; i < nombreCoups; i++) {
      degatsTotal += calculerDegats(puissance, defenseur.caracteristiques.defense);
    }

    // Déduire les dégâts de l’endurance
    defenseur.caracteristiques.endurance -= degatsTotal;

    // Affichage des dégâts
    console.log(`${defenseur.nom} perd ${degatsTotal.toFixed(2)} points d’endurance. Endurance restante : ${defenseur.caracteristiques.endurance.toFixed(2)}`);

    // Si le défenseur est à 0 il est KO
    if (defenseur.caracteristiques.endurance <= 0) {
      console.log(`${defenseur.nom} n’a plus de force`);
      console.log(`${attaquant.nom} remporte le combat`);
      return;
    }
  }
}

// Si on atteint le 10e round
console.log("\nFin des 10 rounds");
console.log(`Endurance finale - ${joueur.nom}: ${joueur.caracteristiques.endurance.toFixed(2)} | ${ippo.nom}: ${ippo.caracteristiques.endurance.toFixed(2)}`);

// Déterminer le vainqueur aux points
if (joueur.caracteristiques.endurance > ippo.caracteristiques.endurance) {
  console.log(`${joueur.nom} remporte le combat aux points`);
} else if (ippo.caracteristiques.endurance > joueur.caracteristiques.endurance) {
  console.log(`${ippo.nom} remporte le combat aux points`);
} else {
  console.log("Égalité parfaite");
}
