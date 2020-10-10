import React, { useState, useEffect } from "react";
import { login } from "../../WebAPI";
import { useHistory } from "react-router-dom";

import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/core";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      return history.push("/dashboard");
    }
  }, [history]);

  const handleToDashboard = () => {
    history.push("/dashboard");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      username,
      password,
    })
      .then((data) => {
        if (!data.ok) {
          return setError(true);
        }
        localStorage.setItem("token", data.token);
        history.push("/dashboard");
      })
      .catch((err) => {
        setError(true);
      });
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
          Sign In
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl isInvalid={!!error}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              type="text"
              placeholder="Username"
              id="username"
              value={username}
              onFocus={() => setError(false)}
              onChange={(e) => setUsername(e.target.value)}
              color="gray.800"
              errorBorderColor="red.400"
            />
          </FormControl>

          <FormControl mt={4} isInvalid={!!error}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onFocus={() => setError(false)}
              onChange={(e) => setPassword(e.target.value)}
              color="gray.800"
              errorBorderColor="red.400"
            />
            <FormErrorMessage color="red.300" fontSize="1em">
              帳號或是密碼輸入錯誤
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={8}
            ml="auto"
            mr="auto"
            d="block"
            variantColor="teal"
            type="submit"
          >
            Submit
          </Button>
          <Button
            mt={8}
            ml="auto"
            mr="auto"
            d="block"
            variantColor="teal"
            onClick={handleToDashboard}
          >
            Dashboard
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
