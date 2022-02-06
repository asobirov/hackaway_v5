import { InputGroup } from "@chakra-ui/react"
import { useRef, ReactNode, ChangeEvent } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

type FileUploadProps = {
    register: UseFormRegisterReturn
    accept?: string
    multiple?: boolean
    children?: ReactNode,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const FileUpload = (props: FileUploadProps) => {
    const { register, accept, multiple, children, onChange } = props
    const inputRef = useRef<HTMLInputElement | null>(null)
    const { ref, ...rest } = register as { ref: (instance: HTMLInputElement | null) => void }

    const handleClick = () => inputRef.current?.click()

    return (
        <InputGroup onClick={handleClick}>
            <input
                type={'file'}
                multiple={multiple || false}
                hidden
                accept={accept}
                {...rest}
                onChange={onChange}
                ref={(e) => {
                    ref(e)
                    inputRef.current = e
                }}
            />
            <>
                {children}
            </>
        </InputGroup>
    )
}

export default FileUpload;