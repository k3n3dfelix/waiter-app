import { useState } from 'react'

import {
  Container,
  CategoriesContainer, 
  MenuContainer, 
  Footer, 
  FooterContainer
} from './styles';

import {Text} from '../components/Text';
import { Header } from '../components/Header';
import { Categories } from '../components/Categories';
import { Menu } from '../components/Menu';
import { Cart} from '../components/Cart';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal';

import { CartItem } from '../types/CartItem';
import { products } from '../mocks/products';
import { Product } from '../types/product';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItens, setCartItens] = useState<CartItem[]>([
    // { 
    //   quantity:1,
    //   product: products[0],
    // },
    // {
    //   quantity:1,
    //   product: products[0],
    // },
  ]);
  
  function handleSaveTable(table: string) {
    setSelectedTable(table);
    setIsTableModalVisible(false)
  }

  function handleCancelOrder() {
    setSelectedTable('');
  }

  function handleAddToCart(product: Product){
    alert(product.name);
  }
  return(
    <>
      <Container>
        <Header 
          selectedTable={selectedTable}
          onCancelOrder={handleCancelOrder}
        />

        <CategoriesContainer>
          <Categories></Categories>
        </CategoriesContainer>
        <MenuContainer>
          <Menu
            onAddToCart={handleAddToCart}
          ></Menu>
        </MenuContainer>
        
      </Container>
      <Footer>
        <FooterContainer>
          {!selectedTable &&(
          <Button onPress={() => setIsTableModalVisible(true)}>
            Novo Pedido
            </Button>
          )}
          {selectedTable && (
            <Cart cartItens={cartItens}></Cart>
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