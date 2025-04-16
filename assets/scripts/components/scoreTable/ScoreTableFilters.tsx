import {useContext, useState} from "react";
import {ScoreCategory} from "../../model/library/scoreCategory.interface";
import {useCategories} from "../../hooks/library/useCategories";
import {PopoverMultipleSelect} from "../../shadcdn/components/ui/popoverMultipleSelect";
import {ScoreTableDataContext} from "../../context/library/scoreTableDataContext";
import {Button} from "../../shadcdn/components/ui/button";
import {Asterisk, ChevronDownIcon, ChevronRightIcon} from "lucide-react";

export function ScoreTableFilters() {
    const [open, setOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<ScoreCategory[]>([]);
    const {categories} = useCategories()
    const {actions} = useContext(ScoreTableDataContext)

    const isSelected = (id: string) => {
        return selectedCategories.filter(c => c["@id"] === id).length > 0
    }

    const selectValue = (id: string) => {
        if (isSelected(id)) {
            setSelectedCategories(selectedCategories.filter(c => c["@id"] !== id))
        } else {
            const selectedCategory = categories.find(c => c["@id"] === id)
            setSelectedCategories(selectedCategories.concat(selectedCategory ?? []))
        }
    }

    const filter = () => {
        if (!actions.setCurrentFilter) return

        actions.setCurrentFilter(selectedCategories.map(c => ({value: c["@id"] ?? "", by: 'categories'})))
    }

    const reset = () => setSelectedCategories([]);

    return (
        <div className="data__table__filters">
            <h3 className="flex items-center gap-5">
                <p className="flex items-center gap-1">
                    <span>Filtres</span>
                    {selectedCategories.length > 0 && !open && <Asterisk className="text-red-800 font-semibold h-3 w-3" />}
                </p>
                {open ?
                    <ChevronDownIcon className="h-5 w-5 cursor-pointer" onClick={() => setOpen(!open)}/>
                    : <ChevronRightIcon className="h-5 w-5 cursor-pointer" onClick={() => setOpen(!open)}/>
                }
            </h3>

            {open && (
                <>
                    <div className="flex items-center gap-3">
                        <PopoverMultipleSelect title={"Catégories"}
                                               values={selectedCategories.map(
                                                   c => ({value: c["@id"] ?? "", label: c.value})
                                               )}
                                               choices={categories.map(
                                                   c => ({value: c["@id"] ?? "", label: c.value})
                                               )}
                                               selectValue={selectValue}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="my-4" onClick={filter}>Filtrer</Button>
                        <Button variant="outline" className="my-4" onClick={reset}>Reset</Button>
                    </div>
                </>
            )}
        </div>
    )
}
