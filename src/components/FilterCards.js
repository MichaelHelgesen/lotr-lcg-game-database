// /src/MyCustomString.js

import React, { useState, useEffect } from "react";
import { FormField } from "@sanity/base/components";
import PatchEvent, {
    set,
    unset,
    prepend,
    insert,
    setIfMissing,
} from "@sanity/form-builder/PatchEvent";
import styles from "../components/filterCards.css";
import { useDocumentOperation } from '@sanity/react-hooks'

import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: `2022-01-10` });
const { dataset, projectId, useCdn } = client.clientConfig;

const queryCardType = '*[_type == "card"]';

// Import UI components from Sanity UI
import {
    TextInput,
    Stack,
    Label,
    Grid,
    Card,
    Text,
    Flex,
    Box,
} from "@sanity/ui";

const cardStyle = {
    cursor: "pointer",
};

export const FilterCards = React.forwardRef((props, ref) => {
    const { patch } = useDocumentOperation('someDocId', 'someDocType')
    const {
        type,
        value,
        readOnly,
        placeholder,
        markers,
        presence,
        compareValue,
        onFocus,
        onBlur,
        onChange,
    } = props;


    const [cardList, setCardList] = useState([]);
    const [chosenCards, chooseCard] = useState([]);
    //const [deck, setDeck] = useState(value);

    useEffect(() => {
        let isSubscribed = true;
        client.fetch(queryCardType).then((cards) => {
            if (isSubscribed) {
                setCardList(
                    cards.map((card) => {
                        if (value) {
                            value.forEach((obj) => {
                                if (obj._ref === card._id ) {
                                    chooseCard((prevState) => {
                                        return [...prevState.filter(el => el._id != card._id), card];
                                    });
                                }
                            });
                        }
                        return { ...card };
                    })
                );
            }
        });
        return () => (isSubscribed = false);
    }, []);



    const clearReferences = React.useCallback(
        // useCallback will help with performance
        (event) => {
            chooseCard([]);
            const inputValue = null;
            // if the value exists, set the data, if not, unset the data
            onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()));
        },
        [onChange] // Verdien å se etter for oppdatering
    );


      const deleteAndAddCards = React.useCallback(
          (event) => {
            //console.log(event)
            console.log("cardselection1", props.parent.cardSelection)
            client
                    .patch(props.parent._id)
                    .unset([`cardSelection[_ref == "01005"]`])
                    .commit()
                    .then((res) => {
                        console.log(res.cardSelection, 'removed')
                        console.log("cardselection2", props.parent.cardSelection)
                        onChange(PatchEvent.from(set(res.cardSelection)))
                    })
                    .catch((err) => {
                        console.error('Transaction failed: ', err.message)
                    })
                    console.log("cardselection3", props.parent.cardSelection)
            
          }, [onChange]
      )

      const handleClick = React.useCallback(
        (event, card) => {
            chooseCard((prevState) => {
                return [...prevState.filter(el => el._id != card._id), card];
            });
            const action = insert(
                [{ _ref: card._id, _type: "reference" }],
                "after",
                [-1]
            );
            onChange(PatchEvent.from(action).prepend(setIfMissing([])));
        },
        [onChange]
        
    );

    const deleteAndAddCard = React.useCallback(
        (number, card) => {
            console.log("PROPS PARENT", props.parent.cardSelection)
            //const cardsReducedToId = props.parent.cardSelection.map(card => card._ref)
            const numberOfCardsInDeck = props.parent.cardSelection.filter(existingCard => existingCard._ref == card._id).length
            const numberOfCardsInDeck2 = props.parent.cardSelection.map(existingCard => existingCard._ref)
            //console.log("chosencards", chosenCards)
            //console.log(chosenCards.indexOf(card))
            const index = numberOfCardsInDeck2.indexOf(card._id)

            if (number > 0 && number < numberOfCardsInDeck) {
                console.log("number less")
                for (let i = number; i <  numberOfCardsInDeck; i++){
                    console.log("lower", i)
                    console.log(numberOfCardsInDeck2.indexOf(card._id))
                    console.log(numberOfCardsInDeck2)
                    /* chooseCard((prevState) => {
                        prevState.splice(chosenCards.indexOf(card), 1)
                        return [...prevState];
                    }); */
                    client
                    .patch(props.parent._id)
                    .unset([`cardSelection[${index}]`])
                    .commit()
                    .then((res) => {
                        console.log(res, 'removed')
                        //onChange(PatchEvent.from(set(res.cardSelection)))
                        console.log("chosencards", res.cardSelection)
                    })
                    .catch((err) => {
                        console.error('Transaction failed: ', err.message)
                    })
                /* chooseCard((prevState) => {
                    return [...prevState.filter(existingCard => {
                        return (existingCard._id != card._id)
                    })];
                }); */
                    console.log(chosenCards)
                }
            } else if (number > 0 && number > numberOfCardsInDeck) {
                for (let i = numberOfCardsInDeck; i <  number; i++){
                    chooseCard((prevState) => {
                        return [...prevState.filter(el => el._id != card._id), card];
                    });
                    const action = insert(
                        [{ _ref: card._id, _type: "reference" }],
                        "after",
                        [-1]
                    );
                    onChange(PatchEvent.from(action).prepend(setIfMissing([])));
                    console.log("higher", i)
                }
            } else if (number === 0) {
                client
                    .patch(props.parent._id)
                    .unset([`cardSelection[_ref == "${card._id}"]`])
                    .commit()
                    .then((res) => {
                        console.log(res, 'removed')
                        //onChange(PatchEvent.from(set(res.cardSelection)))
                        console.log("chosencards", res.cardSelection)
                    })
                    .catch((err) => {
                        console.error('Transaction failed: ', err.message)
                    })
                chooseCard((prevState) => {
                    return [...prevState.filter(existingCard => {
                        return (existingCard._id != card._id)
                    })];
                });
            }
            //numArray.splice(index, 1);
            /* if(cardsReducedToId.indexOf(cardId) > -1) {

            } */
            /* chooseCard((prevState) => {
                return [...prevState.filter(card => {
                    return (card._id != cardId)
                })];
            });
            console.log("chosencards", props.parent.cardSelection) */
            /* const action =
                client
                    .patch(props.parent._id)
                    .unset([`cardSelection[_ref == "${cardId}"]`])
                    .commit()
                    .then((res) => {
                        console.log(res, 'removed')
                        onChange(PatchEvent.from(set(res.cardSelection)))
                        console.log("chosencards", res.cardSelection)
                    })
                    .catch((err) => {
                        console.error('Transaction failed: ', err.message)
                    }) */

                    
            //onChange(PatchEvent.from(action ? console.log(action) : console.log("null").commit()));
        }/* ,
        [onChange] */
    );

    const testClick = (numberClicked, cardId) => {
        //console.log(numberClicked, cardId);
        deleteAndAddCard(numberClicked, card);
    };

    const setQuantity = (quantity, card) => {
        const filteredValue = value
            ? value.filter((ref) => ref._ref === card._id)
            : [];
        let quantityOfGivenCard = [];

        for (let i = 0; i <= quantity; i++) {
            if (filteredValue.length === i) {
                quantityOfGivenCard.push(
                    <Box
                        key={i}
                        padding={[0, 1]}
                        style={{ outline: "1px solid gray", background: "#e5e5e5" }}
                    >
                        <Text align={"right"}>{i}</Text>
                    </Box>
                );
            } else {
                quantityOfGivenCard.push(
                    <Box
                        key={i}
                        className={styles.numBox}
                        onClick={(event) => deleteAndAddCard(i, card)}
                        padding={[0, 1]}
                        style={{ outline: "1px solid gray" }}
                    >
                        <Text align={"right"}>{i}</Text>
                    </Box>
                );
            }
        }
        return quantityOfGivenCard;
    };

    return (
        <FormField
            description={type.description}
            title={type.title}
            __unstable_markers={markers}
            __unstable_presence={presence}
            compareValue={compareValue}
            //ref={ref}
        >
            <Grid columns={[1, 2, 2, 2]} gap={[1, 1, 2, 3]} padding={0}>
                <Stack space={[3, 3, 4]}>
                    <Card>
                        <Label>Deck</Label>
                    </Card>
                    <Card>
                        {chosenCards.length ? (
                            chosenCards.map((card, index) => (
                                <Card>
                                    <Card
                                        className={styles.cardCard}
                                        /* onClick={(event) => handleClick(event, card)} */
                                        padding={[3, 3, 4]}
                                        radius={2}
                                        shadow={1}
                                        key={index}
                                    >
                                        <Grid columns={[2]}>
                                            <Text readOnly={readOnly}
                                                //value={value}
                                                //ref={ref}
                                                onFocus={onFocus}
                                                onBlur={onBlur} onClick={(event) => handleClick(event, card)}>{card.name}</Text>
                                            <Flex align={"center"} justify={"flex-end"}>
                                                {setQuantity(card.quantity, card)}
                                            </Flex>
                                        </Grid>
                                    </Card>
                                </Card>
                            ))
                        ) : (
                            <Text>No cards in deck</Text>
                        )}
                    </Card>
                    {chosenCards.length ? (
                        <Card
                            className={styles.cardCard_delete}
                            tone="primary"
                            padding={[3, 3, 4]}
                            radius={2}
                            shadow={1}
                            onClick={clearReferences}
                        >
                            <Text align="center">Clear cards</Text>
                        </Card>
                    ) : null}
                </Stack>
                <Stack space={[3, 3, 4]}>
                    <Card>
                        <Label>Cardpool</Label>
                    </Card>
                    <Card>
                        {cardList.length
                            ? cardList.map((card, index) => (
                                <Card>
                                    <Card
                                        className={styles.cardCard}
                                        /* onClick={(event) => handleClick(event, card)} */
                                        padding={[3, 3, 4]}
                                        radius={2}
                                        shadow={1}
                                        key={index}
                                    >
                                        <Grid columns={[2]}>
                                            <Text readOnly={readOnly}
                                                //value={value}
                                                //ref={ref}
                                                onFocus={onFocus}
                                                onBlur={onBlur} onClick={(event) => handleClick(event, card)}>{card.name}</Text>
                                            <Flex align={"center"} justify={"flex-end"}>
                                                {setQuantity(card.quantity, card)}
                                            </Flex>
                                        </Grid>
                                    </Card>
                                </Card>
                            ))
                            : null}
                    </Card>
                </Stack>
            </Grid>
        </FormField>
    );
});

export default FilterCards;
