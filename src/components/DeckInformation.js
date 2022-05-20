import React from "react";
import { Stack, Card, Text, Flex } from "@sanity/ui";

export const DeckInformation = React.forwardRef((props, ref) => {
  const { deckInformation, sphereList, packList } = props;

  const flexEl = (text, data) => {
    return (
      <Flex>
        <Text flex={1} weight={"semibold"}>
          {text}&nbsp;
        </Text>
        <Text flex={1}>{data}</Text>
      </Flex>
    );
  };
  return (
    <Card padding={[0]} marginBottom={4}>
      <Stack space={3}>
        {flexEl("Cards total:", deckInformation.totalCards)}
        {flexEl("Starting threat:", deckInformation.threat)}
        {
          <Flex>
            <Text flex={1} weight={"semibold"}>
              {"Packs:"}&nbsp;
            </Text>
            <Text flex={1}>
            {packList
            .filter(pack => deckInformation.packs.indexOf(pack._id) !== -1)
            .map((pack, index) => {
              return (
                <span>
                {index != 0 ? `, ${pack.name}` : `${pack.name}`}
                </span>
              )
            })}
            </Text>
          </Flex>
        }
        {
          <Flex>
            <Text flex={1} weight={"semibold"}>
              {"Spheres:"}&nbsp;
            </Text>
            <Text flex={1}>
            {sphereList
            .filter(sphere => deckInformation.spheres.indexOf(sphere._id) !== -1)
            .map((sphere, index) => {
              return (
                <span>
                {index != 0 ? `, ${sphere.name}` : `${sphere.name}`}
                </span>
              )
            })}
            </Text>
          </Flex>
        }
      </Stack>
    </Card>
  );
});

export default DeckInformation;

//{flexEl("Spheres:", deckInformation.spheres)}
