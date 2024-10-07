import Logo from "./Navbar/Logo";
import classes from "../styles/SideBar.module.css";
import { Group, useMantineTheme } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';


export default function SideBar() {
    const { colorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();

    return (
        <div
        className={classes.container}
        style={{ backgroundColor: colorScheme === 'dark' ? theme.colors.darkmode[1] : 'white', 
            borderColor: colorScheme === 'dark' ? theme.colors.darkmode[3] : theme.colors.dark[1] }}
        >
            <Logo />
            <Group>
                <ul>
                    <li>Home</li>
                    <li>Favorites</li>
                </ul>
            </Group>
        </div>
    );
}