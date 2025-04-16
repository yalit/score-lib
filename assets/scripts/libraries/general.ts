export function classnames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export function buildUrl(url: string, params?: { [k: string]: string | string[] }): string {
    if (!params) {
        return url
    }

    return `${url}?${
        Object.entries(params).map(x => {
            const [key, value] = x
            if (Array.isArray(value)) {
                return value.map(v => key+"="+v).join('&')
            }
            return x.join('=')
        }).join('&')
    }`
}
