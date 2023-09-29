import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Text,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  CardFooter,
  IconButton,
  Divider,
  CardHeader,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/cartContext";
import { RxCross2 } from "react-icons/rx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [comments, setComments] = useState("");

  const { cartItems, totalPrice } = useCartContext();
  const [message, setMessage] = useState("");

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/orders/checkout/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/orders/checkout/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <>
      <Box
        maxW={{
          base: "3xl",
          lg: "7xl",
        }}
        mx="auto"
        px={{
          base: "4",
          md: "8",
          lg: "12",
        }}
        py={{
          base: "6",
          md: "8",
          lg: "12",
        }}
        height={"100%"}
        m={"auto"}
        mt={10}
        w="80%"
        borderRadius="md"
        boxShadow="sm"
        bgGradient="linear(to top left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))"
        // filter="blur(8px)"
        backdropFilter="blur(8px)"
        p={10}
      >
        <Heading ml={2} mb={5}>
          Checkout
        </Heading>
        <Flex>
          <Flex direction={"column"} w={"60%"}>
            <Box
              border={"0.5px solid"}
              borderColor={"blue.200"}
              borderRadius={5}
              padding={5}
            >
              <Text>
                Already have an account ? Please Log in to fill out the form
                automatically
              </Text>

              <Link to="/login">
                <Button colorScheme="blue" variant={"link"}>
                  Login
                </Button>
              </Link>
            </Box>
            <Box
              border={"0.5px solid"}
              borderColor={"blue.200"}
              borderRadius={5}
              padding={5}
              mt={2}
            >
              <Heading fontSize={"20"}> Shipping and Billing Details</Heading>
              <form>
                <Flex mt={5}>
                  <FormControl mr={3}>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input
                      id="first-name"
                      placeholder="First Name"
                      variant={"filled"}
                      bg={"white"}
                      border={"1px solid"}
                      borderColor={"gray.300"}
                      shadow={"sm"}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <Input
                      id="last-name"
                      placeholder="Last Name"
                      variant={"filled"}
                      bg={"white"}
                      border={"1px solid"}
                      borderColor={"gray.300"}
                      shadow={"sm"}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
                </Flex>
                <FormControl mt={5}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    placeholder="Email"
                    variant={"filled"}
                    bg={"white"}
                    border={"1px solid"}
                    borderColor={"gray.300"}
                    shadow={"sm"}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={5}>
                  <FormLabel htmlFor="address">Address</FormLabel>
                  <Input
                    id="address"
                    placeholder="Address"
                    variant={"filled"}
                    bg={"white"}
                    border={"1px solid"}
                    borderColor={"gray.300"}
                    shadow={"sm"}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
                <Flex mt={5}>
                  <FormControl mr={3}>
                    <FormLabel htmlFor="city">City</FormLabel>
                    <Input
                      id="city"
                      placeholder="City"
                      variant={"filled"}
                      bg={"white"}
                      border={"1px solid"}
                      borderColor={"gray.300"}
                      shadow={"sm"}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="zip">Zip Code</FormLabel>
                    <Input
                      id="zip"
                      placeholder="Zip"
                      variant={"filled"}
                      bg={"white"}
                      border={"1px solid"}
                      borderColor={"gray.300"}
                      shadow={"sm"}
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </FormControl>
                </Flex>
                <FormControl mt={5}>
                  <FormLabel htmlFor="phone">Phone</FormLabel>
                  <Input
                    id="phone"
                    placeholder="Phone"
                    variant={"filled"}
                    bg={"white"}
                    border={"1px solid"}
                    borderColor={"gray.300"}
                    shadow={"sm"}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={5}>
                  <FormLabel htmlFor="comments"> Order Comments</FormLabel>
                  <Textarea
                    id="comments"
                    placeholder="Comments"
                    variant={"filled"}
                    bg={"white"}
                    border={"1px solid"}
                    borderColor={"gray.300"}
                    shadow={"sm"}
                    onChange={(e) => setComments(e.target.value)}
                  />
                </FormControl>

                <FormControl mt={5}>
                  <Checkbox fontWeight={600}>
                    Create an account for later use
                  </Checkbox>
                </FormControl>
              </form>
            </Box>
          </Flex>

          <Box
            w={"40%"}
            border={"0.5px solid"}
            borderColor={"blue.200"}
            ml={2}
            p={2}
          >
            <Text fontWeight={"600"}>Order Summary</Text>
            {/*             
            <Card bg={"gray.100"} mt={2}>
              <CardBody>Book2</CardBody>
              <CardFooter
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                Quantity 
                <span>45</span>
                <IconButton color='red.600' variant={'outline'} aria-label="Delete" icon={<DeleteIcon />} />
              </CardFooter>
            </Card> */}
            {cartItems.map((item) => (
              <Card
                bgGradient={"linear(to-br, blue.300, blue.200)"}
                mt={2}
                size={"sm"}
                key={item.id}
              >
                <CardBody
                  fontWeight={"black"}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  {item.title}
                  <IconButton
                    color="black.600"
                    variant={"link"}
                    aria-label="Delete"
                    icon={<RxCross2 />}
                  />
                </CardBody>
                <CardFooter
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  Quantity : {item.amount}
                </CardFooter>
              </Card>
            ))}

            <Card
              bgGradient={"linear(to-br, purple.100, purple.200)"}
              mt={2}
              size={"sm"}
            >
              <CardHeader>
                <Button
                  size={"sm"}
                  variant={"link"}
                  color="purple"
                  m={"auto"}
                  borderRadius={20}
                >
                  Click to Calculate Shipping
                </Button>
              </CardHeader>
              <CardBody>
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mt={5}
                >
                  <Text fontSize={15} fontWeight={"bold"}>
                    Shipping
                  </Text>
                  <Text> Rs 450</Text>
                </Flex>
              </CardBody>
            </Card>

            {/* <StripeCheckout
              stripeKey="pk_test_51Nm7ypSHOI6b7OcrYkdkH1oLKWaX2h61UoNHGDsjm1J57F2CrvyFzFRypuRCaDAPOfsAxImA2ppEgZtxdq05OzId00RawFqiXZ"
              email={email}
              
              amount={totalPrice}
              name="BookShelf"
              currency="LKR"
              token={onToken}
             

            > */}
            {/* <Button
                colorScheme="purple"
                w={"100%"}
                mr={"auto"}
                mt={5}
                borderRadius={20}
              >
                Proceed To Payment
              </Button> */}
            <Divider mt={10} mb={5} />
            {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
            {/* </StripeCheckout> */}
          </Box>
        </Flex>
      </Box>
    </>
  );
};


const ProductDisplay = () => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>Stubborn Attachments</h3>
      <h5>$20.00</h5>
      </div>
    </div>
    <form action="http://localhost:3000/api/v1/checkout/create-payment-intent" method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);
export default Checkout;
