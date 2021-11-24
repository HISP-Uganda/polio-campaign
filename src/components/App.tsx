import { Box } from '@chakra-ui/react'
import { useStore } from 'effector-react';
import { changeCurrentUser } from '../stores/Events';
import { useLoader } from '../stores/Queries';
import { $store } from '../stores/Store';
const App = () => {
    const store = useStore($store);
    const { isLoading, isError, isSuccess, error, data } = useLoader();
    return (
        <Box w="100vw" h="calc(100vh - 48px)">
            <Box>{store.currentUser}</Box><button onClick={() => changeCurrentUser("Sammuel")}>Change Current User</button>
            {isLoading && <Box>Loading...</Box>}
            {isSuccess && <Box><pre>{JSON.stringify(data, null, 2)}</pre></Box>}
            {isError && <Box>{error.message}</Box>}
        </Box>
    )
}

export default App
