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
    Inline,
    Dialog,
    Portal
} from "@sanity/ui";
import sanityClient from 'part:@sanity/base/client'
const client = sanityClient.withConfig({ apiVersion: `2022-01-10` })
const { dataset, projectId, useCdn } = client.clientConfig
const builder = imageUrlBuilder({ projectId, dataset, useCdn })
function urlFor(source) {
    return builder.image(source)
}




export const CardDialog = React.forwardRef((props, ref) => {
    const { card, setDeckList, deckList, traitsList, sphereList, cardList, open, onClose, value, onChange, size, setOpen } = props

    return (
        <Box>
            {
                open && (
                    <Dialog
                        width={300}
                        header={
                            <Stack space={2}>
                                <Text size={[3]} weight={"bold"}>{`${card.name}, ${card.isUnique ? "unique " : ""} ${card.sphere._ref} ${card.cardType._ref}`}
                                </Text>
                                <Text>{
                                    traitsList.filter(trait => {
                                        return card.traits.map(traitObj => traitObj._ref).indexOf(trait._id) != -1
                                    }).map((currentTrait, index) => { return index != 0 ? <span>{`, ${currentTrait.name}`}</span> : <span>{currentTrait.name}</span> }
                                    )
                                }
                                </Text>
                            </Stack>
                        }
                        id={card._id}
                        onClose={onClose}
                        zOffset={1000}
                    >

                        <Flex padding="4">
                            <Card flex="2" marginRight={[2, 2, 3, 5]}>
                                <Flex direction={"column"} justify={"space-between"} style={{height: "100%"}}>
                                    <Card>
                                        <Stack padding={0} space={4}>
                                            <Grid columns={[1, 1, 2, 3]} gap={[1, 1, 2, 3]} padding={0}>
                                                {card.threat ?
                                                    <Card
                                                        radius={2}
                                                        shadow={1}
                                                        tone="primary"
                                                        padding={3}
                                                    >
                                                        <Text
                                                            align="center"
                                                        >
                                                            Threat: {card.threat}
                                                        </Text>
                                                    </Card>
                                                    :
                                                    null
                                                }
                                                {card.cost ?
                                                    <Card
                                                        radius={2}
                                                        shadow={1}
                                                        tone="primary"
                                                        padding={3}
                                                    >
                                                        <Text
                                                            align="center"
                                                        >
                                                            Cost: {card.cost}
                                                        </Text>
                                                    </Card>
                                                    :
                                                    null
                                                }
                                                {card.willpower ?
                                                    <Card
                                                        radius={2}
                                                        shadow={1}
                                                        tone="primary"
                                                        padding={3}
                                                    >
                                                        <Text
                                                            align="center"
                                                        >
                                                            Willpower: {card.willpower}
                                                        </Text>
                                                    </Card>
                                                    :
                                                    null
                                                }
                                                {card.attack ?
                                                    <Card
                                                        radius={2}
                                                        shadow={1}
                                                        tone="primary"
                                                        padding={3}
                                                    >
                                                        <Text
                                                            align="center"
                                                        >
                                                            Attack: {card.attack}
                                                        </Text>
                                                    </Card>
                                                    :
                                                    null
                                                }
                                                {card.defense ?
                                                    <Card
                                                        radius={2}
                                                        shadow={1}
                                                        tone="primary"
                                                        padding={3}
                                                    >
                                                        <Text
                                                            align="center"
                                                        >
                                                            Defense: {card.defense}
                                                        </Text>
                                                    </Card>
                                                    :
                                                    null
                                                }
                                                {card.health ?
                                                    <Card
                                                        radius={2}
                                                        shadow={1}
                                                        tone="primary"
                                                        padding={3}
                                                    >
                                                        <Text
                                                            align="center"
                                                        >
                                                            Hitpoints: {card.health}
                                                        </Text>
                                                    </Card>
                                                    :
                                                    null
                                                }
                                            </Grid>
                                            <Text>
                                                <div dangerouslySetInnerHTML={{ __html: card.cardText }}></div>
                                            </Text>
                                        </Stack>
                                    </Card>
                                    <Card>
                                        <CardListComponentQuantity size={size} card={card} setDeckList={setDeckList} deckList={deckList} cardList={cardList} deckLimit={card.deckLimit} value={value} cardId={card._id} onChange={onChange} closeDialog={onClose} />
                                    </Card>
                                </Flex>
                            </Card>
                            <Card flex="1">
                                <img width={"100%"} src={urlFor(card.cardImage).url()} />
                            </Card>
                        </Flex>
                    </Dialog>
                )
            }
        </Box>
    )
})

export default CardDialog