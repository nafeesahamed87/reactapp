import { toastr } from 'react-redux-toastr';
import api from '../../api';

export const handleOnSubmit = async (data) => {
    try {
        const request = { resource: 'api/users' };
        const res = await api.user.addUser(request, {
            ...data,
        });
        if (res.data.status === 200) {
            toastr.success('Success', 'Record added Successfully');
            window.location.reload();
        } else {
            toastr.error('Error', res.data.message);
        }
    } catch (error) {
        toastr.error('Error', error.message);
    }
};
