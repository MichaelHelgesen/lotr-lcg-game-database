import React, { useState } from "react";
import CardListDeckComponent from "./CardListDeckComponent";
import imageUrlBuilder from "@sanity/image-url";
import DynamicChart from "./Chart";
import {
  Stack,
  Grid,
  Card,
  Text,
  Box,
  TabList,
  Tab,
  EditIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  TabPanel,
  Heading,
} from "@sanity/ui";
import sanityClient from "part:@sanity/base/client";

const client = sanityClient.withConfig({ apiVersion: `2022-01-10` });
const { dataset, projectId, useCdn } = client.clientConfig;
const builder = imageUrlBuilder({ projectId, dataset, useCdn });
function urlFor(source) {
  return builder.image(source);
}

export const DeckList = React.forwardRef((props, ref) => {
  const [id, setId] = useState("hide");

  const {
    traitsList,
    sphereList,
    cardList,
    value,
    onChange,
    deckInformation,
    sortFunction,
  } = props;

  const typeList = deckInformation.types.sort((a, b) => {
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
                    {value
                      .filter((obj) => obj.cardObject.cardType._ref == type)
                      .map((obj) => obj.cardQuantity)
                      .reduce(
                        (previousValue, currentValue) =>
                          previousValue + currentValue,
                        0
                      )}
                    ):
                  </Text>
                </Box>
                <Grid columns={4} gap={[2]}>
                  {value
                    .filter((obj) => obj.cardObject.cardType._ref == type)
                    .map((obj) => obj.cardObject)
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
                            onChange={onChange}
                            value={value}
                            cardquantity={
                              value[
                                value.map((obj) => obj._key).indexOf(card._id)
                              ].cardquantity
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
                      {value
                        .filter((obj) => obj.cardObject.cardType._ref == type)
                        .map((obj) => obj.cardQuantity)
                        .reduce(
                          (previousValue, currentValue) =>
                            previousValue + currentValue,
                          0
                        )}
                      ):
                    </Text>
                  </Box>
                  <Stack>
                    {value
                      .filter((obj) => obj.cardObject.cardType._ref == type)
                      .map((obj) => obj.cardObject)
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
                              onChange={onChange}
                              value={value}
                              quantity={
                                value[
                                  value.map((obj) => obj._key).indexOf(card._id)
                                ].cardQuantity
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
      <Box>
        <Card padding={0}>
          <TabList space={2}>
          <Tab
              aria-controls="content-panel"
              icon={EditIcon}
              id="hide-tab"
              label="Close tabs"
              onClick={() => setId("content")}
              selected={id === "hide"}
              space={2}
            />
            <Tab
              aria-controls="content-panel"
              icon={EditIcon}
              id="content-tab"
              label="Cardpool"
              onClick={() => setId("content")}
              selected={id === "content"}
              space={2}
            />
            <Tab
              aria-controls="preview-panel"
              icon={id === "preview" ? EyeOpenIcon : EyeClosedIcon}
              id="preview-tab"
              label="Charts"
              onClick={() => setId("preview")}
              selected={id === "preview"}
              space={2}
            />
          </TabList>
          <TabPanel
            aria-labelledby="hide-tab"
            hidden={id !== "hide"}
            id="hide-panel"
          >
            <Card border marginTop={2} padding={4} radius={2}>
              <Heading>Hide</Heading>
            </Card>
          </TabPanel>
          <TabPanel
            aria-labelledby="content-tab"
            hidden={id !== "content"}
            id="content-panel"
          >
            <Card border marginTop={2} padding={4} radius={2}>
              <Heading>Content</Heading>
            </Card>
          </TabPanel>
          <TabPanel
            aria-labelledby="preview-tab"
            hidden={id !== "preview"}
            id="preview-panel"
          >
            <Card border marginTop={2} padding={4}>
              <DynamicChart value={value} deckInformation={deckInformation} />
            </Card>
          </TabPanel>
        </Card>
      </Box>
    </Box>
  );
});

export default DeckList;
