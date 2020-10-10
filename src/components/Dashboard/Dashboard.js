import React, { useState, useEffect } from "react";
import { getMe } from "../../WebAPI";
import { useHistory } from "react-router-dom";

import { Box, Flex, Text, Button } from "@chakra-ui/core";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const history = useHistory();

  const redirectBack = () => {
    localStorage.removeItem("token");
    return history.push("/sign-in");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return redirectBack();
    }

    getMe()
      .then((data) => {
        if (!data.ok) {
          return redirectBack();
        }

        setUsername(data.data.username);
      })
      .catch((err) => {
        return redirectBack();
      });
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    redirectBack();
  };

  const handleToSignIn = () => {
    history.push("/sign-in");
  };

  return (
    <Flex
      bg="gray.700"
      w="100%"
      h="100vh"
      color="white"
      justify="center"
      align="center"
    >
      <Box
        w="400px"
        p={8}
        border="1px"
        borderRadius="8px"
        borderColor="teal.600"
      >
        <Text textAlign="center" fontSize="5xl" mb={8}>
          Hello! {username}
        </Text>
        <Button
          mt={8}
          ml="auto"
          mr="auto"
          d="block"
          variantColor="teal"
          onClick={handleLogout}
        >
          Logout
        </Button>
        <Button
          mt={8}
          ml="auto"
          mr="auto"
          d="block"
          variantColor="teal"
          onClick={handleToSignIn}
        >
          Sign-in page
        </Button>
      </Box>
    </Flex>
  );
}
