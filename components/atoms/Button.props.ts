import { CSSProperties, MouseEvent, MouseEventHandler } from 'react'

type ButtonProps = {
    aria: {
        description?: string
        label: string
    }
    disabled?: boolean
    id: string
    label: string
    onClick: MouseEventHandler<HTMLButtonElement>
    size?: 'medium' | 'small' | 'large'
    styleOverride?: CSSProperties
    type?: 'button' | 'submit'
    variant?: 'default' | 'primary' | 'secondary' | 'light' | 'danger' | 'error' | 'success' | 'submit'
}

export default ButtonProps
