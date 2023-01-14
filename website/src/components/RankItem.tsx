import { Avatar, Badge, Box, GridItem, Text, useColorModeValue } from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

type RankItemProps = {
  medal: string;
  rank: number;
  rankUp: boolean;
  rankDown: boolean;
  score: number;
  streak: boolean;
  streakLength: number;
  username: string;
};

const RankItem = (props: RankItemProps) => {
  const bgColor = useColorModeValue("gray.50", "#1D2330");
  return (
    <>
      <GridItem
        colSpan={6}
        display="grid"
        gridTemplateColumns="repeat(6, 1fr)"
        alignItems="center"
        borderRadius="lg"
        p="2"
        backgroundColor={props.rank % 2 === 0 ? bgColor : null}
      >
        <GridItem colSpan={3} overflow="hidden">
          <Box display="flex" alignItems="center" gap="2">
            <Avatar size="xs" />
            <Text>{props.username}</Text>
            {props.streak ? (
              <Badge display={["none", "none", "block"]} colorScheme="purple">
                {props.streakLength}-Day Streak
              </Badge>
            ) : null}
            {props.streak ? (
              <Badge display={["block", "block", "none"]} colorScheme="purple">
                {props.streakLength}
              </Badge>
            ) : null}
          </Box>
        </GridItem>
        <GridItem display="flex" justifyContent="center">
          <GridItem width="14" position="relative" display="flex" justifyContent="center" alignItems="center">
            <Box position="absolute" left="0">
              {props.rankUp ? <FiChevronUp color="green" /> : null}
              {props.rankDown ? <FiChevronDown color="red" /> : null}
            </Box>
            <Text>{props.rank}</Text>
          </GridItem>
        </GridItem>
        <GridItem display="flex" justifyContent="center">
          <Text>{props.score}</Text>
        </GridItem>
        <GridItem display="flex" justifyContent="center">
          <Text fontSize="xl">{props.medal}</Text>
        </GridItem>
      </GridItem>
    </>
  );
};

export default RankItem;
