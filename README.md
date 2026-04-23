# Orienteering Web App (Google Apps Script)

En kraftfull orienterings-app byggd för att bäddas in på Google Sites via iFrame.

## Funktioner
- 🗺️ **Interaktiv Karta**: Drivs av Leaflet.js med mörkt tema.
- 📍 **Geofencing**: Automatisk stämpling när du är inom 15-20m från en kontroll.
- 📊 **Live Stats**: Tid, sprungen distans och avstånd till nästa kontroll i realtid.
- 💾 **Persistence**: Sparar sessionen i `localStorage` - loppet fortsätter även om webbläsaren laddas om.
- 📈 **Resultatloggning**: Sparar tid, distans, splits och "omvägs-procent" direkt till Google Sheets.
- 📱 **Mobiloptimerad**: Designad för en sömlös upplevelse i mobilen.

## Installation

### 1. Skapa Google Sheet
Skapa ett nytt Google Spreadsheet och ge det två flikar:
- **Courses**: (ID, Name, Data (JSON))
- **Results**: (Timestamp, CourseID, User, Time, Distance, Detour %, Splits JSON)

*Appen skapar dessa automatiskt med exempeldata vid första körning om de saknas.*

### 2. Installera Scriptet
1. Öppna Spreadsheetet -> **Extensions** -> **Apps Script**.
2. Kopiera innehållet från `Code.gs` och klistra in.
3. Skapa en ny fil i Apps Script-editorn som heter `Index.html` och klistra in koden från `Index.html`.
4. **Spara** projektet.

### 3. Driftsättning (Deployment)
1. Klicka på **Deploy** -> **New Deployment**.
2. Välj typ: **Web App**.
3. Execute as: **Me**.
4. Who has access: **Anyone** (viktigt för Google Sites inbäddning).
5. Kopiera Web App URL:en.

### 4. Bädda in på Google Sites
1. Gå till din Google Site.
2. Infoga **knapp** -> **URL**.
3. Klistra in Web App URL:en.
4. (Valfritt) Lägg till parametrar: `?mode=create` eller `?banaId=XYZ`.

## För utvecklare
- **Geofencing**: Kontrolleras i `checkGeofence()` i `Index.html`. Standardradie är 15-20m.
- **Kartlager**: Använder CartoDB Dark Matter. Kan bytas ut i `initMap()`.
- **Ljud/Vibration**: Triggat vid "Punch". Kräver användarinteraktion (Klick på Start) för att tillåtas av moderna webbläsare.
