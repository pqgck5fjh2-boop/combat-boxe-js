'use strict'

// On définit les deux combattants 
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
      { nom: "Smash", puissance: 1300 },
      { nom: "Uppercut", puissance: 1330 },
      { nom: "Gazelle Punch", puissance: 1320 },
      { nom: "Dempsey Roll", puissance: 1350 }
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
      { nom: "Jab", puissance: 1250 },
      { nom: "Uppercut", puissance: 1270 },
      { nom: "Crochet", puissance: 1265 },
      { nom: "Enchaînement", puissance: 1280 }
    ]
  }
];

// Fonction pour une technique aléatoire  
function choisirTechniqueAleatoire(techniques) {
  const index = Math.floor(Math.random() * techniques.length);
  return techniques[index];
}

// Fonction pour  un KO 
function coupCritique() {
  return Math.random() < 0.1;
}

// Fonction  les dégâts infligés 
function calculerDegats(puissanceAttaque, defenseAdverse) {
  return Math.max(0, puissanceAttaque - (defenseAdverse / 10));
}

// On récupère Ippo et le joueur depuis la liste des combattants
let ippo = { ...combattants[0] };
let joueur = { ...combattants[1] };

// La boucle principale du combat : maximum 10 rounds
for (let round = 1; round <= 10; round++) {
  console.log(`\nRound ${round} `);

  // On détermine qui attaque  en premier selon la vitesse
  let premier;
  let second;
  if (joueur.caracteristiques.vitesse > ippo.caracteristiques.vitesse) {
    premier = joueur;
    second = ippo;
  } else {
    premier = ippo;
    second = joueur;
  }

  // Chacun  attaque à son tour
  for (let attaquant of [premier, second]) {
    // On détermine  le défenseur
    let defenseur = attaquant === ippo ? joueur : ippo;

    // Choix de la technique aléatoire et  voir si il y'a coup critique ou pas  
    const technique = choisirTechniqueAleatoire(attaquant.techniques);
    const critique = coupCritique();

    // Affichage de l’attaque
    console.log(`${attaquant.nom} utilise ${technique.nom}${critique ? " (COUP CRITIQUE)" : ""} !`);

    // Si le coup  est critique alors KO immédiat
    if (critique) {
      console.log(`${defenseur.nom} est mis KO `);
      console.log(`${attaquant.nom} remporte le combat `);
      return;
    }

    // Calcul des dégâts et retrait de l’endurance
    const degats = calculerDegats(technique.puissance, defenseur.caracteristiques.defense);
    defenseur.caracteristiques.endurance = defenseurn.caracteristiques.endurance-degats;

    // Affiche les dégâts subis
    console.log(`${defenseur.nom} perd ${degats.toFixed(2)} points d’endurance. Endurance restante : ${defenseur.caracteristiques.endurance.toFixed(2)}`);

    // Si le défenseur tombe à 0 alors  fin du combat
    if (defenseur.caracteristiques.endurance <= 0) {
      console.log(`${defenseur.nom} n’a plus de force `);
      console.log(`${attaquant.nom} remporte le combat `);
      return;
    }
  }
}

// Si les 10 rounds sont passés 
console.log("\n Fin des 10 rounds !");
console.log(`Endurance finale - ${joueur.nom}: ${joueur.caracteristiques.endurance.toFixed(2)} | ${ippo.nom}: ${ippo.caracteristiques.endurance.toFixed(2)}`);

// On affiche le gagnant en fonction de l’endurance restante
if (joueur.caracteristiques.endurance > ippo.caracteristiques.endurance) {
  console.log(`${joueur.nom} remporte le combat aux points `);
} else if (ippo.caracteristiques.endurance > joueur.caracteristiques.endurance) {
  console.log(`${ippo.nom} remporte le combat aux points `);
} else {
  console.log("Égalité parfaite");
}
