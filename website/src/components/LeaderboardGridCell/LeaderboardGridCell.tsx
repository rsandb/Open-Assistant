import {
  Avatar,
  Box,
  Button,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { get } from "src/lib/api";
import useSWR from "swr";

/**
 * Presents a grid of leaderboard entries with more detailed information.
 */
const LeaderboardGridCell = () => {
  const { data: leaderboardEntries } = useSWR("/api/leaderboard", get);
  const bgColor = useColorModeValue("gray.50", "#1D2330");
  const backgroundColor = useColorModeValue("white", "gray.800");
  const columns = `repeat(${FILTER.length}, 1fr)`;

  return (
    <>
      <Grid gridTemplateColumns="repeat(6, 1fr)">
        <GridItem
          colSpan={6}
          bg={backgroundColor}
          display="grid"
          gridTemplateColumns="repeat(6, 1fr)"
          p="4"
          borderRadius="xl"
          mb="4"
          shadow="base"
        >
          {FILTER.map(({ title, GridItemProps }, index) => (
            <GridItem key={index} columns={columns} display="flex" {...GridItemProps}>
              <Menu closeOnSelect={false}>
                <MenuButton as={Button} bg="none">
                  <Box display="flex" gap="2">
                    <Box>
                      <Text>{title}</Text>
                    </Box>
                    <Box display={["none", "none", "inline-flex"]} alignItems="center">
                      <FiChevronDown />
                    </Box>
                  </Box>
                </MenuButton>

                <MenuList minWidth="240px">
                  <MenuOptionGroup defaultValue="asc" title="Order" type="radio">
                    <MenuItemOption value="asc">Ascending</MenuItemOption>
                    <MenuItemOption value="desc">Descending</MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </GridItem>
          ))}
        </GridItem>
        <GridItem colSpan={6} backgroundColor={backgroundColor} boxShadow="base" borderRadius="xl" p="4">
          {leaderboardEntries?.map(({ display_name, ranking, score }, index) => (
            <GridItem
              key={index}
              colSpan={6}
              display="grid"
              gridTemplateColumns="repeat(6, 1fr)"
              alignItems="center"
              borderRadius="lg"
              p="2"
              backgroundColor={ranking % 2 === 0 ? bgColor : null}
            >
              <GridItem colSpan={3} overflow="hidden">
                <Box display="flex" alignItems="center" gap="2">
                  <Avatar size="xs" />
                  <Text>{display_name}</Text>

                  {/* instead of checking if hasStreak is true, just use if streak > 3 = badge */}
                  {/* 
            {props.streak ? (
              <Badge display={["none", "none", "block"]} colorScheme="purple">
                {props.streakLength}-Day Streak
              </Badge>
            ) : null}
            {props.streak ? (
              <Badge display={["block", "block", "none"]} colorScheme="purple">
                {props.streakLength}
              </Badge>
            ) : null} */}
                </Box>
              </GridItem>
              <GridItem display="flex" justifyContent="center">
                <GridItem width="14" position="relative" display="flex" justifyContent="center" alignItems="center">
                  {/* <Box position="absolute" left="0">
              {props.rankUp ? <FiChevronUp color="green" /> : null}
              {props.rankDown ? <FiChevronDown color="red" /> : null}
            </Box> */}
                  <Text>{ranking}</Text>
                </GridItem>
              </GridItem>
              <GridItem display="flex" justifyContent="center">
                <Text>{score}</Text>
              </GridItem>
              <GridItem display="flex" justifyContent="center">
                {/* <Text fontSize="xl">{props.medal}</Text> */}
              </GridItem>
              {/*
            <GridItem display="flex" justifyContent="center">
              <Text fontSize="xl">{item.medal}</Text>
            </GridItem>
              */}
            </GridItem>
          ))}
        </GridItem>
      </Grid>
    </>
  );
};

/**
 * Specifies the table headers in the grid.
 */
const FILTER = [
  {
    title: "User",
    isActive: false,
    GridItemProps: { justifyContent: "start", colSpan: 3 },
  },
  {
    title: "Rank",
    isActive: false,
    GridItemProps: { justifyContent: "center" },
  },
  {
    title: "Score",
    isActive: false,
    GridItemProps: { justifyContent: "center" },
  },
  /*
  {
    title: "Medal",
    isActive: false,
    GridItemProps: { justifyContent: "center" },
  },
   */
];

export { LeaderboardGridCell };
