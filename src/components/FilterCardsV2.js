import React, { useState, useEffect } from "react";
import { FormField } from "@sanity/base/components";
import CardList from "./CardList";
import DeckList from "./DeckList";
import FilterBySpheres from "./FilterBySpheres";
import FilterByPack from "./FilterByPack";
import FilterByType from "./FilterByType";
import FilterByTrait from "./FilterByTrait";
import CardSearch from "./CardSearch";
import CardListSort from "./CardListSort";
import DeckInformation from "./DeckInformation";
import PatchEvent, { set } from "@sanity/form-builder/PatchEvent";
import sanityClient from "part:@sanity/base/client";
import DynamicChart from "./Chart";
const client = sanityClient.withConfig({ apiVersion: `2022-01-10` });
const { dataset, projectId, useCdn } = client.clientConfig;

// Import UI components from Sanity UI
import {
  Stack,
  Text,
  Button,
  Flex,
  Box,
  TabList,
  Tab,
  EditIcon,
  EyeClosedIcon,
  Card,
  Spinner,
  Inline,
  EyeOpenIcon,
  TabPanel,
} from "@sanity/ui";

export const FilterCardsV2 = React.forwardRef((props, ref) => {
  // VARIABLES //
  const {
    type,
    markers,
    value,
    presence,
    compareValue,
    onFocus,
    onBlur,
    onChange,
  } = props;

  // STATE HANDLING //
  const [cardList, setCardList] = useState([]);
  const [id, setId] = useState("hide");
  const [deckInformation, setDeckInformation] = useState({
    spheres: [],
    packs: [],
    threat: 0,
    totalCards: 0,
    types: [],
  });
  const [spheresInDeck, setSpheresInDeck] = useState([]);
  const [packsInDeck, setPacksInDeck] = useState([]);
  const [sphereList, setSphereList] = useState([]);
  const [packList, setPackList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [traitsList, setTraitsList] = useState([]);
  const [selectValue, setSelectValue] = useState();
  const [sortParameter, setSortParameter] = useState({
    param: "",
    state: true,
  });
  const [filterList, setFilterList] = useState({
    sphere: [],
    cardType: [],
    pack: [],
    traits: [],
  });

  /*   // Extracting the references of existing cards in the deck
    const cardReferencesInDeck = value
      ? value.map((refObj) => refObj.card._ref)
      : []; */

  // FUNCTIONS //
  // Get all cards and create a deck list
  /* useEffect(() => {
    client.fetch('*[_type == "card"]').then((cards) => {
      setCardList([...cards.filter((card) => !card._id.includes("draft"))]);
      // setDeckList([
        // ...cards.filter((card) => cardReferencesInDeck.indexOf(card._id) != -1),
      //]); 
    });
  }, []); */

  useEffect(() => {
    console.log("changing");
  }, [onChange]);

  // Create a deck list when value change
  /*  useEffect(() => {
    //const references = value.map(reference => reference._ref)
    setDeckList([...cardList.filter(card => cardReferencesInDeck.indexOf(card._id) != -1)]);
  }, [value]); */

  // Get all spheres
  useEffect(() => {
    client.fetch('*[_type == "sphere"]').then((spheres) => {
      setSphereList([...spheres.filter((card) => !card._id.includes("draft"))]);
    });
  }, []);
  // Get all packs
  useEffect(() => {
    client.fetch('*[_type == "pack"]').then((packs) => {
      setPackList([...packs.filter((card) => !card._id.includes("draft"))]);
      /* setDeckInformation(prevState => {
        return {
          packs: [...packs.filter(pack => [...new Set(value.map(obj => obj.cardObject.pack._ref))].indexOf(pack._id) !== -1).map((pack, index) => {
            return (<span key={index}>
              {index != 0 ? `, ${pack.name}` : `${pack.name}`}
            </span>
            )
          })]
        }
      }) */
    });
  }, []);

  // Get all types
  useEffect(() => {
    client.fetch('*[_type == "cardType"]').then((types) => {
      setTypeList([...types.filter((card) => !card._id.includes("draft"))]);
    });
  }, []);

  // Get all traits
  useEffect(() => {
    client.fetch('*[_type == "trait"]').then((traits) => {
      setTraitsList([...traits.filter((card) => !card._id.includes("draft"))]);
      /*            setFilterList(prevState => {
                           return {
                               ...prevState,
                               traits: traits.map(trait => trait._id).filter(id => !id.includes("draft"))
                           }
                       }) */
    });
  }, []);

  useEffect(() => {
    if (value && Object.keys(value).length !== 0) {
      setSpheresInDeck(
        [...new Set(value.deck.map((obj) => obj.cardObject.sphere._ref))].map(
          (obj, index) => {
            return (
              <span key={index}>{index != 0 ? `, ${obj}` : `${obj}`}</span>
            );
          }
        )
      );
      setPacksInDeck(
        [...new Set(value.deck.map((obj) => obj.cardObject.pack._ref))].map(
          (obj, index) => {
            return (
              <span key={index}>{index != 0 ? `, ${obj}` : `${obj}`}</span>
            );
          }
        )
      );

      /* setDeckInformation(prevState => {
       return {
         packs: [...packList.filter(pack => [...new Set(value.map(obj => obj.cardObject.pack._ref))].indexOf(pack._id) !== -1).map((pack, index) => {
           return (<span key={index}>
             {index != 0 ? `, ${pack.name}` : `${pack.name}`}
           </span>
           )
         })],
         spheres: [...new Set(value.map(obj => obj.cardObject.sphere._ref))].map((obj, index) => {
           return (<span key={index}>
             {index != 0 ? `, ${obj}` : `${obj}`}
           </span>
           )
         })
       }
     }) */

    }
  }, [value]);

  useEffect(() => {
      setDeckInformation((prevState) => {
        if (value && Object.keys(value).length !== 0) {
        return {
          ...prevState,
          threat: value.deck
            .filter((obj) => obj.cardObject.threat)
            .map((obj) => obj.cardObject.threat)
            .reduce(
              (previousValue, currentValue) => previousValue + currentValue,
              0
            ),
          totalCards: value.deck
            .map((obj) => obj.cardQuantity)
            .reduce(
              (previousValue, currentValue) => previousValue + currentValue,
              0
            ),
          spheres: [...new Set(value.deck.map((val) => val.cardObject.sphere._ref))],
          packs: [...new Set(value.deck.map((obj) => obj.cardObject.pack._ref))],
          types: [...new Set(value.deck.map((val) => val.cardObject.cardType._ref))],
        };
      } else {
        return {...prevState}
      };
      
    } )

  }, [value]);

console.log(deckInformation)
  // Replace special characters for sorting
  const replaceSpecialCharacters = (string) => {
    return string
      .replace(/[é]/g, "e")
      .replace(/[ó]/g, "o")
      .replace(/[í]/g, "i")
      .replace(/[^a-zA-Z0-9 ]/g, "");
  };
  // Sort array by name
  const sortFunction = (a, b) => {
    let navnA = replaceSpecialCharacters(a.name.toLowerCase());
    let navnB = replaceSpecialCharacters(b.name.toLowerCase());
    if (navnA < navnB) {
      return -1;
    }
    if (navnA > navnB) {
      return 1;
    }
    return 0;
  };
  // Delete all references and all cards in deck
  const clearReferences = React.useCallback((event) => {
    //setDeck([]);
    const inputValue = {};
    onChange(PatchEvent.from(set(inputValue)));
  }, []);

  return (
    <FormField
      title={type.title}
      onFocus={onFocus}
      onBlur={onBlur}
      description={type.description}
      __unstable_markers={markers}
      __unstable_presence={presence}
      compareValue={compareValue}
    >
      <Box>
        <Stack space={4}>
          {value && Object.keys(value).length !== 0 ? (
            <Box>
              <DeckInformation
                value={value ? value.deck : []}
                spheresInDeck={spheresInDeck}
                packsInDeck={packsInDeck}
                deckInformation={deckInformation}
                sphereList={sphereList}
                packList={packList}
              />
              <DeckList
                traitsList={traitsList}
                deckInformation={deckInformation}
                cardList={cardList}
                setCardList={setCardList}
                //spheresInDeck={spheresInDeck}
                value={value ? value.deck : []}
                onChange={onChange}
                sortFunction={sortFunction}
                replaceSpecialCharacters={replaceSpecialCharacters}
              />
            </Box>
          ) : null}
        </Stack>
        <Box marginY="5">
          {value && Object.keys(value).length === 0 &&
            <Text>
              Empty deck! Select cards from the cardpool below
            </Text>
          }
        </Box>
      </Box>
      <Box>
        <Card padding={0}>
          <TabList space={2}>
            <Tab
              aria-controls="hide-panel"
              icon={EditIcon}
              id="hide-tab"
              label="Close tabs"
              onClick={() => setId("hide")}
              selected={id === "hide"}
              space={2}
            />
            <Tab
              aria-controls="content-panel"
              icon={EditIcon}
              id="content-tab"
              label="Cardpool"
              onClick={() => {
                setId("content");
                cardList.length == 0 &&
                  client.fetch('*[_type == "card"]').then((cards) => {
                    setCardList([
                      ...cards.filter((card) => !card._id.includes("draft")),
                    ]);
                  });
              }}
              selected={id === "content"}
              space={2}
            />
            <Tab
              aria-controls="charts-panel"
              icon={id === "charts" ? EyeOpenIcon : EyeClosedIcon}
              id="charts-tab"
              label="Charts"
              onClick={() => setId("charts")}
              selected={id === "charts"}
              space={2}
            />
            <Tab
              aria-controls="delete-panel"
              icon={id === "delete" ? EyeOpenIcon : EyeClosedIcon}
              id="delete-tab"
              label="Empty deck"
              onClick={() => setId("delete")}
              selected={id === "delete"}
              space={2}
            />
          </TabList>
          <TabPanel
            aria-labelledby="hide-tab"
            hidden={id !== "hide"}
            id="hide-panel"
          >
            <Card border marginTop={2} padding={4} radius={2}>
              <Text muted={true}>
                Tabs closed. Choose one of the tabs above to load cardpool or charts.
              </Text>
            </Card>
          </TabPanel>

          <TabPanel
            aria-labelledby="content-tab"
            hidden={id !== "content"}
            id="content-panel"
          >
            <Card border marginTop={2} padding={4} radius={2}>
              {cardList.length == 0 ? (
                <Inline>
                  <Text>{`${"Loading..."}`}&nbsp;&nbsp;</Text>
                  <Spinner />
                </Inline>
              ) : (
                <Box>
                  <Flex>
                    <FilterByPack
                      filterList={filterList.pack}
                      setFilterList={setFilterList}
                      packList={packList}
                    />
                    {
                      <FilterByTrait
                        filterList={filterList.traits}
                        setFilterList={setFilterList}
                        traitsList={traitsList}
                      />
                    }
                  </Flex>
                  <Box>
                    <FilterByType
                      types={typeList}
                      setFilterList={setFilterList}
                      traitsList={traitsList}
                    />
                  </Box>
                  <Box>
                    <FilterBySpheres
                      spheres={sphereList}
                      setFilterList={setFilterList}
                      traitsList={traitsList}
                    />
                  </Box>
                  <Box>
                    <CardSearch
                      cardList={cardList}
                      setCardList={setCardList}
                      value={value && Object.keys(value).length !== 0 ? value.deck : []}
                      onChange={onChange}
                      deckInformation={deckInformation}
                      //deckList={deckList}
                      filterList={filterList}
                      packList={packList}
                      traitsList={traitsList}
                      sphereList={sphereList}
                      //setDeckList={setDeckList}
                      sortFunction={sortFunction}
                      replaceSpecialCharacters={replaceSpecialCharacters}
                      selectValue={selectValue}
                      setSelectValue={setSelectValue}
                    />
                  </Box>
                  <CardListSort
                    cardList={cardList}
                    value={value && Object.keys(value).length !== 0 ? value.deck : []}
                    setCardList={setCardList}
                    sortParameter={sortParameter}
                    setSortParameter={setSortParameter}
                    replaceSpecialCharacters={replaceSpecialCharacters}
                  />
                  <CardList
                    cardList={cardList}
                    setCardList={setCardList}
                    traitsList={traitsList}
                    deckInformation={deckInformation}
                    sphereList={sphereList}
                    //deckList={deckList}
                    //setDeckList={setDeckList}
                    value={value && Object.keys(value).length !== 0 ? value.deck : []}
                    onChange={onChange}
                    filterList={filterList}
                    sortFunction={sortFunction}
                    replaceSpecialCharacters={replaceSpecialCharacters}
                  />
                </Box>
              )}
            </Card>
          </TabPanel>
          <TabPanel
            aria-labelledby="charts-tab"
            hidden={id !== "charts"}
            id="charts-panel"
          >
            <Card border marginTop={2} padding={4}>
              {value && Object.keys(value).length !== 0 ? <DynamicChart value={value.deck} deckInformation={deckInformation} /> : <Text>No cards in deck</Text>}
            </Card>
          </TabPanel>
          <TabPanel
            aria-labelledby="delete-tab"
            hidden={id !== "delete"}
            id="delete-panel"
          >
            <Card border marginTop={2} padding={4}>
              <Card>
                <Text>Click the button below to empty the deck.</Text>
              </Card>
              <Card marginTop={3}>
                <Button tone="caution" onClick={clearReferences}>
                  Remove all cards
                </Button>
              </Card>
            </Card>
          </TabPanel>

        </Card>
      </Box>
    </FormField>
  );
});

export default FilterCardsV2;
