import { FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import { Button } from '../Button';
import { Text } from '../Text';

import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/product';

import { formatCurrency } from '../../utils/formatCurrency';

import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';

import { OrderConfirmModal } from '../OrderConfirmedModal';

import { 
  Container,
  Item,
  ProductContainer,
  Actions,
  Image,
  QuantityContainer,
  ProductDetails,
  Summary,
  TotalContainer,
} from './styles';





interface CartProps{
  cartItens: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmOrder: () => void;
}

export function Cart({ cartItens, onAdd, onDecrement, onConfirmOrder} : CartProps){

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const total = cartItens.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0)

  function handleConfirmOrder() {
      setIsModalVisible(true)
  }

  function handleOk(){
    onConfirmOrder();
    setIsModalVisible(true)
  }

  return(
    <>
      {cartItens.length > 0 && (
        <FlatList
          data={cartItens}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{  marginBottom: 20, maxHeight: 135}}
          renderItem={({item: cartItem}) => (
            <Item>
              <ProductContainer>
                <Image
                  source={require('../../../assets/food2.jpg')}
                />
                <QuantityContainer>
                  <Text size={14} color="#666">{cartItem.quantity } x</Text>
                </QuantityContainer>
                <ProductDetails>
                  <Text size={14} weight="600">{cartItem.product.name}</Text>
                  <Text size={14} color="#666" style={{ marginTop: 4}}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity 
                  style={{ marginRight: 24}}
                  onPress={() => onAdd(cartItem.product)}
                >
                  <PlusCircle/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle/>
                </TouchableOpacity>
              </Actions>
            </Item>
        )}
        />
      )}

      <Summary>
          <TotalContainer>
            {cartItens.length > 0 ? (
              <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">{formatCurrency(total)}</Text>
              </>
            ) : (
              <Text color="#999">Seu carrinho esta vazio</Text>
            )}
          </TotalContainer>

          <Button 
            onPress={handleConfirmOrder}
            disabled={cartItens.length === 0}
            loading={isLoading}
          >
            Confirmar Pedido
          </Button>
      </Summary>

      <OrderConfirmModal 
        visible={isModalVisible}
        onOk={handleOk}
      />
    </>
    
  );
}