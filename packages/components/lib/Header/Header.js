import { Text, Box, Flex } from 'rebass';
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
  <>
    <Box
      p={3}
      width="100%"
    >
      <Flex>
        <LogoText>Cloud</LogoText>
        <Box
          sx={{position: 'relative'}}
          width="40px"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '-35px',
              left: '-4px'
            }}
          >
            <HeaderLogo />
          </Box>
        </Box>
        <LogoText>Kitchens</LogoText>
      </Flex>
    </Box>
    <Box
      bg="muted"
      p={4}
      pl={3}
    >
      <Text
        color="white"
        as="h2"
      >
        Smart Kitchens
      </Text>
      <Text
        color="white"
        as="p"
      >
        Commercial kitchens optimized for delivery
      </Text>
    </Box>
  </>
);
