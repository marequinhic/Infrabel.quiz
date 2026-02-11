const UI = {
    fr: { title: "Quiz Expertise I-ICT", check: "VÉRIFIER MES RÉPONSES", reload: "NOUVEAU TIRAGE (10 QUESTIONS)", theory: "Théorie Infrabel :", score: "SCORE FINAL", lang: "Langue :" },
    nl: { title: "I-ICT Expertise Quiz", check: "CONTROLEER MIJN ANTWOORDEN", reload: "NIEUWE VRAGEN (10 STUKS)", theory: "Infrabel Theorie:", score: "EINDSCORE", lang: "Taal:" },
    en: { title: "I-ICT Expert Quiz", check: "CHECK MY ANSWERS", reload: "NEW RANDOM SET (10 Q)", theory: "Infrabel Theory:", score: "FINAL SCORE", lang: "Language:" }
};

const coffreFort = {
    fr: [
        { q: "Quel outil utilise le PL pour créer un Change ?", options: ["SAP Sprint", "Fiori 'My Changes'", "Service Catalog"], correct: 1, exp: "Toutes les demandes I-ICT passent par Fiori 'My Changes'[cite: 12, 157, 162]." },
        { q: "Qui effectue l'analyse de risque CIRA ?", options: ["Le PL", "L'OCO", "Le CAB"], correct: 1, exp: "L'Operations Compliancy Officer (OCO) est responsable de l'analyse initiale[cite: 184, 186]." },
        { q: "Risque BLACK : qui doit approuver ?", options: ["L'OCO seul", "CAB + ICT Manager", "Le SA"], correct: 1, exp: "Le risque Noir exige la validation du CAB et du Verantwoordelijke Manager[cite: 223]." },
        { q: "Quel rôle est responsable du Solution Design ?", options: ["Projectleider", "Solution Architect (SA)", "Domain Expert"], correct: 1, exp: "Le Solution Architect (SA) exécute le design détaillé[cite: 126, 252]." },
        { q: "Quel est le but de la réunion Build2Run ?", options: ["Planifier le budget", "Vérifier la conformité au design", "Former les utilisateurs"], correct: 1, exp: "Build2Run valide que la solution est conforme au design avant la mise en production[cite: 13, 385, 400]." },
        { q: "Qu'est-ce qu'un FLAP ?", options: ["Une erreur réseau", "Un change rapide sans validation DRM", "Une nouvelle application"], correct: 1, exp: "Les FLAPS sont des changements rapides à faible risque sans passage par la DRM[cite: 97]." },
        { q: "Qui est l'approbateur final (Accountable) de ce document ?", options: ["Chris Truyen", "Wim Rens", "Bram Thijsen"], correct: 1, exp: "Wim Rens est désigné comme l'Approver officiel[cite: 486]." },
        { q: "Quand sollicite-t-on l'Architecture Board (AB) ?", options: ["Pour chaque change", "Pour le non-standard ou nouveaux building blocks", "Jamais"], correct: 1, exp: "L'AB intervient pour les architectures non-standard ou nouveaux composants[cite: 278, 284]." },
        { q: "Quel statut marque la fin de la phase de Change ?", options: ["Approved", "Completed", "In Production"], correct: 1, exp: "Le PL met le statut à 'Completed' via Fiori une fois en RUN[cite: 437, 459]." },
        { q: "Quel est l'objectif du Control changes ?", options: ["Acheter des rails", "Mitiger l'impact sur le paysage ICT", "Gérer les congés"], correct: 1, exp: "L'objectif est de gérer les changements de manière contrôlée pour éviter les impacts[cite: 11, 68]." },
        // Questions supplémentaires pour le "Coffre"
        { q: "Qui reçoit les demandes via SAP Sprint en statut 'PREP' ?", options: ["Le SA", "L'OCO", "Le CISO"], correct: 1, exp: "L'OCO reçoit les nouvelles demandes en statut PREP[cite: 184]." },
        { q: "Quelle couleur CIRA permet une validation par l'OCO seul ?", options: ["Rouge", "Vert", "Bleu"], correct: 1, exp: "Le risque Vert est validé directement par l'OCO[cite: 226, 245]." },
        { q: "Où se trouve la version contrôlée de ce document ?", options: ["Sur PC local", "Sur SharePoint uniquement", "Dans un email"], correct: 1, exp: "La version officielle se trouve exclusivement sur SharePoint[cite: 491]." },
        { q: "Un Change refusé reçoit quel statut dans SAP ?", options: ["REJE", "FAIL", "STOP"], correct: 0, exp: "Un changement refusé est mis en statut REJE (Rejected)[cite: 248, 299]." },
        { q: "Le CIRA est basé sur quel chapitre de la demande ?", options: ["Inleiding", "Implementatie Impact Assessment", "RACI"], correct: 1, exp: "L'analyse CIRA se base sur le chapitre 'Implementatie Impact Assessment'[cite: 203]." }
    ],
    nl: [ /* Traductions des 15 questions ici... */ ],
    en: [ /* Traductions des 15 questions ici... */ ]
};

let langueActuelle = 'fr';
let selectionActive = [];

function toggleMenu() {
    const menu = document.getElementById("side-menu");
    menu.style.width = menu.style.width === "280px" ? "0" : "280px";
}

function changerLangue() {
    langueActuelle = document.getElementById('lang-select').value;
    document.getElementById('txt-title').innerText = UI[langueActuelle].title;
    document.getElementById('btn-valider').innerText = UI[langueActuelle].check;
    document.getElementById('btn-reload').innerText = UI[langueActuelle].reload;
    document.getElementById('txt-menu-lang').innerText = UI[langueActuelle].lang;
    toggleMenu();
    lancerQuiz();
}

function lancerQuiz() {
    document.getElementById('score-final').style.display = "none";
    document.getElementById('btn-valider').style.visibility = "visible";
    
    // PIOCHE ALÉATOIRE : 10 questions parmi les 15 du coffre
    selectionActive = [...coffreFort[langueActuelle]].sort(() => 0.5 - Math.random()).slice(0, 10);
    
    let html = "";
    selectionActive.forEach((item, idx) => {
        html += `
            <div class="card" id="card-${idx}">
                <span class="question-text"><strong>${idx + 1}. ${item.q}</strong></span>
                ${item.options.map((opt, oIdx) => `
                    <label class="option" id="label-${idx}-${oIdx}">
                        <input type="radio" name="q${idx}" value="${oIdx}" style="display:none;" onclick="marquerSelection(${idx}, ${oIdx})"> ${opt}
                    </label>
                `).join('')}
                <div class="explanation" id="exp-${idx}" style="display:none; padding:15px; background:rgba(2,188,240,0.1); border-radius:8px; margin-top:10px; font-size:14px; border-left:4px solid var(--cyan-infrabel);">
                    <strong>${UI[langueActuelle].theory}</strong> ${item.exp}
                </div>
            </div>`;
    });
    document.getElementById('quiz-area').innerHTML = html;
}

function marquerSelection(qIdx, oIdx) {
    const labels = document.querySelectorAll(`[id^="label-${qIdx}-"]`);
    labels.forEach(el => el.classList.remove('selected'));
    document.getElementById(`label-${qIdx}-${oIdx}`).classList.add('selected');
}

function validerQuiz() {
    let score = 0;
    selectionActive.forEach((item, idx) => {
        const radios = document.getElementsByName('q' + idx);
        let userAns = -1;
        radios.forEach(r => { if (r.checked) userAns = parseInt(r.value); });
        
        document.getElementById('exp-' + idx).style.display = "block";
        const card = document.getElementById('card-' + idx);
        if (userAns === item.correct) {
            score++;
            card.style.borderLeftColor = "#2e7d32";
        } else {
            card.style.borderLeftColor = "#d32f2f";
        }
    });

    const final = document.getElementById('score-final');
    final.style.display = "block";
    final.style.background = score >= 8 ? "#C8E6C9" : "#FFCDD2";
    final.style.color = "#213A53";
    final.innerHTML = `${UI[langueActuelle].score} : ${score} / 10`;
    document.getElementById('btn-valider').style.visibility = "hidden";
    final.scrollIntoView({ behavior: 'smooth' });
}

function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute("data-theme");
    body.setAttribute("data-theme", current === "dark" ? "light" : "dark");
}

window.onload = lancerQuiz;