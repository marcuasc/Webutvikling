# Prosjekt 3


## Oversikt

Vi har laget en nettside der brukere kan søke etter filmer. Brukeren kan søke på filmtittler, filtrere på sjanger, filtrere på budsjett og filtrere på filmens lengde.
Resultatsettet som passer med brukerens valg blir vist på listeform med tittel og bilde. Brukeren kan også sortere resultate etter tittel(alfabetisk/motsatt alfabetisk), varighet(stigende/synkende) og budsjett(stigende/synkende).

Alle filmene kan trykkes på for å vise ekstra informasjon. Her kan brukeren gi den valgte filmen en vurdering fra 1-5. Dette kan kun gjøres en gang per film per session.

Til høyre i headeren befinner det seg en knapp der brukeren kan bytte mellom light/darkmode.

## Installasjon
**Hvordan kjøre prosjektet**
* Lag en mappe der du kloner repoet.
* Installer [Node.js](https://nodejs.org)
* Naviger deg inn i `server` mappen, og skriv `npm install`for å installere nødvendige pakker. Deretter skriv `npm start` i terminalen for å starte backend
* Åpne en ny terminal, naviger deg inn i `client` mappen, og skriv `npm install`for å installere nødvendige pakker. Deretter skriv `npm start` for å starte frontend
* Skriv `npm test` i `client` for å kjøre tester


# Backend

## Film-objekter

Databasen vår består kun av film-objekter.

Et film objekt ser slik ut:

```javascript
movie: {
    title: {String},
    poster_path: {String},
    genre: {Array<String>},
    desc: {String},
    budget: {Number},
    release_date: {Date},
    duration: {Number},
    ratings: {Array<Number>}
}
```

Vi har valgt å lagre alle vurderinger av filmer som et array i hver film. Når er film hentes fra databasen blir gjennomsnittet av vurderingene regnet ut og returnert sammen med filmen.

`poster_path` inneholder en lenke til den valgte filmens poster på [TMDB](https://www.themoviedb.org/).


## Rest-API

Vi har laget et Rest-API for å kunne sende og hente data fra databasen. APIet er basert på express og mongoose, og er skrevet i JavaScript.

Vi har valgt å lage Rest-API i JavaScript ettersom gruppens medlemmer hadde erfaring med dette fra tidligere prosjekter.


APIet består av tre filer: `index.js`, `routes/movie.js` og `model/movie.js`.

`index.js` tar seg av koblingen til databasen, CORS-tillatelse og routing til riktig endepunkt.

`model/movie.js` inneholder skjemaet for hvilke atributter som inngår i en movie-objekt.





`routes/movie.js` inneholder tre endepunkter for å muliggjøre ønsket interaksjon med databasen.

`router.get(/)` er hovedmetoden som tar seg av søk på tittel, filtrering, sortering og pagination. Metoden tar inn et filtreringsobjekt fra `makeFindObject()` og et sorteringsobjekt fra `makeSortObject()` , og sender en GET-request til databasen med den generete adressen.  
`makeFindObject()` og `makeSortObject()` tar inn et queryobjekt fra klienten ved hjelp av pakken `qs`, og genererer adressen som samsvarer med brukerens valg.

`router.get(/)` returnerer title og poster_path på filmobjektene som passer med søket, samt antall sider med filmer og hvilket side det hentes fra. 

`router.get(/id/:id)` brukes for å finne alle atributtene til et filmobjekt, bestemt på ID.
Denne metoden benyttes når en bruker trykker seg inn på en film for å se flere detaljer om filmen.

`router.put(/id/:id)` brukes for å oppdatere rangeringen på en film. 


## Database

Databasen vår kjøres på NTNUs virituelle maskiner.

Databasen består av 1000 filmer. Dette er en tilstrekkelig mengde for å kunne teste nettsiden da alle sjangere er representert i et eksisterende film-objekt. 

Filtrering på nedre/øvre for budsjett for en film vil naturligvis ikke gi noen treff for veldig høye/lave verdier, men dette kan ikke løses med større dataset.
Det sammen gjelder nedre/øvre grense for sortering på varighet.


Datasettet er generert av en egen JSON-mapper gruppen har skrevet i JavaScript. Denne er ikke inkludert i leveransen til prosjektet. Vi hentet data gjennom APIet til [TMDB](https://developers.themoviedb.org/3), og mappet det om til å inneholde atributtene vi ønsket. 
Alle filmene i databasen inneholder originalt to vurderinger, som er tilfeldig generert.
 

# Frontend

## Typescript og React

Frontend er (selvfølgelig) laget i React. Hele frontend delen bruker TypeScript på en god og hensiktsmessig måte. 

## Redux

Vi bruker Redux for state management i vår applikasjon. All implementasjon av Redux ligger i mappen /src/redux.

Vi har delt opp Redux state management i flere reducers, hver til sin del av applikasjonen. Vi har delt det opp i `search`, `sort`, `result` og `filter`. Disse blir satt sammen igjen til en reducer i `rootReducer.ts`. Dette har vi gjort for å få en oversiktlig, hensiktsmessig og konsekvent implementasjon av state management.

Vi bruker redux-thunk for asynkrone handlinger, react-redux for å gi tilgang til state for alle komponenter og redux-devtools-extension for loggføring og debugging av redux.

I en ekte release ville vi fjernet redux-devtools-extension i og med at det kan åpne uønsket insikt i applikasjonen.

Under vil du se en ganske detaljert beskrivelse av hvordan vi bruker redux og hvorfor vi mener vi vise Videregående kunnskap og ferdigheter i state management.

### Search

Denne delen av redux har ansvar for å holde informasjon angående (you guessed it) søk. Den holder oversikt om man fåreløpig søker, hvilket resultater man har fått, om man har fått en error på søket, hva man søkte på var, hvilken side man er på og hvor mange sider totalt søket ga.

Search har en del actions som komponenter kan ta i bruk, bla. fetchResults. Dette er en asynkron action, satt sammen av flere actions for å requeste resultater, og avhenging av respons, vise resultatene eller vise error av requesten. (Mer om dette i Rest API og Axios)

Komponentene som bruker denne delen av redux er: `SearchResults`, `SearchBar` og `PageContainer`.

### Sort

Denne delen av redux har ansvar for å holde styr på hvordan resultatene ønskes å sorteres. Den holder informasjon om type sortering og i hvilken retning det ønskes.

Sort har actions for å oppdatere denne informasjonen som komponenter kan bruke.

Komponentene som bruker denne delen av redux er: `SearchResults` og `SortSelect`

### Result

Denne delen av redux har ansvar for å holde styr på resultatet (filmen) brukeren for øyeblikket ønsker å se. Den holder informasjon om `MovieDialog` skal være åpen, om den foreløpig laster inn resultatet og om den fikk en error når den lastet inn. Den holder også all informasjonen om resultatet som den får Rest API'et.

Result har flere actions som komponenter kan ta i bruk, bla. `fetchMovie` og `putRatings` som begge er asynkrone handlinger. Mer om dette i Rest API og Axios.

Komponenter som tar i bruk denne delen av redux er: `ResultContainer`, `CustomizedRatings` og `MovieDialog`.

### Filter

Denne delen av redux har ansvar for hvordan brukeren ønsker å filtrere på søket sitt. Den holder informasjon på om `FilterDialog` skal være åpen og på hilke sjangre, lengde og budsjett søket skal filtrere på.

Filter har actions vår å sette disse variablene.

Komponentene som tar i bruk denne delen av redux er: `FilterDialog` og `SearchResults`

## Tredjepartskomponenter (MaterialUI)

I dette prosjektet har vi brukt mange tredjepartskomponenter fra [Material UI](https://material-ui.com/). 
Vi valgte dette biblioteket av komponenter fordi det er meget populært (brukt av store firmaer som Nasa, Netflix og Amazon), det har god (ikke perfekt) støtte for TypeScript og det dekker alle våre behov for tredjepartskomponenter i dette prosjektet.

Ved å velge tredjepartskomponenter fra ett bibliotek, oppnår vi en gjennomgående stil med ekstra funksjonalitet som vi kanskje ellers ikke kunne fått (mer om dette i Design og responsivitet).

For å nevne noen komponenter fra MUI som vi bruker: `MUIThemeProvider`, `Box`, `Appbar`, `Toolbar`, `Button`, `IconButton`, `Dialog`, `Rating` og mer.

Dette er begrunnelsen vår til hvorfor vi mener at vi viser Videregående ferdigheter i å finne og velge gode tredjeparts komponenter.

## Søk, sortering, filtrering og store sett av data

I frontend er det én komponent som har ansvar for å kalle selve søket. Det er `SearchResults`. Vi synes det er passende fordi det er denne komponenten som skal holde alle resultatene.

Søket blir utført gjennom redux handlingen fetchResults. Denne tar inn et parameter object er definert etter ParamsInterface:
```javascript
interface ParamsInterface {
    q: string;
    page: number;
    genre?: Array<string>;
    duration?: {
        gt: number;
        lt: number;
    };
    budget?: {
        gt: number;
        lt: number;
    };
    sortBy: {
        type: "title" | "duration" | "budget";
        descending: boolean;
    };
}
```
(q står for query, gt for greater than og lt for less than)
Dette er alle måtene man kan påvirke søktet på.
fetchResults tar inn dette objectet, stringifier det ved hjelp av `qs` og utfører en get request med parameterne. (Se Rest API og Axios). Avhengig av svaret blir en success eller failure handling dispatchet.

Parameterne i parameter objektet er som sagt definiert i redux staten til alle tider. Når noen av disse endres i redux staten, vil `SearchResults` kalle `fetchResults` med oppdatert parameter objekt ved hjelp av `useEffect`hooken.

For å behandle store sett av data, bruker vi pagination. Hvert søk gir antall sider med i søket. Dette blir satt i staten, sammen med hvilken side man er på. Dette går videre til `PageContainer` som er et interaktivt display av sider. `PageContainer` kan oppdatere `CurrentPage` i redux staten som trigger et nytt søk. 

Vi kunne i teorien hatt MANGE flere filmer i og med at frontend henter kun 12 filmer om gangen, uansett hvor mange som passer parameterne.

Dette er vår begrunnelse for hvorfor vi mener vi viser Videregående kunnskap og ferdigheter i søk, sortering, filtrering og representasjon av store sett av data.

## Rest API og Axios

Frontend bruker Axios for a sende get og put requests til backend. Alle kall til Rest API'et blir behandlet gjennom redux for en stabil og forutsigbar interaksjon med backend.

Vi har tre redux actions som kommuniserer med API'et, `fetchResults`, `fetchMovie` og `putRatings`. Siden disse kommuniserer med API'et, er alle asynkrone. Vi har derfor brukt `redux-thunk` i implementasjonen av disse handlingene.

Hvis noen av axios kallene failer, blir de fanget og korrekte actions for å behandle feilene blir kallt.

## Design og responsivitet

Designet på siden vår blir stort sett definert av Material UI sine komponenter. Biblioteket er stilrent og moderne.

Siden vi bruker bare komponenter fra MUI, har vi muligheten til å implementere themes ved hjelp av `MUIThemeProvider`. Denne gir tilgang til det nåværende temaet for alle child komponenter. Dette har vi brukt til å implementere farger som går gjennom hele veien. Vi har en hovedfarge og en sekundærfarge. Begge to har definert lys og mørk versjon av seg selv. 

Vi bruker også dette til å implementere darkmode/lightmode etter hva brukeren ønsker. Knappen til høyre i `AppBar` sørger for at `darkMode` staten i `App.tsx`blir togglet. Dette gjenspeiles da i hvert eneste child til `MUIThemeProvider`.

Applikasjonen er så responsiv som mulig og fungerer godt på skjermer helt ned til 320x320 px. Vi har fått til dette ved MYE bruk av flex.


# Testing

## End-2-end

Vi bruker [Cypress](https://www.cypress.io/) for end-2-end testing av nettsiden vår.

Testene ligger i `/client/cypress/integration/test.js` og består av syv tester.

Testene simulerer bruk av de mest sentrale brukstilfellene av nettsiden:

* Søk på tittel
* Filtrering på sjanger
* Filtrering på budsjett
* Filtrering på varighet
* Sortering på tittel
* Sortering på budsjett
* Sortering på varighet
* Vise ekstra informasjon om valgt film


## Enhetstesting

Til enhetstesting på nettsiden vår bruker vi [Jest](https://jestjs.io/).

 Testene finnes i `client/src/components/__tests__/`
 
 Vi har 4 forskjellige Testsuites med 6 tester totalt:
 - `App.test.tsx`, som tester at appen renderer uten å krasje
 - `MovieDialogTest.test.tsx`, som tester at Dialogen er åpen når staten sier at den skal være det. 
 - `ReduxStoreTest.test.tsx`, som tester at action skjedde i storen når den blir dispatchet
 - `SearchResultTest.test.tsx`, som tester at Result har riktig state etter at en action har blitt kjørt.
 
For å kjøre alle testene skriver du `npm test` i `client` 


# Git & kode

## Git

Vi har brukt git til å dele opp utviklingsprosessen i issues. Nye branches ble laget for hvert issue, og alle et uniformt navn på formen `issue-xx-beskrivelse-her`. På denne måten er det lett å se hva som er blitt jobbet på i hver branch.
Merge-requester knyttes til hvilket issue det jobber på eller avslutter. Dette gir en ryddig historikk, der endringer tilbake i tid lett kan finnes, dersom det blir behov for det.

Alle merge-requester har blitt sett gjennom av et annent gruppemedlem for å forsikre oss om at koden som merges er feilfri. 


## Kode

Koden er kommentert der det kan være utfordrende å forstå hva den gjør. 

Prosjektet er delt opp i to moduler: `client` og `server`.

`client` inneholder alt av komponenter, redux, grensesnitt og tester. 

`server` inneholder Rest-APIet, med medfølgende sjema, ruter og endepunkter.







