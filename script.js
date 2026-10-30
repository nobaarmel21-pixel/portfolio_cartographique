
// =====================================
// 1. INITIALISATION DE LA CARTE
// =====================================

const map = L.map("map").setView([5.35, -4.02], 10);

L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    {
        attribution: "Tiles &copy; Esri",
        maxZoom: 19
    }
).addTo(map);


// =====================================
// 2. INFORMATIONS DES RUBRIQUES
// =====================================

const projects = {
    accueil: {
        title: "Bienvenue sur mon portfolio",
        description: "Découvrez mon profil, mes compétences et mes projets géospatiaux.",
        center: [5.35, -4.02],
        zoom: 10
    },

    apropos: {
        title: "À propos de moi",
        description: "Mon parcours, mes compétences et mes objectifs professionnels.",
        center: [5.35, -4.02],
        zoom: 10
    },

    gspm: {
        title: "Projet GSPM",
        description: "Optimisation de la couverture spatiale et des temps de réponse dans le District Autonome d'Abidjan.",
        center: [5.35, -4.02],
        zoom: 10
    },

    occupation: {
        title: "Occupation du sol à Tortiya",
        description: "Cartographie de l'occupation du sol par télédétection.",
        center: [9.35, -5.03],
        zoom: 10
    },


paludisme: {
    title: "Vulnérabilité au paludisme à Cocody",
    description: "Analyse spatiale de la vulnérabilité des populations autour des gîtes larvaires dans la commune de Cocody.",
    center: [5.35, -3.98],
    zoom: 12
}

};


// =====================================
// 3. AFFICHAGE DES RUBRIQUES
// =====================================

function showProject(projectId) {

    const project = projects[projectId];

    if (!project) {
        return;
    }

    // Masquer toutes les rubriques
    document.querySelectorAll(".content-section").forEach(function(section) {
        section.hidden = true;
    });

    // Afficher la rubrique sélectionnée
    const selectedSection = document.getElementById(projectId + "-content");

    if (selectedSection) {
        selectedSection.hidden = false;
    }

    // Mettre à jour le titre et la description
    document.getElementById("map-title").textContent = project.title;
    document.getElementById("map-description").textContent = project.description;

    // Mettre à jour le bouton actif
    document.querySelectorAll(".project").forEach(function(button) {
        button.classList.remove("active");
    });

    const activeButton = document.querySelector('[data-project="' + projectId + '"]');

    if (activeButton) {
        activeButton.classList.add("active");
    }

    // Déplacer la carte vers la zone correspondante
    // Déplacer la carte uniquement si les coordonnées sont valides
if (
    Array.isArray(project.center) &&
    project.center.length === 2 &&
    project.center.every(Number.isFinite) &&
    Number.isFinite(project.zoom)
) {
    map.flyTo(project.center, project.zoom, {
        duration: 1.2
    });
}
}

// Recalculer la taille de la carte
setTimeout(function() {
    map.invalidateSize();
}, 200);

// =====================================
// 4. CLICS SUR LES BOUTONS DU MENU
// =====================================

document.querySelectorAll(".sidebar .project[data-project]").forEach(function(button) {

    button.addEventListener("click", function() {

        const projectId = button.getAttribute("data-project");

        showProject(projectId);

    });

});


// =====================================
// 5. CLICS SUR LES CARTES DE PROJETS
// =====================================

document.querySelectorAll(".project-card-button[data-project]").forEach(function(button) {

    button.addEventListener("click", function() {

        const projectId = button.getAttribute("data-project");

        showProject(projectId);

    });

});

showProject("accueil");
