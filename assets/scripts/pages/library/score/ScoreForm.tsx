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
import { MinusSquareIcon, PlusIcon, XIcon } from "lucide-react";
import { ScoreCategory } from "../../../model/library/scoreCategory.interface";
import { useCategories } from "../../../hooks/library/useCategories";
import { SelectorField } from "../../../components/Form/SelectorField";
import { Artist } from "../../../model/library/scoreArtist.interface";
import { useArtists } from "../../../hooks/library/useArtists";
import { SelectableTextChoices } from "../../../components/Form/SelectableTextChoices";
import { useArtistTypes } from "../../../hooks/library/useArtistTypes";
import useSaveScore from "../../../hooks/library/useSaveScore";
import FileInput from "../../../components/Form/FileInput";
import { ScoreFile } from "../../../model/library/scoreFile";
import { Badge } from "../../../shadcdn/components/ui/badge";

// based on : https://truecoderguru.com/blog/react-hook-form-dynamic-object-array

const scoreFormSchema = scoreSchema.merge(
  z.object({
    id: z.string().optional(),
    "@id": z.string().optional(),
    "@type": z.string().optional(),
    uploadedFiles: z.array(z.instanceof(File)).optional(),
  }),
);
export type FormScore = z.infer<typeof scoreFormSchema>;

export const BlankScore: FormScore = {
  title: "",
  reference: { value: "" },
  otherReferences: [],
  categories: [],
  artists: [],
  files: [],
  uploadedFiles: [],
};

export default function ScoreForm({ score = null }: { score?: Score | null }) {
  const { trans } = useTranslator();
  const saveScore = useSaveScore();
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

  const { fields: scoreFiles, remove: removeFile } = useFieldArray({
    control: form.control,
    name: "files",
  } as const);

  const removeUploadedFile = (file: File) => {
    if (!form.getValues("uploadedFiles")) {
      return;
    }
    form.setValue(
      "uploadedFiles",
      form.getValues("uploadedFiles")?.filter((f) => f !== file),
    );
  };

  const { categories: possibleCategories } = useCategories();
  const { artists: possibleArtists } = useArtists();
  const { types: artistTypes } = useArtistTypes();

  const onSubmit: SubmitHandler<FormScore> = (score: FormScore) => {
    saveScore(score);
  };

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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TextInput
              control={form.control}
              name="title"
              label={trans("entity.score.fields.title.label")}
            />

            <TextInput
              control={form.control}
              name="reference.value"
              label={trans("entity.score.fields.reference.label")}
            />

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
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-red-800 font-semibold"
                  onClick={() => removeReference(index)}
                >
                  <MinusSquareIcon />
                </Button>
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
              </div>
            ))}

            <SelectorField<ScoreCategory>
              label={trans("entity.score.fields.categories.label")}
              control={form.control}
              name="categories"
              selectables={possibleCategories}
              getId={(v: ScoreCategory) => v["@id"] ?? ""}
              getDisplay={(v: ScoreCategory) => v.value}
              getNew={(value: string) => ({ value })}
            />

            <FormItem className="flex gap-2 items-center">
              <Label>{trans("entity.score.fields.artists.label")}</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendArtist({ artist: { name: "" }, type: "" })}
              >
                <PlusIcon />
              </Button>
            </FormItem>

            {artists.map((scoreArtist, idx: number) => (
              <div
                key={`score_artist_${scoreArtist.id}`}
                className="flex gap-5 items-center mb-2"
              >
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-red-800 font-semibold"
                  onClick={() => removeArtist(idx)}
                >
                  <MinusSquareIcon />
                </Button>
                <SelectorField<Artist>
                  label={trans("entity.artist.fields.name.label")}
                  control={form.control}
                  name={`artists.${idx}.artist`}
                  selectables={possibleArtists}
                  getId={(a: Artist) => a["@id"] ?? ""}
                  getDisplay={(a: Artist) => a.name}
                  getNew={(name: string) => ({ name })}
                  inline={true}
                />

                <SelectableTextChoices
                  control={form.control}
                  name={`artists.${idx}.type`}
                  label={trans("entity.score.fields.artists.type.label")}
                  choices={artistTypes}
                  placeholder={trans(
                    "entity.score.fiels.artists.type.selection.label",
                  )}
                />
              </div>
            ))}

            <FileInput
              control={form.control}
              name={"uploadedFiles"}
              label={trans("entity.score.fields.files.label")}
              acceptedFormats={[
                ".pdf",
                ".doc",
                ".docx",
                ".png",
                ".jpg",
                ".jpeg",
              ]}
            />

            <div className="flex gap-2 items-center">
              {scoreFiles.map((file: ScoreFile, fileIndex: number) => (
                <Badge key={file["@id"]}>
                  {file.name}{" "}
                  <XIcon
                    className="h-4 w-4"
                    onClick={() => removeFile(fileIndex)}
                  />
                </Badge>
              ))}
              {form.getValues()["uploadedFiles"]?.map((file: File) => (
                <Badge key={String(Math.random())}>
                  {file.name}{" "}
                  <XIcon
                    className="h-4 w-4"
                    onClick={() => removeUploadedFile(file)}
                  />
                </Badge>
              ))}
            </div>
            <Button type="submit" className="mt-4">
              {trans("main.action.save.label")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
