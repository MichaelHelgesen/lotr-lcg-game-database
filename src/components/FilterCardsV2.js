import React, { useState, useEffect, useCallback } from "react";
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
import PatchEvent, {
  set,
  unset,
  prepend,
  insert,
  setIfMissing,
} from "@sanity/form-builder/PatchEvent";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: `2022-01-10` });
const { dataset, projectId, useCdn } = client.clientConfig;

// Import UI components from Sanity UI
import {
  TextInput,
  Stack,
  Label,
  Grid,
  Card,
  Text,
  Button,
  Flex,
  Box,
  Dialog,
  Avatar,
  Autocomplete,
  SearchIcon,
} from "@sanity/ui";

export const FilterCardsV2 = React.forwardRef((props, ref) => {
  // VARIABLES //
  const {
    type,
    value,
    markers,
    presence,
    compareValue,
    onFocus,
    onBlur,
    onChange,
  } = props;

  // STATE HANDLING //
  const [cardList, setCardList] = useState([]);
  const [deckList, setDeckList] = useState([]);
  const [sphereList, setSphereList] = useState([]);
  const [packList, setPackList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [traitsList, setTraitsList] = useState([]);
  const [selectValue, setSelectValue] = useState();
  const [sortParameter, setSortParameter] = useState({
    param: "",
    state: true
  });
  const [filterList, setFilterList] = useState({
    sphere: [],
    cardType: [],
    pack: [],
    traits: [],
  });

  // FUNCTIONS //
  // Get all cards and create a deck list
  useEffect(() => {
    client.fetch('*[_type == "card"]').then((cards) => {
      setCardList([...cards.filter((card) => !card._id.includes("draft"))]);
      const references = value.map(reference => reference._ref)
      setDeckList([...cards.filter(card => references.indexOf(card._id) != -1)]);
    });
  }, []);
  // Create a deck list when value change
  useEffect(() => {
    const references = value.map(reference => reference._ref)
    setDeckList([...cardList.filter(card => references.indexOf(card._id) != -1)]);
  }, [value]);
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
      /* setFilterList(prevState => {
                return {
                    ...prevState,
                    pack: packs.map(pack => pack._id).filter(id => !id.includes("draft"))
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
  const clearReferences = React.useCallback(
    (event) => {
      //setDeck([]);
      const inputValue = [];
      onChange(PatchEvent.from(set(inputValue)));
    },
    [onChange]
  );

  return (
    <FormField title={type.title}>
      <Flex>
        <Box flex="1">
          <Stack space={4}>
          <DeckInformation deckList={deckList} value={value}/>
          {value ? (
            <DeckList
              deckList={deckList}
              value={value ? value : []}
              onChange={onChange}
              sortFunction={sortFunction}
              replaceSpecialCharacters={replaceSpecialCharacters}
            />
          ) : null}
          </Stack>
          <Box marginY="3">
            {value && value.length ? (
              <Button tone="caution" onClick={clearReferences}>
                Remove all cards
              </Button>
            ) : (
              <Text>
                Empty deck! Select cards from the cardpool on the right -{`>`}
              </Text>
            )}
          </Box>
        </Box>
        <Box flex="2" marginLeft={[2, 2, 3, 3]}>
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
              value={value ? value : []}
              onChange={onChange}
              filterList={filterList}
              sortFunction={sortFunction}
              replaceSpecialCharacters={replaceSpecialCharacters}
              selectValue={selectValue}
              setSelectValue={setSelectValue}
            />
          </Box>
          <CardListSort
            cardList={cardList}
            value={value ? value : []}
            setCardList={setCardList}
            sortParameter={sortParameter}
            setSortParameter={setSortParameter}
          />
          <CardList
            cardList={cardList}
            value={value ? value : []}
            onChange={onChange}
            filterList={filterList}
            sortFunction={sortFunction}
            replaceSpecialCharacters={replaceSpecialCharacters}
          />
        </Box>
      </Flex>
    </FormField>
  );
});

export default FilterCardsV2;
