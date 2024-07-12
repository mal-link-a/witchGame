import { ChakraProvider } from "@chakra-ui/react";
import '@fontsource-variable/advent-pro';

import { Body } from "./ui/Body/Body";
import { theme } from './lib/'


function App() {
  return (
    <ChakraProvider theme={theme}>     
      <Body  />      
    </ChakraProvider>
  );
}

export default App;
