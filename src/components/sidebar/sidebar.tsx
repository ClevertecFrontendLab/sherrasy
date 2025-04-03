import { Flex, Spacer } from '@chakra-ui/react';

function Sidebar() {
    return (
        <Flex>
            <div>Главная</div>
            <div>Поиск</div>
            <div>Записать</div>
            <div>Профиль</div>
            <Spacer />
            <div>Button</div>
        </Flex>
    );
}
export default Sidebar;
