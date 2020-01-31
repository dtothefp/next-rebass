import { memo } from 'react';
import { sizing, flexbox, positions, spacing } from '@material-ui/system';
import styled from 'styled-components';

const FlexForm = styled.form`
  display: flex;
  ${flexbox}
`;

const InputContainer = styled.div`
  position: relative;
  ${positions}
  ${sizing}
`;

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  ${positions}
`;

const EventName = styled.p`
  ${spacing}
`;

export default memo(function Item({
  eventName,
  name,
  destination,
  disabled,
  handleChange,
  handleSubmit
}) {
  return (
    <FlexForm onSubmit={handleSubmit}>
      <div>
        <EventName m={0}>{eventName}</EventName>
      </div>
      <InputContainer width="30%">
        <label>{name}</label>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer width="50%">
        <label>{destination}</label>
        <Input
          type="text"
          name="destination"
          value={destination}
          onChange={handleChange}
        />
      </InputContainer>
      <div>
        <button>Update</button>
      </div>
    </FlexForm>
  );
});
