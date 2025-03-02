import { Score, scoreSchema } from "../../../model/library/score.interface";
import { useTranslator } from "../../../hooks/useTranslator";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import TextInput from "../../../components/Form/TextInput";
import { Form, FormItem } from "../../../shadcdn/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../shadcdn/components/ui/card";
import { Label } from "../../../shadcdn/components/ui/label";
import { Button } from "../../../shadcdn/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { MinusSquareIcon } from "lucide-react";
import { ScoreCategory } from "../../../model/library/scoreCategory.interface";
import { useCategories } from "../../../hooks/library/useCategories";
import { MultipleSelectorField } from "../../../components/Form/MultipleSelectorField";

//TODO : complete form using the following as base : https://truecoderguru.com/blog/react-hook-form-dynamic-object-array

const scoreFormSchema = scoreSchema.merge(
  z.object({ id: z.string().optional() }),
);
type FormScore = z.infer<typeof scoreFormSchema>;

export const BlankScore: FormScore = {
  title: "",
  reference: { value: "" },
  otherReferences: [],
  categories: [],
  artists: [],
  files: [],
};

export default function ScoreForm({ score = null }: { score?: Score | null }) {
  const { trans } = useTranslator();
  const form = useForm<FormScore>({
    defaultValues: score ?? BlankScore,
    resolver: zodResolver(scoreFormSchema),
    mode: "onSubmit",
  });
  const {
    fields: otherReferences,
    append: appendReference,
    remove: removeReference,
  } = useFieldArray({
    control: form.control,
    name: "otherReferences",
  } as const);
  const {
    fields: artists,
    append: appendArtist,
    remove: removeArtist,
  } = useFieldArray({
    control: form.control,
    name: "artists",
  } as const);

  const { categories: possibleCategories } = useCategories();

  const onSubmit: SubmitHandler<FormScore> = (data, e) =>
    console.log("Submit", data, e);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {score === null ? (
            <div>{trans("library.new.title")}</div>
          ) : (
            <div>
              {trans("library.edit.title")} : {score.title}
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <TextInput
              control={form.control}
              name="title"
              label={trans("entity.score.fields.title.label")}
            />

            {/* include validation with required or other standard HTML validation rules */}
            <TextInput
              control={form.control}
              name="reference.value"
              label={trans("entity.score.fields.reference.label")}
            />
            {/* errors will return when field validation fails  */}

            <FormItem className="flex gap-2 items-center">
              <Label>{trans("entity.score.fields.refs.label")}</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendReference({ value: "", information: "" })}
              >
                <PlusIcon />
              </Button>
            </FormItem>

            {otherReferences.map((ref, index: number) => (
              <div
                key={`score_reference_${ref.id}`}
                className="flex gap-5 items-center"
              >
                <TextInput
                  classname="flex gap-2 items-center flex-1"
                  control={form.control}
                  name={`otherReferences.${index}.value`}
                  label={trans("entity.score.fields.refs.value.label")}
                />
                <TextInput
                  classname="flex gap-2 items-center flex-1"
                  control={form.control}
                  name={`otherReferences.${index}.information`}
                  label={trans("entity.score.fields.refs.information.label")}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-[80px] text-red-800 font-semibold"
                  onClick={() => removeReference(index)}
                >
                  <MinusSquareIcon />
                </Button>
              </div>
            ))}

            <MultipleSelectorField<ScoreCategory> label={trans("entity.score.fields.categories.label")} control={form.control} name="categories"
                            selectables={possibleCategories}
                            getId={(v: ScoreCategory) => v.id ?? ""}
                            getDisplay={(v: ScoreCategory) => v.value}
            />

            <FormItem className="flex gap-2 items-center">
              <Label>{trans("entity.score.fields.artists.label")}</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendArtist({ artist: {id: null, name: ""}, type: "" })}
              >
                <PlusIcon />
              </Button>
            </FormItem>

            {artists.map((scoreArtist, idx: number) => (
              <div
                key={`score_artist_${scoreArtist.id}`}
                className="flex gap-5 items-center"
              >
                {/*TODO : replace by a Select with the artists */}
                <TextInput
                  classname="flex gap-2 items-center flex-1"
                  control={form.control}
                  name={`artists.${idx}.artist`}
                  label={trans("entity.artist.fields.name.label")}
                />
                {/*TODO : replace by a Select with the possibilities */}
                <TextInput
                  classname="flex gap-2 items-center flex-1"
                  control={form.control}
                  name={`artists.${idx}.type`}
                  label={trans("entity.score.fields.artists.type.label")}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-[80px] text-red-800 font-semibold"
                  onClick={() => removeArtist(idx)}
                >
                  <MinusSquareIcon />
                </Button>
              </div>
            ))}

            <Button type="submit" className="mt-4">
              {trans("main.action.save.label")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
