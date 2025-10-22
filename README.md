# Here Be Weather

## Contents

-   [Live Site](#live-site)
-   [Introduction](#introduction)
-   [Responsivity](#responsivity)
-   [User Experience](#user-experience)
-   [Design](#design)
-   [Website Features](#website-features)
-   [Future Features](#future-features)
-   [Technologies Used](#technologies-used)
    -   [AI Use](#ai-use)
-   [Deployment](#deployment)
-   [Testing](#testing)
    -   [Validation](#validation)
    -   [Manual Testing](#manual-testing)
    -   [Lighthouse](#lighthouse)
-   [Credits](#credits)

## Live Site

https://petercones.github.io/Weather-App/

## Introduction

Weather-App is a responsive website that delivers weather updates for any city worldwide. Users can search for locations, use their own geolocation, and view weather conditions visually on an interactive map. The site features dynamic backgrounds, weather cards, and search bar with dropdown suggestions.

## Responsivity

The site was fully responsive for mobile, tablet, and desktop. Screenshots of https://ui.dev/amiresponsive running our website shown below.

The map shown at startup resizes dynamically to fit the screen.

![site shown on large monitor, laptop, tablet, phone screen](documentation/responsivity-start.png)

The cards in the forecast section resize dynamically to fit the screen, with 1 card showing on mobile devices, 3 cards showing on tablet devices, and 4 cards showing on desktop devices and larger. (our website seems to break the hosting site for some reason as it seems to overflow the device, this is an issue with https://ui.dev/amiresponsive rather than ours)

![forecast cards shown on large monitor, laptop, tablet, phone screen](documentation/responsivity-cards.png)

There seems to be a slight issue with the forecast cards on mobile devices below 700px, as the right of the card starts to align with the right edge of the screen even though there should be a margin.

![forecast cards shown on phone screen](documentation/forecast-cards-phone.png)

## User Experience

### Strategy

Our strategy was to create a weather application that is intuitive, visually engaging, and accessible to users worldwide. We focused on delivering accurate weather information with interactive features such as map integration and dynamic backgrounds.

### Scope

The scope of this project included:

-   Providing real-time weather updates for any city globally.
-   Allowing users to search for locations or use their current geolocation.
-   Displaying weather information visually through cards, interactive map and colour and image changes based on weather conditions.
-   Ensuring the site is responsive and accessible.

Initially, we had thought to add a feature where users could see the weather from any past date (e.g. their birthday or important days in history). However, we discovered that the API that provided this infomation was only avaliable on a paid plan, so we pivoted to focus on the visual elements of the site e.g. the map.

### Structure

The structure of the site is simple as it is a one-page website. It includes a search bar at the top, an interactive map under which weather cards are displayed, and buttons to select hourly and daily weather reports.

### Skeleton

Balsamiq Wireframes were used to plan the layout of the site.

![Wireframes](documentation/Weather-app-wireframe.png)

As can be observed above, we had a framework for how we wanted to present the site & its key features.

Although simplistic, the added time allowed us to focus on UX by means of features & interactivity.

### Surface

## Design

From a design perspective, our main goal was to relay information the end-user visually.

To achieve this we included the following features:

-   Interactive map
-   Cards displaying weather information
-   Dynamic background

### Interactive Map

The interactive map acts as a hero section, immediately drawing the attention of the end-user.

This design approach allowed us to focus on functionality as a primary, due to the amount of content to which the user is presented.

### Weather Cards

On the map itself we have included a current temperature reading. This allows the end-user to quickly glance & gain useful insights re there entered location.

Scrolling further down the page reveals further weather information, this time in the form of cards.

The cards display images and weather data dependent on weather conditions & user location.

### Dynamic Background

We decided that the websites theme/background should change dependant on weather conditions.

To achieve this we applied different classes to the body based on data retrieved from the API.

### Colour Scheme

![Colour-Scheme](documentation/Colour-Scheme.png)

Instead of one colour for the background, we decided to gather a few different colours that would coincide with current temperature readings.

To achieve this, we asked AI to generate appropriate colours (with a fade transition).

Then we created a JS switch statement to decide which class(bg-colour) to use in relation to the current weather.

### Fonts

We decided to choose a font similar to that of a newspaper:

![Font-family](documentation/font-family.png)

The purpose of this was to create an environment that indicates to the user, _this site provides information_

## Website Features

### Geo-location

within the project scope phase, we deceided to include to means of aqcuiring the users information.

Namely, via a search text field & a geo-location button:

![Geo-location](documentation/Geo-locate.png)

Upon clicking this button, the user is prompted by their respective search engine whether to enable current location.

If accepted, the location on the map is updated & weather information is presented in the form of cards.

Additionally, the search function becomes locked & placeholder text is inserted into the search box to give an indication of where geo-locate has located them.

Finally, if the user wants to search for a place via text instead, a reset button appears once _Use my Location_ has been clicked.

### Interactive Map

As a one of the primary features of the site, the map adds both contexualised information as well as user interaction.

Upon either searching for a location or using the geo-location feature, the map will automatically _fly_ to the given location, place a pin & display simplified weather data in the form of current temperature:

![map](documentation/map.png)

Another feature of the map is the ability to overlay animations dependent on weather conditions.

For example, if it is currently raining in the user's given location, a rain animation will be overlayed:

![map-rain](documentation/map-rain.png)

Finally in the bottom right of the map is a custom layer.

This layer displays a current heat-map which presents pleasent visual feedback:

![map-heat](documentation/map-heat.png)

### API Error Message

If the APIs are not responding, a message is displayed to the user.
This prevents frustration as they have feedback as to what the problem is rather than just encountering a non-working site.

![API Error Message](documentation/APIWarning.png)

### Location Set on Site Load

When the user first enters the site, the weather is displayed for the location of their last search. This means the user doesn't have to repeatedly search for the location they are interested in as it is displayed immediately.

If the user has not searched anything previously, the location is set to London (as we are U.K based). This prevents the user from ever being presented an site without weather displayed.

![Previous Search](documentation/default-location.png)

![London Default](documentation/deafult-london.png)

### Dropdown for Search Bar

The search bar has a dropdown that appears when the user starts typing in the search box. This shows the avaliable cities and their country codes, so the user can click to select the right one. This saves them from typing out the whole phrase.

It also increases the accuracy of the search - although the search function will work if you type only a city name, the API might not return the right result (e.g. it returns London, GB when you wanted London, CA). The dropdown allows the user to get the correct information without having to know or type in the country codes. This makes the process quicker and reduces frustration.

![Dropdown](documentation/dropdown.png)

### Weather Cards

The site features bootstrap cards that display the current weather and forecast for the next 5 days. The cards are designed to be visually appealing and easy to read, with clear icons and text. Each card has an image that displays a different image based on the weather conditions. The content of the cards are aquired through the OpenWeatherMap API. The cards are dynamically generated with javascript and updated based on user input and location.

There are 2 sections for the weather cards: the current weather section and the forecast section.

The current weather section displays the weather for the location specified by the user on that day.
There are 2 buttons displayed: "Hourly" and "Daily", which allow the user to toggle between hourly and daily forecasts and jumps to the next section.

![Today's Weather Section](documentation/todays-weather.png)

The forecast section displays the weather forecast depending on which button the user clicks (hourly or daily). For hourly, the weather shows every 3 hours starting from the next slot after the current time.

![Forecast Weather Section - hourly](documentation/forecast-hourly-2-cards.png)

![Forecast Weather Section - hourly (all)](documentation/forcast-cards-all-hours.png)

For daily, the weather shows the next 5 days including today.

![Forecast Weather Section - daily](documentation/forecast-daily.png)

### Scroll to Top Button

Dynamic scroll to top button using JavaScript lets users jump back to the top of the page instantly, making browsing smooth and frustration free.

## Future Features

Implement the ability to navigate/select from the dropdown using keyboard as well as mouse.

Implement a feature to change the weather card images for night time hours.

Add a custom error message for invalid input to the search bar. At the moment if the user types in an invalid input, the error messages that displays is the same one as for an unreposponsive API ("We cannot fetch the weather"). This may cause confusion so we would like to add a custom error message e.g. "Please input a valid city name".

Increase dropdown specificity. Currently, the dropdown displays city names that are closest to the typed input (e.g., "Brista, HR" for "brist"), but not always the intended city (such as "Bristol, GB"). We aim to increase the number of items shown in the dropdown so that the desired city appears even when fewer letters are entered.

Remove the first card from the forecast. Currently the first card in the forecast section is the same as the one in Today's Weather. This may cause confusion, so we aim to remove this card and only display the future weather.

Not exactly a feature, but a wider range of images could be displayed in the cards, like for when it is just cloudy or when it is night time.

## Technologies Used

This site was coded with HTML, CSS, and JavaScript.

**Git** was used for version control.

**[Github](https://github.com/)** was used to save and store the files for the site.

**[Github Pages](https://pages.github.com/)** were used to deploy the site.

**[Github Issues Project Board](https://github.com/features/issues)** was used to track progress.

**[Bootstrap](https://getbootstrap.com/)** Framework (v5.3) was used for the grid structure and responsivity throughout the site.

**[OpenWeatherAPI](https://openweathermap.org/forecast5)** was used to retrieve the 5 day weather forecast.

**[OpenWeatherAPI - Geocoding](https://openweathermap.org/api/geocoding-api)** was used to retrieve co-ordinates for locations.

**[OpenStreetMapAPI](https://www.openstreetmap.org/)** was used to convert coordinates to plain text.

**[MapboxAPI](https://www.mapbox.com/)** was used to display the map.

**[WebAIM](https://webaim.org/resources/contrastchecker/)** was used to check the colour contrast for accessibility.

**[Sqoosh](https://squoosh.app/)** was used to compress images for the web.

**[Microsoft Copilot](https://copilot.microsoft.com/)** was used for image generation and debugging (see AI use section).

**[Chrome DevTools](https://developer.chrome.com/docs/devtools)** were used for debugging and testing.

**[W3 HTML Validator](https://validator.w3.org/)** was used for HTML validation.

**[W3 CSS Validator](https://validator.w3.org/)** was used for CSS validation.

### AI Use

#### Image Generation

The images for the weather cards were generated using Copilot including images for sun, drizzle, rain, snow, clouds, and extreme weather.

#### Code Generation

One way in which AI assisted us on this project was in code generation, specifically the background styles.

Initial Idea
I wanted my weather app to change its background depending on the current conditions. I asked the AI for help deciding on appropriate colour schemes.

Prompt: “I’m trying to make a weather app that changes background colour depending on the weather – can you help me decide the colours?”

Response: The AI suggested a palette for different conditions (sunny, cloudy, rainy, storm, snow, fog, hot, cold), with gradients instead of flat colours.

CSS Implementation
Next, I asked for actual CSS to implement these backgrounds with smooth transitions.

Prompt: “Can you provide the CSS for this? I’m thinking fades for each?”

Response: The AI generated a full CSS setup using data-weather attributes, gradients, variables for text colour, and transition effects.

![AI code generation](documentation/AIstyle.png)...

#### Debugging

While integrating Mapbox’s new rain effect (map.setRain()), I ran into a recurring error:

_Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'setRain')_

This happened whenever I tried to clear or reset the rain effect. I used an AI assistant to help isolate the cause and propose fixes. Here’s what came out of that process:

Problem Identified

The map object was undefined in the context where I called setRain.

In my code, clearRain() was running inside a different script (e.g. background.js) than the one where the map instance was actually created.

Because of that separation, my functions were trying to call map.setRain() on nothing.

Key Fixes

1. Pass the map object explicitly
   Instead of relying on a global variable, I updated helper functions to accept map as a parameter.

2. Only call after the style is ready
   The rain effect can only be applied once the map’s style has loaded. To handle this safely.

3. Avoid crossing execution contexts
   If running in a browser extension, I learned the background.js file does not share the same scope as the webpage. The fix was to either:
   Keep all map.setRain() calls in the page or content script, or
   Use message passing between background and content scripts to trigger rain updates.

Lessons Learned

Treat map as a local resource: don’t assume it’s globally available everywhere.

Always guard method calls (if (map && map.setRain)).

For extensions: background scripts can’t manipulate the DOM or page JS directly—use content scripts instead.

Copilot was also used to troubleshoot when the site was not storing the last saved search correctly in local storage. It pointed out that localStorage.setItem() was not being called in the right place, and made suggestions for how to correct this.

## Deployment

This site was deployed using Github Pages.

From the github repository, we navigated to the Pages area. Within this area, the "main" branch was chosen for deployment.

Github Pages then provides a link to the deployed site.

## Testing

### Validation

#### HTML

[W3 HTML Validator](https://validator.w3.org/)
<img width="1723" height="657" alt="HTML test score" src="https://github.com/user-attachments/assets/cbc07673-c480-45d9-ac79-33ed93f69af7" />

#### CSS

[W3 CSS Validator](https://validator.w3.org/)
<img width="1445" height="273" alt="CSS test score" src="https://github.com/user-attachments/assets/f7985287-1525-4ae7-8985-c20bb3a5479d" />

### Manual Testing

#### Responsivity & Browsers

Site on mobile/tablet/desktop: 1 card was displayed on mobile, 3 on tablet, 4 on desktop as expected. Buttons work on all. Map scales to fit.

Site viewed on Edge, Safari & Chrome: as expected.

#### Search Functions

Selected multiple locations: weather displayed correctly for each.

Pressed enter to search: search worked.

Clicked on dropdown entry: Entry was input into seach bar. No way to use keyboard to navigate/select dropdown entries (see future features)

Typed into search to trigger dropdown: dropdown was triggered but wasn't completely helpful until more letters are input e.g. typing "brist" does not bring up "Bristol, GB" but other cities worldwide (Brist HR, Brista HR). Bristol, GB was not seen until "bristol" was typed. However the dropdown is comprehensive and any city searched for was included.

Invalid location input: Error message ("we cannot fetch the weather") was displayed. Although this does provide some feedback, it would be better to handle invalid input separately to API issues (see future features).

Search with internet off/API not responding: Error message displayed as expected.

#### Default Location

Previously searched: Shows weather and map for previously searched location as expected.

Without local storage/no previous search: Displays weather and map for London as expected.

#### Buttons

Hourly & Daily buttons: Change the weather cards to the rest of the day, or rest of the week as expected. The first card displayed in the forecast is the same as today's weather, which may be confusing.

Use My Location & Reset buttons: Displays map and weather for your location as expected. Sometimes innaccurate (close to location but not exact) due to ISP and API.

#### Images and Background

Card images: change to match the weather descriptions as expected.

![Images match descriptions](documentation/card-images-daily.png)

Background colour: changes to match the weather conditions as expected.

![Background Rain](documentation/background-rain.png)

![Background Sun](documentation/background-sun.png)

#### Map

Map: Toggle heat map works, buttons to the side work as expected (zoom and tilt). Map navigates to the location you search for, or your location when you select choose my location.

### Accessibility

The site can be tabbed through in a logical order.

Keyboard navigation: Available for search and buttons. Not implemented in dropdown (see future features).

Screen Readers: Headings are in a logical order. Aria-labels present for input, scroll button, and cards. Buttons labelled clearly.

All colours pass the WCAG standards. There is just one colour combination that fails: the header with the rain background which has insufficient contrast.

![colour contrast fail](documentation/contrast-fail.png)

### Lighthouse

#### Performance

![lighthouse results](documentation/lighthouse-performance.png)

Most of the fall in the lighthouse performance scores can be attributed to the mapbox integration, which is quite resource-intensive.

## Credits

[Copilot](https://copilot.microsoft.com/) - used for image generation (see AI use section)

[Balsamiq](https://balsamiq.com/) - used to create wireframes.
