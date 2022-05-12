import React from "react";
import {
  Text,
  Button,
  Flex,
  Box,
} from "@sanity/ui";
import PatchEvent, {
  unset,
  insert,
  set,
  setIfMissing,
} from "@sanity/form-builder/PatchEvent";

export const QuantityNumber = React.forwardRef((props, ref) => {
  const {
    deckLimit,
    cardList,
    //deckList,
    card,
    //setDeckList,
    value,
    cardId,
    onChange,
    size,
    onClose,
  } = props;

  const currentCardInDeck = value.length
    ? value.filter((obj) => obj.cardReference._ref == cardId)
    : [];
  const handleClick = (number) => {
    // If  higher number
    if (number != 0) {
      /* if (value.map(obj => obj.cardReference._ref).indexOf(card._id) != -1) {
        const action = insert(
          [
            {
              _key: cardId,
              cardReference: { _ref: cardId, _type: "reference" },
              cardQuantity: number,
              cardObject: {...card}
            },
          ],
          "replace",
          [value.map((ref) => ref._key).indexOf(cardId)]
        );
        onChange(PatchEvent.from(action));
        //setDeckList(prevState => prevState.filter(obj => obj != card))
      } else { */
        const action = set(
          {
            _key: 2,
            //_type: "object"
            deck: [
              ...value.filter(obj => obj.cardReference._ref != cardId),
              {
              _key: cardId,
              cardReference: { _ref: cardId, _type: "reference" },
              cardQuantity: number,
              cardObject: {...card}
            }],
            sphere: [...new Set(value.map((obj) => obj.cardObject.sphere._ref).filter(obj => obj != card.sphere._ref)
              ), card.sphere._ref]
            .map((obj, index) => { 
              return { _key: index, _ref: obj, _type: "reference" }
            })
          }
         
        );
        onChange(PatchEvent.from(action));
        //setDeckList((prevState) => [...prevState, card]);
      /* } */
    }
    onClose ? onClose() : null;
    // If lower number and not zero
    /* if (number < value && number != 0) {
            let i = value
            do {
                i--
                const action = unset(
                    [{ _key: `${cardId}-${i + 1}` }]
                );
                onChange(PatchEvent.from(action));
            } while (i > number);
            onClose ? onClose() : null
        } */
    // If zero (delete)
    if (number === 0) {
      const action = set(
        {
          _key: 2,
          //_type: "object"
          deck: [
            ...value.filter(obj => obj.cardObject._id != cardId),
            ],
            sphere: [...new Set(value.map((obj) => obj.cardObject.sphere._ref).filter(obj => obj != card.sphere._ref)
              )]
            .map((obj, index) => { 
              return { _key: index, _ref: obj, _type: "reference" }
            })
        },
       
      );
      onChange(PatchEvent.from(action));
      //const action = unset([{ _key: cardId }]);
      //onChange(PatchEvent.from(action));
      //setDeckList((prevState) => prevState.filter((obj) => obj != card));
    }
};

  const numberElement = (color, number) => {
    return (
      <Button
        padding={2}
        onClick={(event) => {
          handleClick(number);
        }}
        radius={0}
        shadow={1}
        tone={color || "default"}
        mode={color == "default" && "ghost"}
        key={number}
      >
        <Text size={1}>{number || "0"}</Text>
      </Button>
    );
  };

  return (
    <Flex style={{ width: "100px" }}>
      {deckLimit.map((number) => {
        if (
          number != 0 &&
          currentCardInDeck.length &&
          number === currentCardInDeck[0].cardQuantity
        ) {
          return (
            <Button
              radius={0}
              shadow={1}
              padding={2}
              tone={"positive"}
              mode={"default"}
              key={number}
            >
              <Text size={1}>{number || "0"}</Text>
            </Button>
          );
        }/*  else if (number === 0 && !currentCardInDeck.length) {
          return (
            <Box
              style={{ background: "#f5f5f5" }}
              radius={0}
              shadow={1}
              padding={2}
              key={0}
            >
              <Text size={1}>{number}</Text>
            </Box>
          );
        } */ else {
          return numberElement("default", number);
        }
      })}
    </Flex>
  );
});

export default QuantityNumber;
