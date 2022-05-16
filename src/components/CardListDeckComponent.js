import React, { useState } from "react";
import imageUrlBuilder from "@sanity/image-url";
import CardDialog from "./CardDialog";
import CardTooltip from "./CardTooltip";
import {
  Card,
  Box,
} from "@sanity/ui";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: `2022-01-10` });
const { dataset, projectId, useCdn } = client.clientConfig;
const builder = imageUrlBuilder({ projectId, dataset, useCdn });
function urlFor(source) {
  return builder.image(source);
}

export const CardListDeckComponent = React.forwardRef((props, ref) => {
  const {
    card,
    cardList,
    quantity,
    traitsList,
    value,
    onChange,
    deckInformation,
    size,
    sphereList,
  } = props;

  const [open, setOpen] = useState(false);
  const onClose = React.useCallback(() => {
    setOpen(false);
  }, []);

/*   const onOpen = React.useCallback(() => {
    setOpen(true);
  }, []); */

  return (
    <Card padding={0}>
      <Box>
        <CardTooltip
          card={card}
          quantity={quantity}
          setOpen={setOpen}
          size={size}
          traitsList={traitsList}
        />
      </Box>
      <CardDialog
        traitsList={traitsList}
        //sphereList={sphereList}
        cardList={cardList}
        card={card}
        onClose={onClose}
        deckInformation={deckInformation}
        open={open}
        size={size}
        value={value}
        onChange={onChange}
        //setOpen={setOpen}
      />
    </Card>
  );
});

export default CardListDeckComponent;
