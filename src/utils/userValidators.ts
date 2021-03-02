export const validateCreateUserInput = (
    userId: string,
    password: string,
    confirmPassword: string
) => {
    const errors: any = {};

    if(userId.trim() === '') {
        errors.userId = 'ユーザーIDは必須項目です！'
    }
    if(password.trim() === '') {
        errors.password = 'パスワードは必須項目です!'
    } else if(password !== confirmPassword) {
        errors.confirmPassword = 'パスワードが一致しません！'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};

export const validateUpdateUserInput = (
    data: {
        userId?: string,
        password?: string,
        confirmPassword?: string,
    }
) => {
    const errors: any = {};
    
    if(data.password !== data.confirmPassword) {
        errors.confirmPassword = 'パスワードが一致しません！'
    };

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}

export const validateLoginInput = (
    userId: string, 
    password: string, 
) => {
    const errors: any = {};
    
    if(userId.trim() === '') {
        errors.username = 'ユーザーIDは必須項目です！'
    }
    if(password.trim() === '') {
        errors.password = 'パスワードは必須項目です!'
    } 

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};

