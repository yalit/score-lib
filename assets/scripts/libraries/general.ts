export function classnames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export function buildUrl(url: string, params?: {[k: string]: string}): string {
    if (!params) {
        return url
    }

    return `${url}?${Object.entries(params).map(x => x.join('=')).join('&')}`
}
