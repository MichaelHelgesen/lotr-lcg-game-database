import React from "react";
import {
  Stack,
  Card,
  Text,
  Flex
} from "@sanity/ui";

export const DeckInformation = React.forwardRef((props, ref) => {
  const { deckInformation } = props;

  const flexEl = ((text, data) => {
    return (
      <Flex>
        <Text flex={1} weight={"semibold"}>
          {text}&nbsp;
        </Text>
        <Text flex={1}>
          {data}
        </Text>
      </Flex>
    )
  })

  return (
    <Card padding={[0]} marginBottom={4}>
      <Stack space={3}>
        {flexEl("Cards total:", deckInformation.totalCards)}
        {flexEl("Starting threat:", deckInformation.threat)}
        {flexEl("Packs:", deckInformation.packs)}
        {flexEl("Spheres:", deckInformation.spheres)}
      </Stack>
    </Card>
  );
});

export default DeckInformation;
