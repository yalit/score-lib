import {Score} from "../../../model/library/score.interface";

export default function ScoreForm({score = null}: {score?: Score|null}) {
    return (
        <div>Score Form : {score ? <span>Edit {score.title}</span> : <span>Create new..</span>}</div>
    )
}
