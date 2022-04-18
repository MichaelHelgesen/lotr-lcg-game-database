// /src/MyCustomString.js

import React, { useState } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import CardListComponentQuantity from './CardListComponentQuantity';
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
    Portal
} from "@sanity/ui";
import sanityClient from 'part:@sanity/base/client'
const client = sanityClient.withConfig({apiVersion: `2022-01-10`})
const {dataset, projectId, useCdn} = client.clientConfig
const builder = imageUrlBuilder({projectId, dataset, useCdn})
function urlFor(source) {
    return builder.image(source)
  }




export const CardDialog = React.forwardRef((props, ref) => {
    const { card, open, onClose, value, onChange, size, setOpen } = props

    return (
        <Box>
            {
                open && (
                    <Dialog
                        width="100%"
                        header={card.name}
                        id={card._id}
                        onClose={onClose}
                        zOffset={1000}
                    >
                        <Flex padding="4">
                            <Card flex="1">
                                    <img width={"100%"} src={urlFor(card.cardImage).url()} />
                            </Card>
                            <Card flex="1" marginLeft={[2, 2, 3, 5]}>
                                <Stack padding={0} space={[5, 5, 5, 6]}>
                                    <Stack padding={0} space={[3, 3, 2, 2]}>
                                        <Label size={2}>Name</Label>
                                        <Text size={[2, 2, 3, 4]} weight={"bold"}>{card.name}</Text>
                                    </Stack>
                                    <Stack padding={0} space={[3, 3, 2, 2]}>
                                        <Label size={2}>Card text</Label>
                                        <Text size={[2, 2, 2, 3]} weight={"regular"}>
                                            <div dangerouslySetInnerHTML={{ __html: card.cardText }}></div>
                                        </Text>
                                    </Stack>
                                    <Stack padding={0} space={[3, 3, 2, 2]}>
                                        <Label size={2}>Stats</Label>
                                        <Grid columns={[1, 1, 2, 2]} gap={[1, 1, 2, 3]} padding={0}>
                                            {card.cost && <Card radius={2}
                                                shadow={1}
                                                tone="primary" padding={3}><Text align="center">Cost: {card.cost}</Text></Card>}
                                            {card.threat && <Card radius={2}
                                                shadow={1}
                                                tone="primary" padding={3}><Text align="center">Threat: {card.threat}</Text></Card>}
                                            <Card radius={2}
                                                shadow={1}
                                                tone="primary" padding={3}><Text align="center">Willpower: {card.willpower}</Text></Card>
                                            <Card radius={2}
                                                shadow={1}
                                                tone="primary" padding={3}><Text align="center">Attack: {card.attack}</Text></Card>
                                            <Card radius={2}
                                                shadow={1}
                                                tone="primary" padding={3}><Text align="center">Defense: {card.defense}</Text></Card>
                                            <Card radius={2}
                                                shadow={1}
                                                tone="primary" padding={3}><Text align="center">Health: {card.health}</Text></Card>
                                        </Grid>
                                        <CardListComponentQuantity size={size} deckLimit={card.deckLimit} value={value} cardId={card._id} onChange={onChange} closeDialog={onClose}/>
                                    </Stack>
                                </Stack>
                            </Card>

                        </Flex>
                    </Dialog>
                )
            }
        </Box>
    )
})

export default CardDialog