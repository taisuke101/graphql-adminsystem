export const validateCreateEmployeeInput = (
    data: {
        employeeCode: string,
        lastName: string,
        firstName: string,
    }
) => {
    const errors: any = {};
    if (data.employeeCode.trim() === '') {
        errors.employeeCode = '社員コードは必須項目です！'
    };
    if (data.lastName.trim() === '') {
        errors.lastName = '名字は必須項目です！'
    };
    if (data.firstName.trim() === '') {
        errors.firstName = '名前は必須項目です！'
    };

    return {
        errors, 
        valid: Object.keys(errors).length < 1
    }
}