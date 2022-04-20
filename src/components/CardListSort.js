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
  const { cardList, setCardList, value } = props;
  const [order, setOrder] = useState(true);
  const [sortParameter, setSortParameter] = useState("")

  const references = value.map(reference => reference._ref)

  const sortList = (sortParam) => {
    console.log(sortParameter)
    if(!sortParameter) {
      setSortParameter(sortParam)
      //setOrder(true)
    } else if (sortParameter != sortParam) {
      setSortParameter(sortParam)
      setOrder(true)
    } else (
      setOrder(prevState => !prevState)
    )
    setCardList((prevState) => {
      const newArr = prevState.map(prevObj => {
        return {
          ...prevObj,
          numberInDeck: references.filter(reference => reference === prevObj._id).length
        }
      })
      return [...newArr].sort((a, b) => {
        let nameA;
        let nameB;
        if (typeof a[sortParam] == "object") {
          nameA = a[sortParam]._ref.toLowerCase();
          nameB = b[sortParam]._ref.toLowerCase();
        } else if (sortParam == "numberInDeck") {
          nameA = a[sortParam] > 0 ? a[sortParam] : undefined
          nameB = b[sortParam] > 0 ? b[sortParam] : undefined
        } else if (sortParam == "cost") {
          a[sortParam] ? a[sortParam] != "X" ? nameA = Number(a.cost) || 0 : nameA = 100 : nameA = a.threat;
          b[sortParam] ? b[sortParam] != "X" ? nameB = Number(b.cost) || 0 : nameB = 100 : nameB = b.threat;
        } else if (typeof a[sortParam] == "string") {
          nameA = a[sortParam].toLowerCase()
          nameB = b[sortParam].toLowerCase()
        } else {
          nameA = a[sortParam];
          nameB = b[sortParam];
        }
        if (typeof nameA != "number" && typeof nameA != "string" && nameA === nameB) {
          return 0;
        } else if (typeof nameA != "number" && typeof nameA != "string") {
          return 1;
        } else if (typeof nameB != "number" && typeof nameA != "string") {
          return -1;
        } else if (nameA < nameB) {
          return order ? -1 : 1;
        } else if (nameA > nameB) {
          return order ? 1 : -1;
        } else {
          return 0;
        }
      });
    });
    
  };

  return (
    <Flex>
      <Box flex="1" onClick={() => {
        sortList("numberInDeck");
      }}
      >
        Qty
      </Box>
      <Box
        flex="3"
        onClick={() => {
          sortList("name");
        }}
      >
        Name
      </Box>
      <Box flex="1">
        <Flex>
          <Box
            onClick={() => {
              sortList("sphere");
            }}
          >
            S
          </Box>
          <Box
            onClick={() => {
              sortList("cardType");
            }}
          >
            T
          </Box>
          <Box
            onClick={() => {
              sortList("cost");
            }}
          >
            T/C
          </Box>
          <Box
            onClick={() => {
              sortList("willpower");
            }}
          >
            W
          </Box>
          <Box
            onClick={() => {
              sortList("attack");
            }}
          >
            A
          </Box>
          <Box
            onClick={() => {
              sortList("defense");
            }}
          >
            D
          </Box>
          <Box
            onClick={() => {
              sortList("health");
            }}
          >
            H
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
});

export default CardListSort;
