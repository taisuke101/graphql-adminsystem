export const validateCreateSectionInput = (
    data: {
        sectionCode: string,
        sectionName: string
    }
) => {
    const errors: any = {};
    if (data.sectionCode.trim() === '') {
        errors.sectionCode = '拠点コードは必須項目です！'
    };
    if (data.sectionName.trim() === '') {
        errors.sectionName = '拠点名は必須項目です！'
    };

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}