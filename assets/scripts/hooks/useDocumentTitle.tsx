export function useDocumentTitle(): (title: string) => void {
    const setTitle = (title: string): void => {
        document.title = title
    }

    return setTitle
}
