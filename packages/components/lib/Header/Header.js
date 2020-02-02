import { Text, Box, Flex, Image } from 'rebass';
import icons from '@css/icons';
import styled from '@emotion/styled';

const HeaderLogo = styled(icons.logo)`
  width: 50px;
`;

const LogoText = ({children}) => (
  <Text fontFamily="menlo" fontSize={3}>{children}</Text>
);

const CTA = () => (
  <Box>
    <Text>

    </Text>
  </Box>
);

export default () => (
    <Flex
      bg="muted"
      p={3}
    >
      <Image
        width="150px"
        src="https://1bnjwh491hvk2hz4dz3av3ku-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/logo.png"
      />
    </Flex>
);
