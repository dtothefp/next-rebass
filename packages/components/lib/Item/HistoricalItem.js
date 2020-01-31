import { memo } from 'react';
import { flexbox, spacing } from '@material-ui/system';
import styled from 'styled-components';

const FlexContainer = styled.form`
  display: flex;
  ${flexbox}
`;

const Item = styled.p`
  margin: 0;
  ${spacing}
`;

export default memo(function Item({
  eventName,
  name,
  destination,
}) {
  return (
    <FlexContainer>
      <div>
        <Item>{eventName}</Item>
      </div>
      <div>
        <Item>{name}</Item>
      </div>
      <div>
        <Item>{destination}</Item>
      </div>
    </FlexContainer>
  );
});
