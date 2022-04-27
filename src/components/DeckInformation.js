import React, { useState } from "react";
import CardListComponent from "./CardListComponent";
import {
  TextInput,
  Stack,
  Label,
  Grid,
  Card,
  Text,
  Button,
  Inline,
  Flex,
  Box,
  Dialog,
  Checkbox,
  Autocomplete,
  SearchIcon,
} from "@sanity/ui";

export const DeckInformation = React.forwardRef((props, ref) => {
  const { deckList, value, packList, sphereList } = props;

  //!!! Flytte dette til FilterCards?
  const calculatedThreat = deckList
    .filter((card) => card.cardType._ref === "hero")
    .map((card) => card.threat)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  const packsInDeck = [...new Set(deckList.map((card) => card.pack._ref))];
  const spheresInDeck = [...new Set(deckList.map((card) => card.sphere._ref))];
  //!!!

  return (
    <Card padding={[0]} marginBottom={4}>
      <Stack space={3}>
        <Flex>
          <Text flex={1} weight={"semibold"}>
            Cards total:&nbsp;
          </Text>
          <Text flex={1}>
            {value
              ? value
                  .map((obj) => obj.quantity)
                  .reduce(
                    (previousValue, currentValue) =>
                      previousValue + currentValue,
                    0
                  )
              : 0}
          </Text>
        </Flex>
        <Flex>
          <Text flex={1} weight={"semibold"}>
            Starting threat:&nbsp;
          </Text>{" "}
          <Text flex={1}>{calculatedThreat}</Text>
        </Flex>

        <Flex>
          <Text weight={"semibold"} flex={1}>
            Packs:&nbsp;
          </Text>
          <Text flex={1}>
            {packList
              .filter((pack) => packsInDeck.indexOf(pack._id) != -1)
              .map((pack, index) => (
                <span key={pack._id}>
                  {index != 0 ? `, ${pack.name}` : `${pack.name}`}
                </span>
              ))}
          </Text>
        </Flex>

        <Flex>
          <Text flex={1} weight={"semibold"}>
            Spheres:&nbsp;
          </Text>
          <Text flex={1}>
            {sphereList
              .filter((sphere) => spheresInDeck.indexOf(sphere._id) != -1)
              .map((sphere, index) => (
                <span key={sphere._id}>
                  {index != 0 ? `, ${sphere.name}` : `${sphere.name}`}
                </span>
              ))}
          </Text>
        </Flex>
      </Stack>
    </Card>
  );
});

export default DeckInformation;
