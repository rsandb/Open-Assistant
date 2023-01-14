import {
  Box,
  Button,
  Grid,
  GridItem,
  GridItemProps,
  Heading,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { FiChevronDown } from "react-icons/fi";
import { getDashboardLayout } from "src/components/Layout";
import RankItem from "src/components/RankItem";
import { get } from "src/lib/api";
import useSWR from "swr";

const Leaderboard = () => {
  const backgroundColor = useColorModeValue("white", "gray.800");
  const { data: leaderboardEntries } = useSWR("/api/leaderboard", get);

  const GridProps: GridItemProps = {
    justifyContent: "start",
  };
  const filter = [
    {
      title: "User",
      GridItemProps: { ...GridProps, justifyContent: "start", colSpan: 3 },
    },
    {
      title: "Rank",
      GridItemProps: { ...GridProps, justifyContent: "center" },
    },
    {
      title: "Score",
      GridItemProps: { ...GridProps, justifyContent: "center" },
    },
    {
      title: "Medal",
      GridItemProps: { ...GridProps, justifyContent: "center" },
    },
  ];

  return (
    <>
      <Head>
        <title>Leaderboard - Open Assistant</title>
        <meta name="description" content="Leaderboard Rankings" charSet="UTF-8" />
      </Head>
      <Box display="flex" flexDirection="column">
        <Heading fontSize="2xl" fontWeight="bold" pb="4">
          Leaderboard
        </Heading>
        <Grid>
          <GridItem
            colSpan={6}
            bg={backgroundColor}
            display="grid"
            gridTemplateColumns="repeat(6, 1fr)"
            p="4"
            borderRadius="lg"
            mb="4"
            shadow="base"
          >
            {filter.map((item, index) => (
              <GridItem key={index} display="flex" {...item.GridItemProps}>
                <Menu closeOnSelect={false}>
                  <MenuButton as={Button} bg="none">
                    <Box display="flex" gap="2">
                      <Box>
                        <Text>{item.title}</Text>
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
        </Grid>
        <Grid templateColumns="repeat(6, 1fr)" bg={backgroundColor} borderRadius="xl" shadow="base" p="4" gap="4">
          {leaderboardEntries.map(({ display_name, ranking, score, streak }, idx) => (
            <RankItem
              key={idx}
              username={display_name}
              rank={ranking}
              rankUp={true}
              rankDown={false}
              score={score}
              streak={streak}
              streakLength={10}
              medal="test"
            />
          ))}
        </Grid>
      </Box>
    </>
  );
};

Leaderboard.getLayout = getDashboardLayout;

export default Leaderboard;
