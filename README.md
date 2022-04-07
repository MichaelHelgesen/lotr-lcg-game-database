# Lord Of The Rings Living Card Game database

I´m trying to create a custom version of [Sanitys](https://www.sanity.io) headless CMS to keep track of different aspects regarding the card game [Lord Of The Rings The Living Card Game](https://www.fantasyflightgames.com/en/products/the-lord-of-the-rings-the-card-game/) by [Fantasy Flight](https://www.fantasyflightgames.com/en/index/).

## Desired features
- [x] Import player cards, spheres, card types, traits, scenarios and encounters from sets / packs. This way one can expand Sanity Studio with new data when buying new cards. The source is [RingsDBs API](https://ringsdb.com/api/)
  - [ ] Choose what to import direct from Sanity Studio, and select if one wants to overwrite or update the chosen data
- [ ] Create relevant references between documents on import
  - [x] Card -> "card type", "sphere" and "pack"
  - [ ] Packs -> "scenarios"?
  - [x] Scenarios -> "pack" and "encounter"
  - [x] Encounter -> "scenario" 
- [x] Custom card image component with lightbox function to be able to view a full screen version of a card
- [x] Rating component to be able to rate cards
- [x] Custom view in Sanity Studio
- [ ] Custom icons in Sanity Studio
- [x] Comment fields on most documents for writing down experiences and thoughts
- [x] Create decks out of cards imported to Sanity Studio
  - [x] Decks may refer to "scenario", "spheres", and "cards"
  - [ ] Custom component for filtering cards to add to the deck
    - [ ] Filter by spheres
    - [ ] Filter by traits
    - [ ] Filter by packs
    - [ ] Filter by stats?
    - [ ] Change order of list (ascending / descending etc.)
- [x] Add game journal entries after playing a game
  - [x] Journal may refer to "deck" and "scenario"
- [x] Add rules questions and answers
  - [x]  May refer to all other document types
- [ ] Present the journal and other data on a web page

## Experience
It´s a personal project that I hope will allow me to get a deep understanding of how Sanity works, and experience all it has to offer.

- [ ] Sanity custom inputs
- [ ] Sanity exec command
- [x] Sanity UI
- [x] Sanity javascript client (import, delete, patch)
- [ ] Sanity API
- [ ] Sanity helper functions
- [x] Sanity schema types
- [ ] Sanity docs
- [x] Import data from external source

## Technology
- HTML
- CSS
- React
- Javascript

## Screenshots
![Sanity Studio with custom components](https://res.cloudinary.com/mikkesblogg/image/upload/v1649187927/Samples/Skjermbilde_2022-04-05_kl._21.42.17_zgngfh.png)
Sanity Studio with custom components

![Sanity Studio with lightbox effect](https://res.cloudinary.com/mikkesblogg/image/upload/v1649188200/Samples/Skjermbilde_2022-04-05_kl._21.48.19_ewc4jg.png)
Sanity Studio with lightbox effect