export const validate = (data, checkTypes) => {
    const {} = data;
    let checkedItems = checkTypes.current;
    if (checkedItems.length <= 0)
        throw new Error('Check types must be selected');
    /* freshness */
    if (checkedItems.includes('Freshness')) {
        if (!data['date_field']) throw new Error('date_field is required');
        if (!data['data_delay'] || Number(data['data_delay']) <= 0)
            throw new Error('data_delay is invalid');
        if (!data['frequency']) throw new Error('frequency is required');
        if (!data['run_time']) throw new Error('run_time is required');
        if (data['frequency'] !== 'Daily' && !data['run_day'])
            throw new Error('run_day is required');
        if (Number(data['run_day'] <= 0)) throw new Error('invalid run_day');
        if (
            (data['frequency'] === 'Daily' && Number(data['run_day']) > 7) ||
            (data['frequency'] === 'Weekly' && Number(data['run_day']) > 7) ||
            (data['frequency'] === 'Monthly' && Number(data['run_day']) > 31) ||
            (data['frequency'] === 'Yearly' && Number(data['run_day']) > 365)
        )
            throw new Error('invalid run_day');
    }
    /* Volume */
    if (checkedItems.includes('Volume')) {
        if (!data['column_name']) throw new Error('Attribute is required');
        if (!data['date_field']) throw new Error('date_field is required');
    }
    /* Quality */
    if (checkedItems.includes('Quality')) {
        if (!data['column_name']) throw new Error('Attribute is required');
    }
};
