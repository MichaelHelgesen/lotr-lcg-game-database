// /src/MyCustomString.js

import React, { useState, useEffect } from 'react'


import sanityClient from 'part:@sanity/base/client'
const client = sanityClient.withConfig({ apiVersion: `2022-01-10` })
const { dataset, projectId, useCdn } = client.clientConfig

const query = '*[_type == "card"]'

// Import UI components from Sanity UI
import { TextInput, Stack, Label, Grid, Card, Text, Flex, Box } from '@sanity/ui'

export const FilterCards = React.forwardRef((props, ref) => {

    const [cardList, setCardList] = useState([]);

    useEffect(() => {
        let isSubscribed = true;
        client.fetch(query)
            .then((cards) => {
                if (isSubscribed) {
                    setCardList(cards.map(card => {
                        return card.name
                    }))
                }
            })
        return () => isSubscribed = false
    }, [])
    return (
        <Grid columns={[1, 2, 2, 2]} gap={[1, 1, 2, 3]} padding={0}>
            <Card>Deck</Card>
            <Card>
                <Card>Cardlist</Card>
                <Card>
                    {
                        cardList.length ? cardList.map((card, index) => <p key={index}>{card}</p>) : null
                    }
                </Card>
            </Card>
        </Grid>

    )
}
)

export default FilterCards