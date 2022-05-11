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
    - [x] Add filters
      - [x] Filters generated by currently imported cardpool?
      - [x] Filter by spheres
      - [x] Filter by traits
        ~~- [ ] Disable if not avaliable with current sorting?~~
      - [x] Text search
        - [x] Click to add to deck
        - [x] Click for card dialog
          - [x] Quantity for adding to and removing from deck
          - [x] Display current quantity if already in deck
          - [x] Close dialog on selecting new quantity
      - [x] Filter by packs
        - [x] Checkboxes for filter by multiple packs?
      ~~- [ ] Filter by stats?~~
    - [x] Change order of list (ascending / descending) based on stats
    - [ ] Card / deck presentation (UX / UI)
      - [ ] Put charts and cardpool in tabs for faster initial loading and less clutter?
        - [ ] Load cardpool when selecting cardpool tab? 
      - [x] See heros as preview images?
      - [x] Show charts
        - [x] Card cost
        - [x] Spheres
        - [x] Total cost by sphere
        - [x] Card types
       ~~ [ ] Stats?~~
      - [ ] Warning if deck contains two cards with the same name
      - [x] Color on name corresponding to it´s sphere?
      - [ ] Set sphere reference automaticly based on cards in deck?
      - [x] See image and stats on hover?
      - [x] See image and stats on click in dialog?
        - [x] Quantity for adding to and removing from deck
        - [x] Display current quantity if already in deck
        - [x] Close dialog on selecting new quantity
      - [ ] Button for "go to card"?
      - [x] See quantity of each card in cardpool
      - [x] Function for how many of each card to add: up to three if standard, and one if unique
      - [x] Ability to delete or change quantity of current card in deck on card in cardpool
      - [x] Ability to delete or change quantity of current card in deck on card in deck
      - [x] Grouping and sorting of deck
        - [x] Titles for each card type in deck
        - [x] Sorting of the groups 
        - [x] Numbers of cards in deck
        - [x] Spheres in deck.
        - [x] Packs in the deck
        - [x] Total starting threat of deck
      - [ ] Make it pretty and intuitive 
- [x] Add game journal entries after playing a game
  - [x] Journal may refer to "deck" and "scenario"
- [x] Add rules questions and answers
  - [x]  May refer to all other document types
- [ ] Present the journal and other data on a web page

## Experience Sanity
It´s a personal project that I hope will allow me to get a deep understanding of how Sanity works, and experience all it has to offer.

- [x] Sanity custom inputs
- [x] Sanity exec command
- [x] Sanity UI
- [x] Sanity javascript client (import, delete, patch)
- [x] Sanity API
- [x] Sanity helper functions (there is not much documentation about this I think)
- [x] Sanity schema types
- [x] Sanity docs
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

![Added a text field for searching all cards regardless of active filters](https://res.cloudinary.com/mikkesblogg/image/upload/v1650613396/Samples/Skjermbilde_2022-04-22_kl._09.42.11_iyjesm.png)
Updated the text field. Seach for all cards regardless of filters, and click to open a dialog

![When clicking a card it opens a dialog](https://res.cloudinary.com/mikkesblogg/image/upload/v1650613396/Samples/Skjermbilde_2022-04-22_kl._09.40.58_yspihy.png)
When clicking the name of a card in any of the lists, it opens a dialog with the ability to add and remove cards. When changing the quantity, the dialog registers the change, and closes automaticly.

![Preview of card on hover](https://res.cloudinary.com/mikkesblogg/image/upload/v1650613396/Samples/Skjermbilde_2022-04-22_kl._09.40.37_xdrxan.png)
I also added a preview of the cards when hovering the name in the card pool or the deck list.

![Sorting of the card pool](https://res.cloudinary.com/mikkesblogg/image/upload/v1650613396/Samples/Skjermbilde_2022-04-22_kl._09.41.45_z4kop7.png)
I added the possibility to sort the card pool based on quantity, name, sphere, type, cost/threat, willpower, attack, defence and health in a descending or ascending order.

![Grouping of types in deck and other info](https://res.cloudinary.com/mikkesblogg/image/upload/v1650624218/Samples/Skjermbilde_2022-04-22_kl._12.43.32_hgu9kz.png)
The deck is now grouped in types, and other useful information about the deck is displayed on the top.

![Deck info](https://res.cloudinary.com/mikkesblogg/image/upload/v1651486373/Samples/Skjermbilde_2022-05-02_kl._12.10.50_ubv8ew.png)
Changed the design of the deck information. Added pictures of heroes.

![Charts](https://res.cloudinary.com/mikkesblogg/image/upload/v1651486373/Samples/Skjermbilde_2022-05-02_kl._12.11.18_voxyxh.png)
Added charts to get a better visual presentation of the current deck.