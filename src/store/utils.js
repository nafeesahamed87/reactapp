// tslint:disable: interface-name

export const createActionWithPayload = (type, payload) => {
  const actionData = {
    type,
    payload,
  };

  return actionData;
};

export const createAction = (type) => {
  const actionData = {
    type,
  };
  return actionData;
};
