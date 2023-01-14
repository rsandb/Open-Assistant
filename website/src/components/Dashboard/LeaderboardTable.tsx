import { Box, Divider, Grid, GridItem, GridItemProps, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { get } from "src/lib/api";
import useSWR from "swr";

import RankItem from "../RankItem";

export function LeaderboardTable() {
  const backgroundColor = useColorModeValue("white", "gray.800");
  const accentColor = useColorModeValue("gray.200", "gray.900");
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
    <Box className="h-fit col-span-3">
      <Box className="flex flex-col gap-4">
        <Box className="flex items-end justify-between">
          <Text className="text-2xl font-bold">Top 5 Contributors</Text>
          <Link as={NextLink} href="/leaderboard" _hover={{ textDecoration: "none" }}>
            <Text color="blue.400" className="text-sm font-bold">
              View All -&gt;
            </Text>
          </Link>
        </Box>
        <Box backgroundColor={backgroundColor} boxShadow="base" dropShadow={accentColor} borderRadius="xl">
          <Grid templateColumns="repeat(6, 1fr)" bg={backgroundColor} borderRadius="xl" shadow="base" p="4" gap="4">
            <GridItem colSpan={6} display="grid" gridTemplateColumns="repeat(6, 1fr)" p="2">
              {filter.map((item, index) => (
                <GridItem key={index} display="flex" {...item.GridItemProps}>
                  <Box key={index} display="flex" alignItems="center" gap="2" width="fit-content" borderRadius="md">
                    <Text fontSize="sm" fontWeight="bold" textTransform="uppercase">
                      {item.title}
                    </Text>
                  </Box>
                </GridItem>
              ))}
            </GridItem>
            <GridItem colSpan={6}>
              <Divider />
            </GridItem>
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
      </Box>
    </Box>
  );
}
