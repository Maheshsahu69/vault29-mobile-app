const userTypeAction = (data:any) => {
    return {
        type: "SELECT_USER_TYPE",
        payload: {
            userType: data
        }
    }
};

export default userTypeAction;

