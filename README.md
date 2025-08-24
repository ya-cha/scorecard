# Scorecard - Boulder Competition PWA

Eine Progressive Web App (PWA) für Boulder-Competitions, entwickelt mit Vue.js 3 und TypeScript.

## 🧗‍♀️ Funktionen

- **90 Boulder**: Übersicht aller Boulder von 1 bis 90
- **Z-Checkbox**: Markierung für "Zone" (Zwischenziel)
- **T-Checkbox**: Markierung für "Top" (Vollendung)
- **Automatische Logik**: Wenn T angekreuzt wird, wird Z automatisch auch angekreuzt
- **Lokaler Speicher**: Alle Daten werden automatisch im Browser gespeichert
- **PWA**: Kann als App installiert werden
- **Responsive Design**: Funktioniert auf allen Geräten
- **Daten löschen**: Über den Löschen-Button können alle Daten zurückgesetzt werden

## 🚀 Installation & Entwicklung

### Voraussetzungen
- Node.js 18+ 
- npm oder yarn

### Setup
```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# App bauen
npm run build

# Vorschau des Builds
npm run preview
```

## 📱 PWA-Features

- **Offline-Funktionalität**: App funktioniert auch ohne Internetverbindung
- **Installierbar**: Kann auf dem Homescreen installiert werden
- **App-ähnliches Verhalten**: Vollbildmodus ohne Browser-UI

## 🎨 Verwendung

1. **Boulder markieren**: Klicken Sie auf die Z-Checkbox für Zone oder T-Checkbox für Top
2. **Automatische Speicherung**: Alle Änderungen werden automatisch gespeichert
3. **Daten löschen**: Klicken Sie auf den roten "🗑️ Löschen" Button, um alle Daten zurückzusetzen

## 🔧 Technische Details

- **Frontend**: Vue.js 3 mit Composition API
- **Sprache**: TypeScript
- **Styling**: CSS mit Grid-Layout
- **PWA**: Vite PWA Plugin
- **Service Worker**: Für Offline-Funktionalität
- **Lokaler Speicher**: localStorage für Datenpersistenz

## 📱 Browser-Support

- Chrome/Edge (PWA-Features)
- Firefox (grundlegende Funktionalität)
- Safari (grundlegende Funktionalität)
- Mobile Browser (responsive Design)

## 🎯 Verwendungszweck

Diese App ist ideal für:
- Boulder-Competitions
- Kletterhallen mit vielen Routen
- Persönliche Fortschrittsverfolgung
- Offline-Tracking von Kletterleistungen

## 📄 Lizenz

Private Nutzung - Alle Rechte vorbehalten
