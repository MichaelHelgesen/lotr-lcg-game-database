import React, { useState } from "react";
import imageUrlBuilder from "@sanity/image-url";
import { Stack, Card, Text, Flex, Tooltip, Container } from "@sanity/ui";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: `2022-01-10` });
const { dataset, projectId, useCdn } = client.clientConfig;
const builder = imageUrlBuilder({ projectId, dataset, useCdn });
function urlFor(source) {
  return builder.image(source);
}

export const CardTooltip = React.forwardRef((props, ref) => {
  const { card, setOpen, traitsList, quantity } = props;
  /* const onClose = React.useCallback(() => {
    setOpen(false);
  }, []); */

  const onOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <Tooltip
      content={
        <Container padding={2} width="0">
          <Text muted size={1}>
            <Flex padding="4">
              <Card flex="1">
                <img
                  src={urlFor(card.cardImage)
                    .width(100)
                    .height(100)
                    .fit("crop")
                    .crop("top")
                    .rect(120, 0, 270, 600)
                    .url()}
                />
              </Card>

              <Card flex="2" marginLeft={[2, 2, 3, 5]}>
                <Stack padding={0} space={2}>
                  <Text
                    size={[2]}
                    weight={"bold"}
                    style={{
                      color:
                        card.sphere._ref == "lore"
                          ? "green"
                          : card.sphere._ref == "tactics"
                          ? "red"
                          : card.sphere._ref == "neutral"
                          ? "gray"
                          : card.sphere._ref == "spirit"
                          ? "blue"
                          : "purple",
                    }}
                  >
                    {card.name}
                  </Text>
                  <Text size={[1]}>
                    {`
                      ${
                        card.sphere._ref.slice(0, 1).toUpperCase() +
                        card.sphere._ref.slice(1)
                      }, ${
                      card.cardType._ref.slice(0, 1).toUpperCase() +
                      card.cardType._ref.slice(1)
                    }
                        `}
                  </Text>
                  <Flex>
                    <Text size={[1]} weight={"bold"}>
                      {card.cost
                        ? card.willpower == undefined
                          ? `C:${card.cost}`
                          : `C:${card.cost}, `
                        : `T:${card.threat}, `}
                      {card.willpower != undefined
                        ? `W:${card.willpower}, `
                        : null}
                      {card.attack != undefined ? `A:${card.attack}, ` : null}
                      {card.defense != undefined ? `D:${card.defense}, ` : null}
                      {card.health != undefined ? `H:${card.health}` : null}
                    </Text>
                  </Flex>
                  {card.traits && card.traits.length ? (
                    <Text size={1}>
                      {traitsList
                        .filter((trait) => {
                          return (
                            card.traits
                              .map((traitObj) => traitObj._ref)
                              .indexOf(trait._id) != -1
                          );
                        })
                        .map((currentTrait, index) => {
                          return index != 0 ? (
                            <span>{`, ${currentTrait.name}`}</span>
                          ) : (
                            <span>{currentTrait.name}</span>
                          );
                        })}
                    </Text>
                  ) : null}
                  <div
                    dangerouslySetInnerHTML={{ __html: card.cardText }}
                  ></div>
                </Stack>
              </Card>
            </Flex>
          </Text>
        </Container>
      }
      fallbackPlacements={["right", "top", "bottom"]}
      placement="left"
      portal
    >
      <span onClick={onOpen} size={2} weight={"medium"}>
        {quantity ? (
          <span>
            <span
              style={{
                color:
                  card.sphere._ref == "lore"
                    ? "#51b848"
                    : card.sphere._ref == "tactics"
                    ? "#c00106"
                    : card.sphere._ref == "neutral"
                    ? "#616161"
                    : card.sphere._ref == "spirit"
                    ? "#2980b9"
                    : "#ad62a5",
              }}
            >{`${card.cardType._ref != "hero" ? `${quantity}x` : ""} ${
              card.name
            }`}</span>
            <span style={{color: "#6D7683", fontSize:".8rem"}}>&nbsp;({card.pack._ref})</span>
          </span>
        ) : (
          <span>
            <span
              style={{
                color:
                  card.sphere._ref == "lore"
                    ? "#51b848"
                    : card.sphere._ref == "tactics"
                    ? "#c00106"
                    : card.sphere._ref == "neutral"
                    ? "#616161"
                    : card.sphere._ref == "spirit"
                    ? "#2980b9"
                    : "#ad62a5",
              }}
            >
              {card.name}
            </span>
            <span style={{color: "#6D7683", fontSize:".8rem"}}>&nbsp;({card.pack._ref})</span>
          </span>
        )}
      </span>
    </Tooltip>
  );
});

export default CardTooltip;
