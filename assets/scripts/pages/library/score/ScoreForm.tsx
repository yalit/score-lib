import {Score, scoreSchema} from "../../../model/library/score.interface";
import Card from "../../../components/card/Card";
import CardTitle from "../../../components/card/CardTitle";
import {useTranslator} from "../../../hooks/useTranslator";
import CardContent from "../../../components/card/CardContent";
import {SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import Input from "./Form/Input";
import {z} from "zod";

//TODO : complete form using the following as base : https://truecoderguru.com/blog/react-hook-form-dynamic-object-array

const scoreFormSchema = scoreSchema.merge(z.object({id: z.string().optional()}));
type FormScore = z.infer<typeof scoreFormSchema>

export const BlankScore: FormScore = {
    title: "",
    reference: {value: ""},
    otherReferences: [],
    categories: [],
    artists: [],
    files: []
}

export default function ScoreForm({score = null}: { score?: Score | null }) {
    const {trans} = useTranslator()
    const {
        control,
        register,
        handleSubmit,
    } = useForm<FormScore>({defaultValues: score ?? BlankScore});
    const {fields: otherReferences, append: appendReference, remove: removeReference} = useFieldArray({
        control,
        name: 'otherReferences'
    } as const)
    const onSubmit: SubmitHandler<FormScore> = (data) => console.log(data)

    return (
        <Card>
            <CardTitle>
                {score === null ? (
                    <div>{trans('library.new.title')}</div>
                ) : (
                    <div>{trans('library.edit.title')} : {score.title}</div>
                )}
            </CardTitle>
            <CardContent>
                {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* register your input into the hook by invoking the "register" function */}
                    <Input register={register} name="title" type="text"/>

                    {/* include validation with required or other standard HTML validation rules */}
                    <input type="text" {...register("reference.value")}/>
                    {/* errors will return when field validation fails  */}

                    {otherReferences.map((ref, index) => (
                        <>
                            <label>Reference value</label>
                            <Input register={register} key={`other_reference_${index}`}
                                   name={`otherReferences.${index}.value`}/>
                        </>
                    ))}

                    <button type="button" onClick={() => appendReference({value: ""})}>Add a Reference</button>

                    <button type="submit">Save</button>
                </form>
            </CardContent>
        </Card>
    )
}
