import { CloseButton, Flex, Link, Select, useColorModeValue } from '@chakra-ui/react'
import { PriceTag } from './PriceTag'
import { CartProductMeta } from './CartProductMeta'
import { useCartContext } from "../../context/cartContext";

const QuantitySelect = (props) => {
  const {stock} = props;
  return (
   
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
      {...props}
    >
      {[...Array(stock).keys()].map((_, i) => (
        <option key={i} value={i + 1}>
          {i + 1}
        </option>
      ))}

    </Select>
  )
}

export const CartItem = (props) => {
  const { cartItems, getItemQuantity, addToCart,decreaseItemQuantity,removeFromCart, totalPrice,changeItemQuantity } = useCartContext();

  const {
    id,
    title,
    description,
    amount,
    image,
    currency,
    price,
    stock
   
    
  } = props
  return (
    <Flex
      direction={{
        base: 'column',
        md: 'row',
      }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        name={title}
        description={description}
        image={image}

      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: 'none',
          md: 'flex',
        }}
        
      >
        <QuantitySelect
          value={amount}
          onChange={(e) => {
            changeItemQuantity(id,e.target.value)
          }}
          stock = {stock}
        />
        <PriceTag price={price} currency={'LKR'} />
        <CloseButton aria-label={`Delete ${name} from cart`} onClick={()=>removeFromCart(id)} />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: 'flex',
          md: 'none',
        }}
      >
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <QuantitySelect
          value={amount}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value)
          }}
        />
        <PriceTag price={price} currency={currency} />
      </Flex>
    </Flex>
  )
}