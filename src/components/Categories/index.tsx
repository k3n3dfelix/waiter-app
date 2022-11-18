
import { categories } from "../../mocks/categories";
import { Text } from "../Text";

import { Category,Icon} from './styles';

export function Categories() {
  return (
    categories.map((category) =>(
      <Category key={category._id}>
        <Icon>
          <Text>{category.icon}</Text>
        </Icon>
        <Text>{category.name}</Text>
      </Category>
   ))
  );
}