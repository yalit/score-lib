export function useRedirect(): (path: string) => void {
    const redirect = (path: string) => {
        window.location.href = path
    }

    return redirect
}
