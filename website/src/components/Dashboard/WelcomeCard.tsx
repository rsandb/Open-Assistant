import { Box, Card, CardBody, Divider, Text, useColorMode } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export function WelcomeCard() {
  const { colorMode } = useColorMode();
  const backgroundColor = colorMode === "light" ? "white" : "gray.700";
  const titleColor = colorMode === "light" ? "blue.500" : "blue.300";

  const { data: session } = useSession();

  if (!session) {
    return <></>;
  }
  if (session && session.user && session.user.isNew)
    return (
      <>
        <Box
          bgGradient="linear(to-r, blue.300, purple.500)"
          borderRadius="xl"
          p="1px"
          shadow="base"
          position="relative"
        >
          <Card>
            <CardBody>
              <Box pb="2">
                <Text variant="h1" color={titleColor}>
                  Welcome, {session.user.name || "Contributor"}!
                </Text>
              </Box>

              <Box>
                <Text>
                  Open Assistant is an open-source AI assistant that uses and trains advanced language models to
                  understand and respond to humans.
                </Text>
                <Divider my="4" />
                <Text>Complete tasks to help train the model and earn points.</Text>
              </Box>
            </CardBody>
          </Card>
        </Box>
      </>
    );
}
