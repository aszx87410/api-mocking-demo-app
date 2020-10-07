import React, { useState } from "react";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              type="text"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
        </form>
      </Box>
    </Flex>
  );
}
