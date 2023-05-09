import React from 'react';
import SideNavBar from '../sidebar/sidebar';
import Navbar from '../navbar/navbar';
import { Row, Col } from 'react-bootstrap';
import Main from '../main/main';
import '../sidebar/sidebar.scss';


export default function Layout({ children }) {
    // const dispatch = useDispatch();
    // const [tempid, setTempid] = useState('');

    // const [updateParams, setUpdateParams] = useState({
    //     resource: 'api/themes',
    //     resourceId: tempid,
    // });

    // useEffect(() => {
    //     setUpdateParams({
    //         resource: 'api/themes',
    //     });
    // }, []);

    // const colorTheme = async () => {
    //     try {
    //         const themeColor = await api.themes.getList(updateParams);
    //         const updatedThemeColor = {
    //             header_theme: themeColor.data.data[0].header_theme,
    //             sidebar_theme: themeColor.data.data[0].sidebar_theme,
    //             body_theme: themeColor.data.data[0].body_theme,
    //         };

    //         dispatch({ type: 'THEME', payload: { ...updatedThemeColor } });
    //         localStorage.setItem('theme', JSON.stringify(updatedThemeColor));
    //         setUpdateParams({
    //             ...updateParams,
    //             resourceId: themeColor.data.data[0].user_id,
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // useEffect(() => {
    //     if (localStorage.getItem('theme')) {
    //         dispatch({
    //             type: 'THEME',
    //             payload: { ...JSON.parse(localStorage.getItem('theme')) },
    //         });
    //     } else {
    //         colorTheme();
    //     }
    // }, [tempid]);

    return (
        <>
            <>
                <Navbar></Navbar>
                <SideNavBar />
                <Row>
                    <Col>
                        <Main>{children}</Main>
                    </Col>
                </Row>
            </>
        </>
    );
}
