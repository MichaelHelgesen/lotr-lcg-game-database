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
  const { cardList, setCardList, value, sortParameter, setSortParameter, replaceSpecialCharacters } = props;

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
          console.log("quantity")
          nameA = value.map(obj => obj._key).indexOf(a._id) != -1  ? value[value.map(obj => obj._key).indexOf(a._id)].quantity : undefined;
          nameB = value.map(obj => obj._key).indexOf(b._id) != -1  ? value[value.map(obj => obj._key).indexOf(b._id)].quantity : undefined;
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
          nameA = replaceSpecialCharacters(a[sortParameter.param].toLowerCase());
          nameB = replaceSpecialCharacters(b[sortParameter.param].toLowerCase());
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
  }, [sortParameter])


  const sortList = (sortParam) => {

    //setOrder((prevState) => !prevState);
    if (sortParameter.param == "") {
      setSortParameter(prevState => {
        return {
          ...prevState,
          param: sortParam
        }
      })
    } else if (sortParameter.param != sortParam) {
      setSortParameter(prevState => {
        return {
          state: true,
          param: sortParam
        }
      })
    } else {
      setSortParameter(prevState => {
        return {
          ...prevState,
          state: !prevState.state
        }
      })
    }


  };

  return (
    <Flex>
      <Box
        flex="1"
        onClick={() => {
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
