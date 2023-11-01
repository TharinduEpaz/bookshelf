import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Stack,
  Text,
  Input,
  ButtonGroup,
  Button,
  Textarea,
} from "@chakra-ui/react";
import React from "react";

export default function AddDonationPack() {
  const [packName, setName] = React.useState("");
  const [item, setItem] = React.useState("");
  const [stock, setStock] = React.useState("");
  const [description, setDescription] = React.useState("");
  
  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
        const body = {
            name: packName,
            donationItems: item,
            price: price,
            description: description,
            stock: stock
        }
    } catch (error) {
        console.error(error.message);
    }
  }

  return (
    <Box p={10}>
      <Text fontSize="3xl" fontWeight="bold" pb={10}>
        Add New Donation Pack
      </Text>
      <form onSubmit={onSubmitForm} encType="multipart/form-data">
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem colSpan={1}>
            <Stack>
              <FormControl mb={5}>
                <FormLabel fontWeight={"semibold"}>
                  Name of the Donation Pack *
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Name of the Donation Pack"
                  value={packName}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>

              <FormControl mb={5}>
                <FormLabel fontWeight={"semibold"}>Donation Items *</FormLabel>
                <Input
                  type="text"
                  placeholder="Items"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                />
              </FormControl>

              <FormControl mb={5}>
                <FormLabel fontWeight={"semibold"}>Price *</FormLabel>
                <Input
                  type="text"
                  placeholder="Items"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                />
              </FormControl>

              <FormControl mb={5}>
                <FormLabel fontWeight={"semibold"}>Stock *</FormLabel>
                <Input
                  type="int"
                  placeholder="Stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </FormControl>

              <FormControl mb={5}>
                <FormLabel fontWeight={"semibold"}>Description *</FormLabel>
                <Textarea
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
            </Stack>
          </GridItem>

          <GridItem colSpan={1}>
            <Stack>
              <FormControl>
                <FormLabel fontWeight={"semibold"}>Image *</FormLabel>
                <Input type="file" placeholder="Image" />
              </FormControl>

              <ButtonGroup justifyContent={"flex-end"}>
                <Button type="sumbit" colorScheme="blue" size={"sm"}>
                  Add
                </Button>
                <Button colorScheme="red" variant={"outline"} size={"sm"}>
                  Cancel
                </Button>
              </ButtonGroup>
            </Stack>
          </GridItem>
        </Grid>
      </form>
    </Box>
  );
}
