# Orienteering Pro (Google Apps Script)

En kraftfull och modern orienterings-app byggd för att bäddas in på Google Sites. Appen hanterar allt från banläggning till realtids-GPS-spårning och automatisk resultathantering i Google Sheets.

## ✨ Huvudfunktioner

- 🗺️ **Interaktiv Karta**: Drivs av Leaflet.js med stöd för både mörkt tema och satellitvy.
- 📍 **Smart Geofencing**: Automatisk stämpling när du är inom kontrollens radie (standard 15m, kan justeras per kontroll).
- 🛠️ **Banbyggare (Editor)**: 
    - Skapa nya eller redigera befintliga banor direkt i mobilen eller på desktop.
    - **Fält-läge**: Lägg till kontroller baserat på din nuvarande GPS-position ("Markera här").
    - **Drag-and-drop**: Ändra ordning på kontroller enkelt.
    - **Duplicera**: Skapa kopior av banor för snabba justeringar.
- 📊 **Live-statistik**: Se tid, sprungen distans och avstånd till nästa kontroll i realtid.
- 🛡️ **Robusthet**:
    - **Persistence**: Sparar sessionen i `localStorage` – loppet kan återupptas om webbläsaren laddas om.
    - **Wake Lock**: Förhindrar att skärmen slocknar under pågående lopp.
    - **GPS-vakt**: Visar varningar vid dålig precision och filtrerar bort GPS-brus.
- 📈 **Resultatloggning**: Sparar automatiskt tid, distans, splits och "omvägs-procent" direkt till Google Sheets.
- 🎉 **Feedback**: Ljud, vibration och konfetti vid målgång för en premiumkänsla.

## 🚀 Installation

### 1. Förbered Google Sheet
Skapa ett nytt Google Spreadsheet och ge det två flikar:
- **Courses**: Kolumner: `ID`, `Name`, `Data (JSON)`
- **Results**: Kolumner: `Timestamp`, `CourseID`, `User`, `Time`, `Distance (m)`, `Detour %`, `Splits JSON`

*Tips: Appen skapar dessa automatiskt med exempeldata vid första körning om de saknas.*

### 2. Installera Scriptet
1. Öppna Spreadsheetet -> **Extensions** -> **Apps Script**.
2. Ersätt koden i `Code.gs` med projektets `Code.gs`.
3. Skapa en ny fil i editorn: `Index.html` och klistra in innehållet från `Index.html`.
4. **Spara** projektet (Ge det ett namn, t.ex. "Orienteering Pro").

### 3. Driftsättning (Deployment)
1. Klicka på **Deploy** -> **New Deployment**.
2. Välj typ: **Web App**.
3. Execute as: **Me**.
4. Who has access: **Anyone** (Viktigt för att inbäddning ska fungera).
5. Kopiera din **Web App URL**.

### 4. Användning & Inbäddning
- **Standard**: Öppna URL:en för att välja bana och springa.
- **Skapa-läge**: Lägg till `?mode=create` i slutet av URL:en för att gå direkt till banbyggaren.
- **Google Sites**: Infoga en "Embed"-komponent och klistra in URL:en.

## 🛠️ För Utvecklare & Avancerade Användare

- **Geofencing**: Trigg-radien ställs in per kontroll i editorn. Appen varnar om radien är mindre än aktuell GPS-osäkerhet.
- **Omvägs-procent**: Beräknas genom att jämföra faktiskt sprungen sträcka med den ideala sträckan (fågelvägen mellan kontrollerna).
- **Kartlager**: Använder CartoDB (Dark) och Esri (Satelit). Kan konfigureras i `initMap()` och `initCreateMap()`.
- **Säkerhet**: Vid inbäddning i iFrame krävs attributen `allow="geolocation; wake-lock"` för full funktionalitet.

---
*Utvecklad som en modern PWA-liknande lösning för orienteringsklubbar och friluftsaktiviteter.*
