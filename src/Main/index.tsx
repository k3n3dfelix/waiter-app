import { useState } from 'react'
import { ActivityIndicator } from 'react-native';
import {
  Container,
  CategoriesContainer, 
  MenuContainer, 
  Footer, 
  FooterContainer,
  CenteredContainer
} from './styles';

import {Text} from '../components/Text';
import { Header } from '../components/Header';
import { Categories } from '../components/Categories';
import { Menu } from '../components/Menu';
import { Cart} from '../components/Cart';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal';

import { CartItem } from '../types/CartItem';
import { productss  } from '../mocks/products';
import { Product } from '../types/product';
import { Empty } from '../components/Icons/Empty';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItens, setCartItens] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [products] = useState<Product[]>(productss);
  
  function handleSaveTable(table: string) {
    setSelectedTable(table);
    setIsTableModalVisible(false)
  }

  function handleResetOrder() {
    setCartItens([]);
    setSelectedTable('');
  }

  function handleAddToCart(product: Product){
    if(!selectedTable) {
      setIsTableModalVisible(true);
    }
    setCartItens((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);

      if(itemIndex < 0){
        return prevState.concat({
          quantity:1,
          product,
        });
      }

      const newCartItens = [...prevState];
      newCartItens[itemIndex] = {
        ...newCartItens[itemIndex],
        quantity: newCartItens[itemIndex].quantity + 1,
      };

      return newCartItens;
    });
  }

  function handleDecrementCartItem(product: Product){
    setCartItens((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);

      const item = prevState[itemIndex];

      const newCartItens = [...prevState];

      if(item.quantity === 1){
        newCartItens.splice(itemIndex, 1);

        return newCartItens;
      }

      
      newCartItens[itemIndex] = {
        ...newCartItens[itemIndex],
        quantity: newCartItens[itemIndex].quantity - 1,
      };

      return newCartItens;

  });
}
  return(
    <>
      <Container>
        <Header 
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />
        {isLoading && (
          <CenteredContainer>
              <ActivityIndicator color="#D73035" size="large"/>
          </CenteredContainer>
        )}
        {!isLoading &&(
          <>
            <CategoriesContainer>
              <Categories></Categories>
            </CategoriesContainer>
            {products.length > 0 ? (
              <MenuContainer>
                <Menu
                  onAddToCart={handleAddToCart}
                  products={products}
                ></Menu>
              </MenuContainer>
            ) : (
              <CenteredContainer>
                <Empty></Empty>
                <Text color="#666" style={{ marginTop: 24}}>Nenhum produto foi encontrado!</Text>
              </CenteredContainer>
            )}
          </>
        )}
        
      </Container>
      <Footer>
        <FooterContainer>
          {!selectedTable &&(
          <Button 
            onPress={() => setIsTableModalVisible(true)}
            disabled={isLoading}
          >
            Novo Pedido
            </Button>
          )}
          {selectedTable && (
            <Cart 
            cartItens={cartItens}
            onAdd={handleAddToCart}
            onDecrement={handleDecrementCartItem}
            onConfirmOrder={handleResetOrder}
            />

           
          )}
        </FooterContainer>
      </Footer>

      <TableModal 
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      ></TableModal>
    </>
    
  );
}