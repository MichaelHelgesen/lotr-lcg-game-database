# Lord Of The Rings Living Card Game database

I´m trying to create a custom version of [Sanitys](https://www.sanity.io) headless CMS to keep track of different aspects regarding the card game [Lord Of The Rings The Living Card Game](https://www.fantasyflightgames.com/en/products/the-lord-of-the-rings-the-card-game/) by [Fantasy Flight](https://www.fantasyflightgames.com/en/index/).

## Desired features
- [x] Import player cards, spheres, card types, traits, scenarios and encounters from sets / packs. This way one can expand Sanity Studio with new data when buying new cards. The source is [RingsDBs API](https://ringsdb.com/api/)
  - [ ] Choose what to import direct from Sanity Studio, and select if one wants to overwrite or update the chosen data
- [x] Create relevant references between documents on import
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
  - [x] Custom component for filtering cards to add to the deck
    - [ ] Add filters
      - [x] Filters generated by currently imported cardpool?
      - [x] Filter by spheres
      - [x] Filter by traits
        - [ ] Disable if not avaliable with current sorting?
      - [x] Text search
        - [x] Click to add to deck
        - [ ] Click for popup and then add to deck?
      - [x] Filter by packs
        - [x] Checkboxes for filter by multiple packs?
      - [ ] Filter by stats?
    - [ ] Change order of list (ascending / descending) based on stats
    - [ ] Card presentation
      - [ ] See image and stats on hover?
      - [x] See image and stats on click?
      - [ ] Button for "go to card"?
      - [x] See quantity of each card in cardpool
      - [x] Function for how many of each card to add: up to three if standard, and one if unique
      - [x] Ability to delete or change quantity of current card in deck on card in cardpool
      - [x] Ability to delete or change quantity of current card in deck on card in deck
- [x] Add game journal entries after playing a game
  - [x] Journal may refer to "deck" and "scenario"
- [x] Add rules questions and answers
  - [x]  May refer to all other document types
- [ ] Present the journal and other data on a web page

## Experience Sanity
It´s a personal project that I hope will allow me to get a deep understanding of how Sanity works, and experience all it has to offer.

- [x] Sanity custom inputs
- [ ] Sanity exec command
- [x] Sanity UI
- [x] Sanity javascript client (import, delete, patch)
- [ ] Sanity API
- [ ] Sanity helper functions
- [x] Sanity schema types
- [ ] Sanity docs
- [x] Import data from external source

## Experience React
Since Sanity is built with React I´m repeating a lot and learning more about this language.

- [x] React.useEffect
- [x] React.forwardRef
- [x] React.useCallback

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

![Custom component for adding cards to a deck](https://res.cloudinary.com/mikkesblogg/image/upload/v1649576842/Samples/Skjermbilde_2022-04-10_kl._09.45.27_p7ll0v.png)
An early version of a custom component for adding quantity of cards, and remove all cards if needed.

![Updated version of the deckbuilder, with several filter options](https://res.cloudinary.com/mikkesblogg/image/upload/v1649854279/Samples/Skjermbilde_2022-04-13_kl._14.46.23_eecjke.png)
Updated version of the deckbuilder, with several filter options.

![Added the ability to define packs to filter by](https://res.cloudinary.com/mikkesblogg/image/upload/v1649854279/Samples/Skjermbilde_2022-04-13_kl._14.46.55_hk5nbq.png)
Added the ability to define packs to filter by.

![Added the ability to define traits to filter by](https://res.cloudinary.com/mikkesblogg/image/upload/v1650184579/Samples/Skjermbilde_2022-04-17_kl._10.33.57_xv4hzn.png)
Added the ability to define traits to filter by.

![Added a text field for searching all cards regardless of active filters](https://res.cloudinary.com/mikkesblogg/image/upload/v1650184579/Samples/Skjermbilde_2022-04-17_kl._10.33.45_mkyol5.png)
Updated the text field. It's now possible to add and remove cards directly from the search results.

