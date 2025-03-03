const translator = global.Translator

export function useTranslator(): {trans: (s: string, params?:{[k:string]: string}) => string} {
    const trans = (s: string, params:{[k:string]: string} = {}): string => {
        let translationParams = {}

        Object.keys(params).forEach((k:string) => {
            const paramKey = `{{${k}}}`
            translationParams[paramKey] = params[k]
        })
        return translator.trans(s, translationParams) as string
    }

    return {trans}
}
