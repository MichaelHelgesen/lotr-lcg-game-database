import React, { useState, useEffect } from "react";
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
  const {
    cardList,
    setCardList,
    value,
    sortParameter,
    setSortParameter,
    replaceSpecialCharacters,
  } = props;

  const references = value.map((reference) => reference._ref);

  useEffect(() => {
    setCardList((prevState) => {
      /* const newArr = prevState.map((prevObj) => {
        return {
          ...prevObj,
          numberInDeck: references.filter(
            (reference) => reference === prevObj._id
          ).length,
        };
      }); */
      return [...prevState].sort((a, b) => {
        let nameA;
        let nameB;
        if (typeof a[sortParameter.param] == "object") {
          nameA = a[sortParameter.param]._ref.toLowerCase();
          nameB = b[sortParameter.param]._ref.toLowerCase();
        } else if (sortParameter.param == "numberInDeck") {
          console.log("quantity");
          nameA =
            value.map((obj) => obj._key).indexOf(a._id) != -1
              ? value[value.map((obj) => obj._key).indexOf(a._id)].quantity
              : undefined;
          nameB =
            value.map((obj) => obj._key).indexOf(b._id) != -1
              ? value[value.map((obj) => obj._key).indexOf(b._id)].quantity
              : undefined;
        } else if (sortParameter.param == "cost") {
          a[sortParameter.param]
            ? a[sortParameter.param] != "X"
              ? (nameA = Number(a.cost) || 0)
              : (nameA = 100)
            : (nameA = a.threat);
          b[sortParameter.param]
            ? b[sortParameter.param] != "X"
              ? (nameB = Number(b.cost) || 0)
              : (nameB = 100)
            : (nameB = b.threat);
        } else if (typeof a[sortParameter.param] == "string") {
          nameA = replaceSpecialCharacters(
            a[sortParameter.param].toLowerCase()
          );
          nameB = replaceSpecialCharacters(
            b[sortParameter.param].toLowerCase()
          );
        } else {
          nameA = a[sortParameter.param];
          nameB = b[sortParameter.param];
        }
        if (
          typeof nameA != "number" &&
          typeof nameA != "string" &&
          nameA === nameB
        ) {
          return 0;
        } else if (typeof nameA != "number" && typeof nameA != "string") {
          return 1;
        } else if (typeof nameB != "number" && typeof nameA != "string") {
          return -1;
        } else if (nameA < nameB) {
          return sortParameter.state ? -1 : 1;
        } else if (nameA > nameB) {
          return sortParameter.state ? 1 : -1;
        } else {
          return 0;
        }
      });
    });
  }, [sortParameter]);

  const sortList = (sortParam) => {
    //setOrder((prevState) => !prevState);
    if (sortParameter.param == "") {
      setSortParameter((prevState) => {
        return {
          ...prevState,
          param: sortParam,
        };
      });
    } else if (sortParameter.param != sortParam) {
      setSortParameter((prevState) => {
        return {
          state: true,
          param: sortParam,
        };
      });
    } else {
      setSortParameter((prevState) => {
        return {
          ...prevState,
          state: !prevState.state,
        };
      });
    }
  };

  return (
    <Flex padding={2}>
      <Box
        flex="1"
        onClick={() => {
          sortList("numberInDeck");
        }}
      >
        <Text size={1}>Qty</Text>
      </Box>
      <Box
        flex="2"
        onClick={() => {
          sortList("name");
        }}
      >
       {sortParameter.indexOf("name") ?  <Text weight={bold} size={1}>Name</Text> :  <Text size={1}>Name</Text>}
      </Box>
      <Box flex="1">
        <Flex align="flex-end" justify="space-between">
          <Box
            onClick={() => {
              sortList("sphere");
            }}
          >
            <Text align={"center"} size={1}>S</Text>
          </Box>
          <Box
            onClick={() => {
              sortList("cardType");
            }}
          >
            <Text align={"center"} size={1}>T</Text>
          </Box>
          <Box
            onClick={() => {
              sortList("cost");
            }}
          >
            <Text align={"center"} size={1}>T/C</Text>
          </Box>
          <Box
            onClick={() => {
              sortList("willpower");
            }}
          >
            <Text align={"center"} size={1}>W</Text>
          </Box>
          <Box
            onClick={() => {
              sortList("attack");
            }}
          >
            <Text align={"center"} size={1}>A</Text>
          </Box>
          <Box
            onClick={() => {
              sortList("defense");
            }}
          >
            <Text align={"center"} size={1}>D</Text>
          </Box>
          <Box
            onClick={() => {
              sortList("health");
            }}
          >
            <Text align={"center"} size={1}>H</Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
});

export default CardListSort;
