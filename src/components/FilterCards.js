// /src/MyCustomString.js

import React, { useState, useEffect } from 'react'
import { FormField } from '@sanity/base/components'
import PatchEvent, { set, unset, prepend, insert, setIfMissing } from '@sanity/form-builder/PatchEvent'
import styles from "../components/filterCards.css"

import sanityClient from 'part:@sanity/base/client'
const client = sanityClient.withConfig({ apiVersion: `2022-01-10` })
const { dataset, projectId, useCdn } = client.clientConfig

const queryCardType = '*[_type == "card"]'


// Import UI components from Sanity UI
import { TextInput, Stack, Label, Grid, Card, Text, Flex, Box } from '@sanity/ui'

const cardStyle = {
    cursor: "pointer"
}

export const FilterCards = React.forwardRef((props, ref) => {

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
    } = props

    const [cardList, setCardList] = useState([])
    const [chosenCards, chooseCard] = useState([]);

    useEffect(() => {
        let isSubscribed = true;
        client.fetch(queryCardType)
            .then((cards) => {
                if (isSubscribed) {
                    setCardList(cards.map(card => {
                        if (value) {
                            value.forEach(obj => {
                                if (obj._ref === card._id) {
                                    chooseCard(prevState => {
                                        return [...prevState, card]
                                    })
                                }
                            })
                        }
                        return { ...card }
                    }))
                }
            })
        return () => isSubscribed = false
    }, [])

    const handleClick = React.useCallback(
        // useCallback will help with performance
        (event, card) => {
            chooseCard(prevState => {
                return [...prevState, card]
            })
            const inputValue = insert(
                [{ _ref: card._id, _type: "reference" }],
                'after',
                [-1]
            )
            onChange(PatchEvent.from(inputValue).prepend(setIfMissing([])))
        },
        [onChange] // Verdien å se etter for oppdatering
    )

    const clearReferences = React.useCallback(
        // useCallback will help with performance
        (event) => {
            chooseCard([])
            const inputValue = null
            // if the value exists, set the data, if not, unset the data
            onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
        },
        [onChange] // Verdien å se etter for oppdatering
    )

    const setQuantity = (quantity) => {
        let quantityOfGivenCard = [];
        for (let i = 0; i <= quantity; i++){
            quantityOfGivenCard.push(i)
        }
        return quantityOfGivenCard
    } 

    return (
        <FormField
            description={type.description}
            title={type.title}
            __unstable_markers={markers}
            __unstable_presence={presence}
            compareValue={compareValue}
        >
            <Grid columns={[1, 2, 2, 2]} gap={[1, 1, 2, 3]} padding={0}>
                <Stack space={[3, 3, 4]}>
                    <Card><Label>Deck</Label></Card>
                    <Card>
                        {chosenCards.length ? chosenCards.map((card, index) => <Card className={styles.cardCard} padding={[3, 3, 4]} radius={2} shadow={1} key={index}>{card.name}</Card>) : <Text>No cards in deck</Text>}
                    </Card>
                    {chosenCards.length ? <Card className={styles.cardCard_delete} tone="primary" padding={[3, 3, 4]} radius={2} shadow={1} onClick={clearReferences}><Text align="center">Clear references</Text></Card> : null}
                </Stack>
                <Stack space={[3, 3, 4]}>
                    <Card><Label>Cardpool</Label></Card>
                    <Card>
                        {
                            cardList.length ? cardList.map((card, index) => <Card>
                                <Card className={styles.cardCard} onClick={(event) => handleClick(event, card)} padding={[3, 3, 4]} radius={2} shadow={1} key={index}><Grid columns={[2]}>{card.name}
                                    <Flex align={"center"} justify={"flex-end"}>{setQuantity(card.quantity).map(num => <Box padding={[0, 1]} style={{outline: '1px solid gray'}}><Text align={"right"}>{num}</Text></Box>)}</Flex></Grid>
                                </Card>
                            </Card>) : null
                        }
                    </Card>
                </Stack>
            </Grid>
        </FormField>
    )
}
)

export default FilterCards