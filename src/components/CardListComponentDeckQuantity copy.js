import React, { useState } from 'react'
import QuantityNumber from './QuantityNumber';
import {
    Box
} from "@sanity/ui";

export const CardListComponentDeckQuantity = React.forwardRef((props, ref) => {
    const { deckLimit, card, deckInformation, cardList, setDeckList, deckList, value, cardId, onChange, size, closeDialog} = props
    //console.log("cardList", cardList)
    //console.log("deckList", deckList)
    //console.log(card)

    let countArray = []
    for (let i = 0; i < deckLimit + 1; i++) {
        countArray.push(i)
    }
    return (
        <Box flex="1" padding={0}>
            
                <QuantityNumber card={card} deckInformation={deckInformation} cardList={cardList} deckList={deckList} setDeckList={setDeckList} size={size} deckLimit={countArray} value={value} cardId={cardId} onChange={onChange} onClose={closeDialog}/>
           
        </Box>
    )
})

export default CardListComponentDeckQuantity

