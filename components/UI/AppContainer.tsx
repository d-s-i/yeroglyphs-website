import styles from "./AppContainer.module.css";

interface Props {
    children: React.ReactNode;
}

function AppContainer(props: Props) {
    return(
        <div className={styles["app-container"]} >{props.children}</div>
    );
}

export default AppContainer;