import  { useState, useEffect } from 'react';
import api from '../api';

export default function RoleConfiguration() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchRole = async () => {
            try {
                const Rolelist = await api.rolelist.getRole();
                setData(Rolelist);
            } catch (error) {
                console.log(error);
            }
        };
        fetchRole();
    }, []);

    return { data };
}
