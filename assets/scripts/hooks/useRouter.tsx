const Routing = require('../libraries/routing');

interface RouterGenerate {
    generate: (route: string, variables?: {[k: string]: string }) => string
}

export default function useRouter(): RouterGenerate {
    const generate = function(route: string, variables?: { [k: string]: string }): string {
        return Routing.generate(route, variables ?? {})
    }
    return {generate}
}
