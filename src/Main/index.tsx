import {Text} from '../components/Text';
import { useState } from 'react'

import {
  Container,
  CategoriesContainer, 
  MenuContainer, 
  Footer, 
  FooterContainer
} from './styles';

import { Header } from '../components/Header';
import { Categories } from '../components/Categories';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  
  function handleSaveTable(table: string) {
    setSelectedTable(table);
    setIsTableModalVisible(false)
  }

  function handleCancelOrder() {
    setSelectedTable('');
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
          <Menu></Menu>
        </MenuContainer>
        
      </Container>
      <Footer>
        <FooterContainer>
          {!selectedTable &&(
          <Button onPress={() => setIsTableModalVisible(true)}>
            Novo Pedido
            </Button>
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