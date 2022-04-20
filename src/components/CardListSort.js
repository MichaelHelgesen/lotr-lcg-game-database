import React, { useState } from "react";
import CardListComponent from "./CardListComponent";
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

export const CardListSort = React.forwardRef((props, ref) => {
const { cardList, setCardList, value } = props
const [order, setOrder] = useState(true)


const sortList = (sortParam) => {
    setCardList(prevState => {
        return [...prevState].sort((a, b) => {
            let nameA
            let nameB
            if (typeof a[sortParam] == "object") {
                nameA = a[sortParam]._ref.toLowerCase()
                nameB = b[sortParam]._ref.toLowerCase()
            } else if (sortParam == "cost") {
                nameA = a[sortParam] || Number(a.threat)
                nameB = b[sortParam] || Number(b.threat)
            } else if (sortParam == "defense") {
                nameA = Number(a[sortParam]) || Number(-10)
                nameB = Number(b[sortParam]) || Number(-10)
            } else if (sortParam == "attack") {
                nameA = a[sortParam] || 0
                nameB = b[sortParam] || 0
            } else if (sortParam == "health") {
                nameA = Number(a[sortParam]) || -1
                nameB = Number(b[sortParam]) || -1
            } else if (sortParam == "willpower") {
                nameA = a[sortParam] || 0
                nameB = b[sortParam] || 0
            } else if (typeof a[sortParam] == "string") {
                nameA = a[sortParam].toLowerCase()
                nameB = b[sortParam].toLowerCase()
            } else if (typeof a[sortParam] == "number") {
                nameA = a[sortParam]
                nameB = b[sortParam]
            }
            
            if (nameA < nameB) {
                return order ? -1 : 1
            }
            if (nameA > nameB) {
                return order ? 1 : -1
            }
            return 0;
        })
    })
    setOrder(prevState => !prevState)
}

  return (
    <Flex>
      <Box flex="1">Qty</Box>
      <Box flex="3" onClick={() => {sortList("name")}}>Name</Box>
      <Box flex="1">
        <Flex>
          <Box onClick={() => {sortList("sphere")}}>S</Box>
          <Box onClick={() => {sortList("cardType")}}>T</Box>
          <Box onClick={() => {sortList("cost")}}>T/C</Box>
          <Box onClick={() => {sortList("willpower")}}>W</Box>
          <Box onClick={() => {sortList("attack")}}>A</Box>
          <Box onClick={() => {sortList("defense")}}>D</Box>
          <Box onClick={() => {sortList("health")}}>H</Box>
        </Flex>
      </Box>
    </Flex>
  );
});

export default CardListSort;