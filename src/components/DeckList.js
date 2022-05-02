import React, { useState } from "react";
import CardListDeckComponent from "./CardListDeckComponent";
import imageUrlBuilder from "@sanity/image-url";
import DynamicChart from "./Chart";
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
  Checkbox,
} from "@sanity/ui";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: `2022-01-10` });
const { dataset, projectId, useCdn } = client.clientConfig;
const builder = imageUrlBuilder({ projectId, dataset, useCdn });
function urlFor(source) {
  return builder.image(source);
}

export const DeckList = React.forwardRef((props, ref) => {
  const {
    traitsList,
    sphereList,
    deckList,
    setDeckList,
    cardList,
    value,
    onChange,
    sortFunction,
    replaceSpecialCharacters,
  } = props;
  //console.log(deckList)

  //const references = value.map(reference => reference._ref)

  const typeList = [
    ...new Set(deckList.map((card) => card.cardType._ref)),
  ].sort((a, b) => {
    if (a === "hero") {
      return -1;
    }
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });
  const newArr = [...deckList].map((card) => {
    return {
      ...card,
      quantity: value[value.map((obj) => obj._key).indexOf(card._id)].quantity,
    };
  });

  return (
    <Box>
      {typeList
        .filter((type) => type == "hero")
        .map((type) => {
          return (
            <Box marginBottom={3}>
              <Stack>
                <Box marginBottom={2} marginTop={3}>
                  <Text weight={"semibold"}>
                    {type.slice(0, 1).toUpperCase() + type.slice(1)} (
                    {newArr
                      .filter((card) => card.cardType._ref == type)
                      .map((card) => card.quantity)
                      .reduce(
                        (previousValue, currentValue) =>
                          previousValue + currentValue,
                        0
                      )}
                    ):
                  </Text>
                </Box>
                <Grid columns={4} gap={[2]}>
                  {deckList
                    .filter((card) => card.cardType._ref == type)
                    .sort(sortFunction)
                    .map((card) => {
                      return (
                        <Box>
                          <Card marginBottom={1}>
                            <img
                              src={urlFor(card.cardImage)
                                .width(200)
                                .height(200)
                                .fit("crop")
                                .crop("top")
                                .rect(120, 0, 270, 600)
                                .url()}
                              width="100%"
                            />
                          </Card>
                          <CardListDeckComponent
                            key={card._id}
                            traitsList={traitsList}
                            sphereList={sphereList}
                            card={card}
                            cardList={cardList}
                            setDeckList={setDeckList}
                            deckList={deckList}
                            onChange={onChange}
                            value={value}
                            quantity={
                              value[
                                value.map((obj) => obj._key).indexOf(card._id)
                              ].quantity
                            }
                          />
                        </Box>
                      );
                    })}
                </Grid>
              </Stack>
            </Box>
          );
        })}

      <Grid columns={2} gap={[2]}>
        {typeList
          .filter((type) => type != "hero")
          .map((type) => {
            return (
              <Box
                flex={2}
                rowStart={type == "ally" ? 1 : "default"}
                rowEnd={type == "ally" ? 3 : "default"}
              >
                <Stack>
                  <Box marginBottom={2} marginTop={3}>
                    <Text weight={"semibold"}>
                      {type.slice(0, 1).toUpperCase() + type.slice(1)} (
                      {newArr
                        .filter((card) => card.cardType._ref == type)
                        .map((card) => card.quantity)
                        .reduce(
                          (previousValue, currentValue) =>
                            previousValue + currentValue,
                          0
                        )}
                      ):
                    </Text>
                  </Box>
                  <Stack>
                  {deckList
                    .filter((card) => card.cardType._ref == type)
                    .sort(sortFunction)
                    .map((card) => {
                      return (
                        <Box>
                          <CardListDeckComponent
                            key={card._id}
                            traitsList={traitsList}
                            sphereList={sphereList}
                            card={card}
                            cardList={cardList}
                            setDeckList={setDeckList}
                            deckList={deckList}
                            onChange={onChange}
                            value={value}
                            quantity={
                              value[
                                value.map((obj) => obj._key).indexOf(card._id)
                              ].quantity
                            }
                          />
                        </Box>
                      );
                    })}
                    </Stack>
                </Stack>
              </Box>
            );
          })}
      </Grid>
      <DynamicChart deckList={deckList} value={value} />
    </Box>
  );
});

export default DeckList;
