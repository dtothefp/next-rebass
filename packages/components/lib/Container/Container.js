import { flexbox } from '@material-ui/system';
import styled from 'styled-components';
import FilterBox from '../FilterBox/FilterBox';
import Items from '../Items/Items';

const AppContainer = styled.div`
  display: flex;
  ${flexbox}
`;

export default () => (
  <AppContainer>
    <FilterBox />
    <Items />
  </AppContainer>
);
