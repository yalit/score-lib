const translator = global.Translator

export function useTranslator(): {trans: (s: string, params?:{[k:string]: string}) => string} {
    const trans = (s: string, params:{[k:string]: string} = {}): string => {
        return translator.trans(s, params) as string
    }

    return {trans}
}
