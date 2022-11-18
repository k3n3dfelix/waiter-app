import {Text} from '../components/Text';

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

export function Main() {
  return(
    <>
      <Container>
        <Header/>

        <CategoriesContainer>
          <Categories></Categories>
        </CategoriesContainer>
        <MenuContainer>
          <Menu></Menu>
        </MenuContainer>
        
      </Container>
      <Footer>
        <FooterContainer></FooterContainer>
      </Footer>
    </>
    
  );
}