# T36-Project-2: Footy Archives ⚽
This project is powered by React and Vite and will use a dataset to show every international football match played from 1872 to 2024!
The project can be viewed here: http://it2810-36.idi.ntnu.no/project2 

Be sure to be connected to NTNU's network 🌐


## Project - Build and run tests :gear: :wrench:
### Build and run the project locally



Open and run the frontend:
1. Open a new terminal
2. Navigate to frontend folder: `cd frontend`
3. Install the necessary packages: `npm install`
4. Run the project: `npm run dev`

Open and run the backend:
1. Open a new terminal
2. Navigate to the backend folder: `cd backend`
3. Install the necesarry packages: `npm install`
4. Start the server: `npm start`


### Run tests :wrench:
#### Vitest
1. First, navigate to the frontend folder: `cd frontend`
2. To run Vitest tests, use the command: `npm run test`

#### Cypress
1. First, navigate to the frontend folder: `cd frontend`
2. To run Cypress tests in headless mode, use the command: `npx cypress run --browser chrome`

3. You can also run Cypress tests in headed mode using the command: `npm run cy:open` 


## Concept
### Home
You can find some of the most interesting matches on this page, displaying them in different carousels so you could easily scroll through them and explore more games. You can also find more details about the match by clicking on it.Top nations is also represented here with their records on display. If you yo want to view different matchups, simply click the discovery button and it will take you to the Matchup page. You can also search for other nations or tournaments in the search field.
### Matchups
This page is ment for browsing through different matches, using filters for different combinations and with the exlusive button, you can set different countries up head to head to view their matchups. You can filter on nations, tournaments and different years.

### Tournaments
International football has a variety of tournaments and every tournament has its own page where you will be able to see tournaments from different years.

### Country page
Every country has its own page, displaying the nations record, recent matches, biggest wins and worst defeats. You can even see their rival nation!

## Accessibility :accessibility:

### Language
There is a language button so you can view the page in both english and norwegian.
### Lightmode/Darkmode
You can switch between lightmode and darkmode to fit your needs. 
### Aria labels
Aria labels are used to support screen readers
### Keyboard accesibility
We've made sure that users can use Footy Archives with a keyboard alone.

## Sustainability 🥬

### Caching
We've utilized Apollo Clients's in-memory cache to store results of GraphQL queries locally. This reduces the need for repeated network request, which makes the website both faster and reduces the energy consumption from data transfers and server processing.

### Paging
We've used paging to make sure that only small parts of our large dataset is loaded at a time. This minimizes memory usage loading time and server usage, making Footy Archives more sustainable and easier to scale.

### Lightmode/Darkmode
The Lightmode/Darkmode option not only enhances the user experience, it also saves energy, with dark mode in particulary saving energy on OLED and AMOLED screens.

### Debounce
To optimize our search function, we've used debouncing to delay the execution of the search query until the user has stopped typing. This reduces unnecessary requests, which reduces server load.

## Responsivness
Footy Archives is fully resposnive and will work for both desktop and mobile users. For the mobile version, we modified our sidebar and navbar by merging them together and displaying it as a hamburger menu, this saved us space without loosing any functionality.








