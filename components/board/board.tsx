// External imports
import { Flex, Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

// Component imports
import { BoardProps, HLineProps, VLineProps } from "./types";

// Project imports
import Cross from "../svg/cross";
import Circle from "../svg/circle";

const HLine = (props: HLineProps) => {
   return (
      <Box
         bg="brand.tertiary"
         h="22rem"
         w="0.5rem"
         position="absolute"
         left={props.left}
         top="2rem"
      />
   );
};
const VLine = (props: VLineProps) => {
   return (
      <Box
         bg="brand.tertiary"
         h="0.5rem"
         w="22rem"
         position="absolute"
         top={props.top}
         left="2rem"
      />
   );
};

const winPatterns = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];

enum CellState {
   Empty,
   X,
   O,
}

const Board = (props: BoardProps) => {
   const [cellValues, setCellValues] = useState<CellState[]>(
      Array(9).fill(CellState.Empty)
   );
   const [winner, setWinner] = useState("");
   const [gameOver, setGameOver] = useState(false);
   const [playerXTurn, setPlayerXTurn] = useState(true);

   const hasWon = () => {
      const symbol = playerXTurn ? CellState.X : CellState.O;
      const indexes = cellValues
         .map((value, index) => (value === symbol ? index : -1))
         .filter((index) => index > -1);
      console.log(indexes);

      winPatterns.forEach((pattern) => {
         if (pattern.every((index) => indexes.includes(index))) {
            return true;
         }
      });
      return false;
   };

   const isDraw = () => {
      if (cellValues.every((value) => value !== CellState.Empty) && !hasWon()) {
         setGameOver(true);
         console.log("draw");
         return true;
      }
      console.log("no draw");
      return false;
   };

   const handleCellClick = (index: number) => {
      if (cellValues[index] !== CellState.Empty) return;
      const symbolState = playerXTurn ? CellState.X : CellState.O;
      let newCellValues = [...cellValues];
      newCellValues[index] = symbolState;
      setCellValues(newCellValues);
      console.log(newCellValues);
      setPlayerXTurn(!playerXTurn);
   };

   useEffect(() => {
      if (hasWon()) {
         setWinner(playerXTurn ? "X" : "O");
         setGameOver(true);
      } else if (isDraw()) {
         setGameOver(true);
         setWinner("draw");
      } else {
         console.log("no win or draw");
      }
   }),
      [cellValues];

   useEffect(() => {
      console.log("gameOver");
   }, [gameOver]);

   const symbolForCell = (cellValue: CellState) => {
      switch (cellValue) {
         case CellState.Empty:
            return "";
         case CellState.X:
            return <Cross w="5rem" h="5rem" />;
         case CellState.O:
            return <Circle w="5rem" h="5rem" />;
      }
   };

   const handleReset = () => {
      setCellValues(Array(9).fill(CellState.Empty));
      setPlayerXTurn(true);
   };

   return (
      <Flex
         padding="2rem"
         gap="0.5rem"
         flexDirection="row"
         minW="26rem"
         maxW="26rem"
         minH="26rem"
         maxH="26rem"
         wrap={"wrap"}
         position="relative"
         borderRadius="2vh"
         overflow="hidden"
         bg="brand.secondary"
         boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
      >
         <HLine left="9rem" />
         <HLine left="16.5rem" />
         <VLine top="9rem" />
         <VLine top="16.5rem" />
         {cellValues.map((cellValue, index) => (
            <Flex
               // flexDirection="column"
               justifyContent="center"
               alignItems="center"
               key={index}
               bg="brand.secondary"
               w="7rem"
               h="7rem"
               onClick={() => {
                  {
                     !gameOver ? handleCellClick(index) : "";
                  }
               }}
            >
               {symbolForCell(cellValue)}
            </Flex>
         ))}
      </Flex>
   );
};

Board.defaultProps = {
   children: null,
};

export default Board;
