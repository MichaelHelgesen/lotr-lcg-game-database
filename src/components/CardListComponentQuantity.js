import React, { useState } from "react";
import QuantityNumber from "./QuantityNumber";
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

export const CardListComponentQuantity = React.forwardRef((props, ref) => {
  const {
    deckLimit,
    card,
    cardList,
    setDeckList,
    deckList,
    deckInformation,
    value,
    cardId,
    onChange,
    size,
    closeDialog,
  } = props;
  //console.log("cardList", cardList)
  //console.log("deckList", deckList)
  //console.log(card)

  let countArray = [];
  for (let i = 0; i < deckLimit + 1; i++) {
    countArray.push(i);
  }
  return (
    <Box>
      <QuantityNumber
        card={card}
        cardList={cardList}
        deckList={deckList}
        setDeckList={setDeckList}
        size={size}
        deckLimit={countArray}
        value={value}
        deckInformation={deckInformation}
        cardId={cardId}
        onChange={onChange}
        onClose={closeDialog}
      />
    </Box>
  );
});

export default CardListComponentQuantity;
