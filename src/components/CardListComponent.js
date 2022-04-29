import React, { useState } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import CardListComponentQuantity from './CardListComponentQuantity';
import CardDialog from './CardDialog';
import CardTooltip from './CardTooltip';
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
    Portal,
    Tooltip,
    Container
} from "@sanity/ui";
import sanityClient from 'part:@sanity/base/client'
const client = sanityClient.withConfig({ apiVersion: `2022-01-10` })
const { dataset, projectId, useCdn } = client.clientConfig
const builder = imageUrlBuilder({ projectId, dataset, useCdn })
function urlFor(source) {
    return builder.image(source)
}

export const CardListComponent = React.forwardRef((props, ref) => {
    const { card, cardList, traitsList, sphereList, value, deckList, onChange, size, setDeckList } = props
    const [open, setOpen] = useState(false)
    
    const onClose = React.useCallback(
        () => {
            setOpen(false)
        }, []
    );

    const onOpen = React.useCallback(
        () => {
            setOpen(true)
        }, []
    );
    return (
        <Card shadow={1} padding={2}>
            <Flex align="center">
                <CardListComponentQuantity cardList={cardList} deckList={deckList} setDeckList={setDeckList} card={card} size={size} deckLimit={card.deckLimit} value={value} cardId={card._id} onChange={onChange} />
                <Box >
                    <CardTooltip card={card} size={size} setOpen={setOpen} traitsList={traitsList}/>
                </Box>
                <Box >
                        <Flex align="flex-end" justify="space-between">
                            <Box style={{width:"25px"}} align={"center"}><Text size={[1]} align="center">{card.sphere._ref.slice(0,1)}</Text></Box>
                            <Box style={{width:"25px"}} align={"center"}><Text size={[1]} align="center">{card.cardType._ref.slice(0,1)}</Text></Box>
                            <Box style={{width:"25px"}} align={"center"}><Text size={[1]} align="center">{card.cost || card.threat}</Text></Box>
                            <Box style={{width:"25px"}} align={"center"}><Text size={[1]} align="center">{card.willpower}</Text></Box>
                            <Box style={{width:"25px"}} align={"center"}><Text size={[1]} align="center">{card.attack}</Text></Box>
                            <Box style={{width:"25px"}} align={"center"}><Text size={[1]} align="center">{card.defense}</Text></Box>
                            <Box style={{width:"25px"}} align={"center"}><Text size={[1]} align="center">{card.health}</Text></Box>
                        </Flex>
                </Box>
            </Flex>
            <CardDialog deckList={deckList} traitsList={traitsList} sphereList={sphereList} setDeckList={setDeckList} cardList={cardList} card={card} onClose={onClose} open={open} size={size} value={value} onChange={onChange} setOpen={setOpen} />
        </Card>
    )
})

export default CardListComponent