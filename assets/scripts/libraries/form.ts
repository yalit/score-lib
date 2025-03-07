export function objectToFormData(object): FormData
{
    let formData: FormData = new FormData()

    const transferFromObject = (object: Object, root: string|null = null) => {
        for (let key in object) {
            const formDataKey = root ? `${root}[${key}]` : key

            if (typeof object[key] === 'object' && object[key] instanceof Object) {
                transferFromObject(object[key], formDataKey)
            } else {
                formData.append(formDataKey, String(object[key]));
            }
        }
    }

    transferFromObject(object)

    return formData
}
