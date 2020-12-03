export interface Event{
    
    handleItemClick: (event: React.MouseEvent<HTMLElement>) => void
    onClick: (event: React.MouseEvent<HTMLElement>) => void
    onChange: (event: React.ChangeEvent<HTMLElement>) => void
    onkeypress: (event: React.KeyboardEvent<HTMLElement>) => void
    onBlur: (event: React.FocusEvent<HTMLElement>) => void
    onFocus: (event: React.FocusEvent<HTMLElement>) => void
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    onClickDiv: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}