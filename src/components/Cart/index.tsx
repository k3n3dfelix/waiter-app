import { FlatList, TouchableOpacity } from 'react-native';

import { Button } from '../Button';
import { CartItem } from '../../types/CartItem';
import { formatCurrency } from '../../utils/formatCurrency';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';

import { Text } from '../Text';
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
}

export function Cart({ cartItens } : CartProps){
  return(
    <>
      {cartItens.length > 0 && (
        <FlatList
          data={cartItens}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{  marginBottom: 20, maxHeight: 200}}
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
                <TouchableOpacity style={{ marginRight: 24}}>
                  <PlusCircle/>
                </TouchableOpacity>
                <TouchableOpacity>
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
              <Text size={20} weight="600">{formatCurrency(120)}</Text>
              </>
            ) : (
              <Text color="#999">Seu carrinho esta vazio</Text>
            )}
          </TotalContainer>

          <Button 
            onPress={() => alert('Confirmar Pedido')}
            disabled={cartItens.length === 0}
          >
            Confirmar Pedido
          </Button>
      </Summary>
    </>
    
  );
}