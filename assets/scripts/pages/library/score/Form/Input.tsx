export default function Input({register, name, ...props}) {
    return (
        <input {...register(name)} {...props} />
    )
}
