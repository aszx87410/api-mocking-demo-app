import React from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/core";

export default function SignInPage() {
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
        borderRadius="md"
        borderColor="teal.600"
      >
        <Text textAlign="center" fontSize="6xl" mb={8}>
          Sign In
        </Text>
        <form>
          <FormControl>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              type="email"
              id="email"
              aria-describedby="email-helper-text"
              color="gray.800"
            />
            <FormHelperText id="email-helper-text" color="grey.200">
              &nbsp;
            </FormHelperText>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              aria-describedby="password-helper-text"
              color="gray.800"
            />
            <FormHelperText id="password-helper-text" color="grey.200">
              &nbsp;
            </FormHelperText>
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
