import { useState, useMemo } from "react";
import "./styles.css";

function rng(seed) {
  let s = seed;
  return function () {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const MODELES = [
  ["Peugeot", "308", 14500],
  ["Peugeot", "3008", 19500],
  ["Renault", "Clio", 11000],
  ["Renault", "Captur", 14000],
  ["Volkswagen", "Golf", 17500],
  ["Citroën", "C3", 9500],
  ["BMW", "Série 3", 24000],
  ["Audi", "A3", 21000],
  ["Toyota", "Yaris", 12500],
  ["Ford", "Fiesta", 9800],
  ["Mercedes", "Classe A", 23000],
  ["Dacia", "Sandero", 8800],
  ["Nissan", "Qashqai", 16500],
  ["Opel", "Corsa", 9900],
];

const VILLES_GEO = [
  ["Paris", 48.86, 2.35],
  ["Marseille", 43.3, 5.37],
  ["Lyon", 45.76, 4.84],
  ["Toulouse", 43.6, 1.44],
  ["Nice", 43.7, 7.27],
  ["Nantes", 47.22, -1.55],
  ["Montpellier", 43.61, 3.88],
  ["Strasbourg", 48.57, 7.75],
  ["Bordeaux", 44.84, -0.58],
  ["Lille", 50.63, 3.06],
  ["Rennes", 48.11, -1.68],
  ["Reims", 49.26, 4.03],
  ["Saint-Étienne", 45.44, 4.39],
  ["Toulon", 43.12, 5.93],
  ["Le Havre", 49.49, 0.11],
  ["Grenoble", 45.19, 5.72],
  ["Dijon", 47.32, 5.04],
  ["Angers", 47.47, -0.55],
  ["Nîmes", 43.84, 4.36],
  ["Villeurbanne", 45.77, 4.88],
  ["Le Mans", 48.0, 0.2],
  ["Aix-en-Provence", 43.53, 5.45],
  ["Clermont-Ferrand", 45.78, 3.09],
  ["Brest", 48.39, -4.49],
  ["Tours", 47.39, 0.69],
  ["Limoges", 45.83, 1.26],
  ["Amiens", 49.89, 2.3],
  ["Perpignan", 42.7, 2.9],
  ["Metz", 49.12, 6.18],
  ["Besançon", 47.24, 6.02],
  ["Boulogne-Billancourt", 48.84, 2.24],
  ["Orléans", 47.9, 1.91],
  ["Mulhouse", 47.75, 7.34],
  ["Rouen", 49.44, 1.1],
  ["Caen", 49.18, -0.37],
  ["Nancy", 48.69, 6.18],
  ["Saint-Denis", 48.94, 2.36],
  ["Argenteuil", 48.95, 2.25],
  ["Montreuil", 48.86, 2.44],
  ["Roubaix", 50.69, 3.17],
  ["Tourcoing", 50.72, 3.16],
  ["Avignon", 43.95, 4.81],
  ["Nanterre", 48.89, 2.21],
  ["Créteil", 48.79, 2.46],
  ["Dunkerque", 51.03, 2.38],
  ["Poitiers", 46.58, 0.34],
  ["Versailles", 48.8, 2.13],
  ["Asnières-sur-Seine", 48.91, 2.29],
  ["Colombes", 48.92, 2.25],
  ["Aulnay-sous-Bois", 48.94, 2.5],
  ["Vitry-sur-Seine", 48.79, 2.39],
  ["Pau", 43.3, -0.37],
  ["La Rochelle", 46.16, -1.15],
  ["Calais", 50.95, 1.86],
  ["Antibes", 43.58, 7.12],
  ["Cannes", 43.55, 7.01],
  ["Béziers", 43.34, 3.22],
  ["Colmar", 48.08, 7.36],
  ["Bourges", 47.08, 2.4],
  ["Mérignac", 44.84, -0.65],
  ["Saint-Nazaire", 47.27, -2.21],
  ["Ajaccio", 41.92, 8.74],
  ["Bastia", 42.7, 9.45],
  ["Valence", 44.93, 4.89],
  ["Troyes", 48.3, 4.08],
  ["Quimper", 48.0, -4.1],
  ["Lorient", 47.75, -3.37],
  ["Vannes", 47.66, -2.76],
  ["Niort", 46.32, -0.46],
  ["Chambéry", 45.57, 5.92],
  ["Annecy", 45.9, 6.13],
  ["Cergy", 49.04, 2.08],
  ["Évry-Courcouronnes", 48.63, 2.43],
  ["Pessac", 44.81, -0.63],
  ["Cholet", 47.06, -0.88],
  ["Saint-Malo", 48.65, -2.03],
  ["Beauvais", 49.43, 2.08],
  ["Hyères", 43.12, 6.13],
  ["Épinal", 48.17, 6.45],
  ["Châteauroux", 46.81, 1.69],
  ["Albi", 43.93, 2.15],
  ["Arles", 43.68, 4.63],
  ["Blois", 47.59, 1.34],
  ["Brive-la-Gaillarde", 45.16, 1.53],
  ["Montauban", 44.02, 1.35],
  ["Carcassonne", 43.21, 2.35],
  ["Laval", 48.07, -0.77],
  ["Évreux", 49.02, 1.15],
  ["Belfort", 47.64, 6.86],
  ["Chartres", 48.45, 1.49],
  ["Saint-Brieuc", 48.51, -2.76],
  ["Agen", 44.2, 0.62],
  ["Tarbes", 43.23, 0.08],
  ["Bayonne", 43.49, -1.47],
  ["Biarritz", 43.48, -1.56],
  ["Narbonne", 43.18, 3.0],
  ["Sète", 43.4, 3.7],
  ["Draguignan", 43.54, 6.47],
  ["Fréjus", 43.43, 6.74],
  ["Salon-de-Provence", 43.64, 5.1],
  ["Martigues", 43.41, 5.05],
  ["Saint-Quentin", 49.85, 3.29],
  ["Charleville-Mézières", 49.77, 4.72],
  ["Compiègne", 49.42, 2.83],
  ["Valenciennes", 50.36, 3.52],
  ["Douai", 50.37, 3.08],
  ["Lens", 50.43, 2.83],
  ["Arras", 50.29, 2.78],
  ["Cambrai", 50.18, 3.23],
  ["Thionville", 49.36, 6.17],
  ["Haguenau", 48.82, 7.79],
  ["Meaux", 48.96, 2.88],
  ["Melun", 48.54, 2.66],
  ["Fontainebleau", 48.4, 2.7],
  ["Rambouillet", 48.64, 1.83],
  ["Saint-Germain-en-Laye", 48.9, 2.09],
  ["Massy", 48.73, 2.27],
  ["Saint-Maur-des-Fossés", 48.8, 2.5],
  ["Vincennes", 48.85, 2.44],
  ["Neuilly-sur-Seine", 48.88, 2.27],
  ["Levallois-Perret", 48.89, 2.29],
  ["Issy-les-Moulineaux", 48.82, 2.27],
  ["Blagnac", 43.64, 1.39],
  ["Colomiers", 43.61, 1.34],
  ["Tournefeuille", 43.59, 1.34],
  ["Muret", 43.46, 1.33],
  ["Villefranche-sur-Saône", 45.99, 4.72],
  ["Bourg-en-Bresse", 46.21, 5.23],
  ["Vienne", 45.52, 4.87],
  ["Romans-sur-Isère", 45.04, 5.05],
  ["Gap", 44.56, 6.08],
].sort((a, b) => a[0].localeCompare(b[0], "fr"));

const VILLES = VILLES_GEO.map((v) => v[0]);
const GEO = {};
VILLES_GEO.forEach((v) => {
  GEO[v[0]] = [v[1], v[2]];
});

function distanceKm(v1, v2) {
  const a = GEO[v1];
  const b = GEO[v2];
  if (!a || !b) return Infinity;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(a[0])) *
      Math.cos(toRad(b[0])) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

const SOURCES = [
  "Leboncoin",
  "La Centrale",
  "Facebook Marketplace",
  "Paruvendu",
  "Autre",
];
const NB_ANNONCES = 300;

const normaliser = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function prixMarche(marque, modele, annee, km) {
  const entree = MODELES.find(
    (m) =>
      m[0].toLowerCase() === marque.toLowerCase() &&
      m[1].toLowerCase() === modele.toLowerCase()
  );
  if (!entree) return null;
  const p =
    entree[2] * (1 + (annee - 2020) * 0.06) * (1 - (km - 60000) / 400000);
  return Math.round(p / 50) * 50;
}

function genererAnnonces() {
  const r = rng(42);
  return Array.from({ length: NB_ANNONCES }, (_, i) => {
    const m = MODELES[i % MODELES.length];
    const annee = 2012 + Math.floor(r() * 11);
    const km = Math.round(((2026 - annee) * (9000 + r() * 9000)) / 100) * 100;
    const marche = prixMarche(m[0], m[1], annee, km);
    const prix = Math.round((marche * (0.88 + r() * 0.3)) / 50) * 50;
    return {
      id: i + 1,
      marque: m[0],
      modele: m[1],
      annee,
      km,
      prix,
      marche,
      jours: 8 + Math.floor(r() * 90),
      ville: VILLES[Math.floor(r() * VILLES.length)],
      source: SOURCES[Math.floor(r() * 4)],
    };
  });
}

const ANNONCES = genererAnnonces();

const CLE = "mandataire-annonces-perso";
function chargerPerso() {
  try {
    return JSON.parse(localStorage.getItem(CLE) || "[]");
  } catch (e) {
    return [];
  }
}
function sauverPerso(liste) {
  try {
    localStorage.setItem(CLE, JSON.stringify(liste));
  } catch (e) {}
}

function qualifier(a) {
  const r = rng(a.id * 7 + 3);
  const motivation = 3 + Math.floor(r() * 8);
  const etats = ["Très bon état", "Bon état", "État correct", "À rafraîchir"];
  const etat = etats[Math.floor(r() * etats.length)];
  const papiers = r() > 0.2;
  const marge = 3 + Math.floor(r() * 10);
  const urgence = a.jours > 60 ? "Élevée" : a.jours > 30 ? "Moyenne" : "Faible";
  const score = Math.round(
    motivation * 10 * 0.4 +
      (Math.min(a.jours, 90) / 90) * 100 * 0.3 +
      (marge / 12) * 100 * 0.3
  );
  const message =
    "Bonjour, votre " +
    a.marque +
    " " +
    a.modele +
    " " +
    a.annee +
    " est-elle toujours disponible ? Je travaille avec un mandataire automobile qui peut " +
    "s'occuper de la vente à votre place, sans frais pour vous. Seriez-vous ouvert à en discuter ?";
  return {
    motivation,
    etat,
    papiers,
    marge,
    urgence,
    score: Math.min(score, 100),
    message,
  };
}

const couleurScore = (s) =>
  s >= 70 ? "#16a34a" : s >= 50 ? "#d97706" : "#6b7280";
const euro = (n) => n.toLocaleString("fr-FR") + " €";

const card = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 10,
  padding: 12,
  marginBottom: 10,
};
const champ = {
  width: "100%",
  padding: 7,
  borderRadius: 8,
  border: "1px solid #d1d5db",
  boxSizing: "border-box",
  marginBottom: 6,
};
const chip = (actif) => ({
  padding: "4px 10px",
  borderRadius: 999,
  border: "1px solid " + (actif ? "#2563eb" : "#d1d5db"),
  background: actif ? "#2563eb" : "#fff",
  color: actif ? "#fff" : "#374151",
  fontSize: 12,
  cursor: "pointer",
  marginRight: 6,
  marginBottom: 6,
});

const FORM_VIDE = {
  marque: "",
  modele: "",
  annee: "2018",
  km: "",
  prix: "",
  ville: "",
  jours: "30",
  source: "Leboncoin",
  lien: "",
};

export default function App() {
  const [source, setSource] = useState("Toutes");
  const [villes, setVilles] = useState([]);
  const [rayon, setRayon] = useState(0);
  const [recherche, setRecherche] = useState("");
  const [joursMin, setJoursMin] = useState(30);
  const [selection, setSelection] = useState([]);
  const [fiches, setFiches] = useState([]);
  const [ouverte, setOuverte] = useState(null);
  const [perso, setPerso] = useState(chargerPerso);
  const [formOuvert, setFormOuvert] = useState(false);
  const [form, setForm] = useState(FORM_VIDE);
  const [erreur, setErreur] = useState("");

  const toutes = useMemo(() => [...perso, ...ANNONCES], [perso]);

  const suggestions = useMemo(() => {
    const q = normaliser(recherche.trim());
    if (!q) return [];
    return VILLES.filter(
      (v) => !villes.includes(v) && normaliser(v).includes(q)
    ).slice(0, 10);
  }, [recherche, villes]);

  const visibles = useMemo(
    () =>
      toutes.filter(
        (a) =>
          (source === "Toutes" || a.source === source) &&
          (villes.length === 0 ||
            villes.some(
              (v) =>
                a.ville === v || (rayon > 0 && distanceKm(v, a.ville) <= rayon)
            )) &&
          a.jours >= joursMin
      ),
    [toutes, source, villes, rayon, joursMin]
  );

  const ajouterVille = (v) => {
    setVilles((x) => (x.includes(v) ? x : [...x, v]));
    setRecherche("");
  };
  const retirerVille = (v) => setVilles((x) => x.filter((y) => y !== v));
  const toggleSel = (id) =>
    setSelection((x) =>
      x.includes(id) ? x.filter((y) => y !== id) : [...x, id]
    );
  const toutSelectionner = () => setSelection(visibles.map((a) => a.id));

  const maj = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const ajouterAnnonce = () => {
    const annee = Number(form.annee);
    const km = Number(form.km);
    const prix = Number(form.prix);
    if (!form.marque.trim() || !form.modele.trim() || !prix || !km || !annee) {
      setErreur(
        "Marque, modèle, année, kilométrage et prix sont obligatoires."
      );
      return;
    }
    const lien = form.lien.trim().startsWith("http") ? form.lien.trim() : "";
    const nouvelle = {
      id: Date.now() % 100000000,
      perso: true,
      marque: form.marque.trim(),
      modele: form.modele.trim(),
      annee,
      km,
      prix,
      marche: prixMarche(form.marque.trim(), form.modele.trim(), annee, km),
      jours: Number(form.jours) || 0,
      ville: form.ville.trim() || "Non précisée",
      source: form.source,
      lien,
    };
    const liste = [nouvelle, ...perso];
    setPerso(liste);
    sauverPerso(liste);
    setForm(FORM_VIDE);
    setErreur("");
    setFormOuvert(false);
  };

  const retirerPerso = (id) => {
    const liste = perso.filter((a) => a.id !== id);
    setPerso(liste);
    sauverPerso(liste);
    setSelection((x) => x.filter((y) => y !== id));
  };

  const lancer = () => {
    const nouvelles = toutes
      .filter(
        (a) =>
          selection.includes(a.id) && !fiches.some((f) => f.annonce.id === a.id)
      )
      .map((a) => ({ annonce: a, q: qualifier(a) }));
    setFiches((f) =>
      [...f, ...nouvelles].sort((x, y) => y.q.score - x.q.score)
    );
    setSelection([]);
  };

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        background: "#f3f4f6",
        minHeight: "100vh",
        padding: 16,
      }}
    >
      <h1 style={{ margin: "0 0 4px", fontSize: 22 }}>
        Prospection mandataire auto
      </h1>
      <p style={{ margin: "0 0 16px", color: "#6b7280", fontSize: 13 }}>
        Prototype : annonces fictives + celles que tu saisis toi-même. Aucune
        annonce n'est récupérée automatiquement.
      </p>

      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: "1 1 380px", minWidth: 300 }}>
          <div style={card}>
            <button
              onClick={() => setFormOuvert(!formOuvert)}
              style={{ ...chip(formOuvert), marginBottom: 0 }}
            >
              {formOuvert
                ? "Fermer le formulaire"
                : "+ Ajouter une annonce que j'ai consultée"}
            </button>
            {formOuvert && (
              <div style={{ marginTop: 10 }}>
                <div
                  style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}
                >
                  Recopie uniquement les infos du véhicule. Pas de nom ni de
                  téléphone du vendeur : on le contacte via la messagerie de la
                  plateforme.
                </div>
                <input
                  style={champ}
                  placeholder="Marque (ex : Peugeot)"
                  value={form.marque}
                  onChange={maj("marque")}
                />
                <input
                  style={champ}
                  placeholder="Modèle (ex : 308)"
                  value={form.modele}
                  onChange={maj("modele")}
                />
                <div style={{ display: "flex", gap: 6 }}>
                  <input
                    style={champ}
                    placeholder="Année"
                    value={form.annee}
                    onChange={maj("annee")}
                  />
                  <input
                    style={champ}
                    placeholder="Kilométrage"
                    value={form.km}
                    onChange={maj("km")}
                  />
                  <input
                    style={champ}
                    placeholder="Prix (€)"
                    value={form.prix}
                    onChange={maj("prix")}
                  />
                </div>
                <input
                  style={champ}
                  list="villes-liste"
                  placeholder="Ville"
                  value={form.ville}
                  onChange={maj("ville")}
                />
                <datalist id="villes-liste">
                  {VILLES.map((v) => (
                    <option key={v} value={v} />
                  ))}
                </datalist>
                <div style={{ display: "flex", gap: 6 }}>
                  <input
                    style={champ}
                    placeholder="Jours en ligne"
                    value={form.jours}
                    onChange={maj("jours")}
                  />
                  <select
                    style={champ}
                    value={form.source}
                    onChange={maj("source")}
                  >
                    {SOURCES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <input
                  style={champ}
                  placeholder="Lien de l'annonce (pour mémoire, facultatif)"
                  value={form.lien}
                  onChange={maj("lien")}
                />
                {erreur && (
                  <div
                    style={{ color: "#dc2626", fontSize: 12, marginBottom: 6 }}
                  >
                    {erreur}
                  </div>
                )}
                <button
                  onClick={ajouterAnnonce}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 8,
                    border: "none",
                    background: "#16a34a",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Enregistrer l'annonce
                </button>
              </div>
            )}
          </div>

          <div style={card}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Filtres</div>
            <label style={{ fontSize: 13 }}>
              Source :{" "}
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                <option>Toutes</option>
                {SOURCES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>

            <div style={{ margin: "10px 0 4px", fontSize: 13 }}>
              Villes :{" "}
              {villes.length === 0 ? (
                <b>toute la France</b>
              ) : (
                <b>{villes.length} sélectionnée(s)</b>
              )}
            </div>
            <input
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Rechercher une ville (ex : Toulouse, Lyon...)"
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 8,
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
              }}
            />
            {suggestions.length > 0 && (
              <div
                style={{
                  marginTop: 6,
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  background: "#fff",
                }}
              >
                {suggestions.map((v) => (
                  <div
                    key={v}
                    onClick={() => ajouterVille(v)}
                    style={{
                      padding: "6px 10px",
                      cursor: "pointer",
                      fontSize: 13,
                      borderBottom: "1px solid #f3f4f6",
                    }}
                  >
                    + {v}
                  </div>
                ))}
              </div>
            )}
            <div style={{ marginTop: 8 }}>
              {villes.map((v) => (
                <button
                  key={v}
                  style={chip(true)}
                  onClick={() => retirerVille(v)}
                >
                  {v} ×
                </button>
              ))}
              {villes.length > 0 && (
                <button style={chip(false)} onClick={() => setVilles([])}>
                  Toute la France
                </button>
              )}
            </div>

            <label style={{ fontSize: 13, display: "block", marginTop: 6 }}>
              Inclure les environs :{" "}
              <b>{rayon === 0 ? "ville exacte" : "jusqu'à " + rayon + " km"}</b>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={rayon}
                onChange={(e) => setRayon(Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </label>

            <label style={{ fontSize: 13, display: "block", marginTop: 6 }}>
              En ligne depuis au moins <b>{joursMin} jours</b>
              <input
                type="range"
                min="0"
                max="90"
                value={joursMin}
                onChange={(e) => setJoursMin(Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </label>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
              gap: 8,
            }}
          >
            <b>{visibles.length} annonce(s)</b>
            <button onClick={toutSelectionner} style={chip(false)}>
              Tout sélectionner
            </button>
            <button
              onClick={lancer}
              disabled={selection.length === 0}
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                border: "none",
                background: selection.length ? "#2563eb" : "#9ca3af",
                color: "#fff",
                cursor: selection.length ? "pointer" : "default",
              }}
            >
              Lancer la prospection ({selection.length})
            </button>
          </div>

          {visibles.map((a) => {
            const ecart = a.marche
              ? Math.round(((a.prix - a.marche) / a.marche) * 100)
              : null;
            const badge =
              a.jours > 60 ? "#dc2626" : a.jours > 30 ? "#ea580c" : "#6b7280";
            return (
              <label
                key={a.id}
                style={{ ...card, display: "flex", gap: 10, cursor: "pointer" }}
              >
                <input
                  type="checkbox"
                  checked={selection.includes(a.id)}
                  onChange={() => toggleSel(a.id)}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <b>
                      {a.marque} {a.modele}{" "}
                      {a.perso && (
                        <span style={{ fontSize: 11, color: "#2563eb" }}>
                          (ma saisie)
                        </span>
                      )}
                    </b>
                    <span
                      style={{
                        background: badge,
                        color: "#fff",
                        borderRadius: 6,
                        padding: "1px 8px",
                        fontSize: 12,
                      }}
                    >
                      {a.jours} j en ligne
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: "#4b5563" }}>
                    {a.annee} · {a.km.toLocaleString("fr-FR")} km · {a.ville} ·{" "}
                    {a.source}
                  </div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>
                    Prix affiché <b>{euro(a.prix)}</b> ·{" "}
                    {a.marche ? (
                      <span>
                        marché {euro(a.marche)}{" "}
                        <span
                          style={{
                            color: ecart > 0 ? "#dc2626" : "#16a34a",
                            fontWeight: 600,
                          }}
                        >
                          ({ecart > 0 ? "+" : ""}
                          {ecart} %)
                        </span>
                      </span>
                    ) : (
                      "marché : non disponible"
                    )}
                  </div>
                  {a.perso && (
                    <div style={{ fontSize: 12, marginTop: 4 }}>
                      {a.lien && (
                        <a
                          href={a.lien}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Voir l'annonce d'origine
                        </a>
                      )}{" "}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          retirerPerso(a.id);
                        }}
                        style={{ ...chip(false), marginBottom: 0 }}
                      >
                        Retirer
                      </button>
                    </div>
                  )}
                </div>
              </label>
            );
          })}
          {visibles.length === 0 && (
            <div style={{ color: "#6b7280" }}>
              Aucune annonce avec ces filtres.
            </div>
          )}
        </div>

        <div
          style={{
            flex: "1 1 380px",
            minWidth: 300,
            position: "sticky",
            top: 16,
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 8 }}>
            Tableau de bord ({fiches.length} fiche(s) qualifiée(s))
          </div>
          {fiches.length === 0 && (
            <div style={{ ...card, color: "#6b7280" }}>
              Sélectionne des annonces à gauche puis clique sur « Lancer la
              prospection ».
            </div>
          )}
          {fiches.map(({ annonce: a, q }) => (
            <div key={a.id} style={card}>
              <div
                onClick={() => setOuverte(ouverte === a.id ? null : a.id)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <div>
                  <b>
                    {a.marque} {a.modele} {a.annee}
                  </b>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    {a.ville} · {euro(a.prix)}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: couleurScore(q.score),
                  }}
                >
                  {q.score}/100
                </div>
              </div>
              {ouverte === a.id && (
                <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.6 }}>
                  <div>
                    Motivation du vendeur : <b>{q.motivation}/10</b>
                  </div>
                  <div>
                    État déclaré : <b>{q.etat}</b>
                  </div>
                  <div>
                    Papiers en règle : <b>{q.papiers ? "Oui" : "À vérifier"}</b>
                  </div>
                  <div>
                    Marge de négociation estimée : <b>{q.marge} %</b>
                  </div>
                  <div>
                    Urgence : <b>{q.urgence}</b>
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      padding: 8,
                      background: "#f9fafb",
                      borderRadius: 6,
                    }}
                  >
                    <div style={{ fontSize: 12, color: "#6b7280" }}>
                      Message de premier contact (à envoyer par toi, via la
                      messagerie de la plateforme)
                    </div>
                    {q.message}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
