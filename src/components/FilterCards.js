// /src/MyCustomString.js

import React, { useState, useEffect } from 'react'
import { FormField } from '@sanity/base/components'
import PatchEvent, { set, unset, prepend, insert, setIfMissing } from '@sanity/form-builder/PatchEvent'


import sanityClient from 'part:@sanity/base/client'
const client = sanityClient.withConfig({ apiVersion: `2022-01-10` })
const { dataset, projectId, useCdn } = client.clientConfig

const query = '*[_type == "card"]'

// Import UI components from Sanity UI
import { TextInput, Stack, Label, Grid, Card, Text, Flex, Box } from '@sanity/ui'

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
        client.fetch(query)
            .then((cards) => {
                if (isSubscribed) {
                    setCardList(cards.map(card => {
                        return {...card}
                    }))
                }
            })
        return () => isSubscribed = false
    }, [])

    const handleClick = React.useCallback(
        // useCallback will help with performance
        (event, id) => {
            const inputValue = insert(
                [{ _ref: id, _type: "reference" }],
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
            const inputValue = null
            // if the value exists, set the data, if not, unset the data
            onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
        },
        [onChange] // Verdien å se etter for oppdatering
    )

    return (
        <FormField
            description={type.description}
            title={type.title}
            __unstable_markers={markers}
            __unstable_presence={presence}
            compareValue={compareValue}
        >
            <Grid columns={[1, 2, 2, 2]} gap={[1, 1, 2, 3]} padding={0}>
                <Card>Deck
                <Card>
                    <ul>
                        {value ? value.map(card => <li>card._ref</li>) : <li>No cards in deck</li>}
                    </ul>
                    <p onClick={clearReferences}>Clear references</p>
                </Card>
                </Card>
                
                <Card>
                    <Card>Cardlist</Card>
                    <Card>
                        {
                            cardList.length ? cardList.map((card, index) => <Card onClick={(event) => handleClick(event, card._id)} padding={[3, 3, 4]} radius={2} shadow={1} key={index}>{card.name}</Card>) : null
                        }
                    </Card>
                </Card>
            </Grid>
        </FormField>
    )
}
)

export default FilterCards