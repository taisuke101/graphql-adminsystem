
export interface TextFormProps {
    name: string;
    label: string;
    onChange: (event: React.ChangeEvent<HTMLElement>) => void
    type: string;
    placeholder: string;
    value: string;
}

export interface SelectFormProps {
    value: string;
    name: string;
    label: string;
}