import style from './App.module.css';
import Sidebar from "./components/Sidebar.tsx";
import Header from "./components/Header.tsx";
import HeaderBar from "./components/HeaderBar.tsx";
import Disk from "@/components/Disk.tsx";

const App = () => (
    <>
        <div className={style.container}>
            <div className={style.sidebar}>
                <Sidebar></Sidebar>
            </div>
            <div className={style.main}>
                <Header></Header>
                <HeaderBar></HeaderBar>
                <Disk></Disk>
            </div>
        </div>
    </>
);

export default App
