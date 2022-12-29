import classNames from 'classnames'
import React, { FC } from 'react'


import styles from './Button.module.css'
import ButtonProps from './Button.props'

const Button: FC<ButtonProps> = (props) => {
  return (
    <button
      aria-describedby={props.aria.description ?? ''}
      aria-label={props.aria.label}
      disabled={props.disabled}
      id={props.id}
      style={props.styleOverride}
      type={props.type ?? 'button'}
      className={classNames(
        styles.button,
        {
          [styles.enabled]: !props.disabled,
          [styles.disabled]: props.disabled,
          [styles.sizeMedium]: props.size === 'medium',
          [styles.sizeSmall]: props.size === 'small',
          [styles.sizeLarge]: props.size === 'large',
          [styles.variantDefault]: props.variant === 'default',
          [styles.variantPrimary]: props.variant === 'primary',
          [styles.variantSecondary]: props.variant === 'secondary',
          [styles.variantLight]: props.variant === 'light',
          [styles.variantDanger]: props.variant === 'danger',
          [styles.variantError]: props.variant === 'error',
          [styles.variantSuccess]: props.variant === 'success',
          [styles.variantSubmit]: props.type === 'submit' || props.variant === 'submit',
        }
      )}
      onClick={(props.disabled) ? undefined : props.onClick}
    >
      <span className={styles.text}>{props.label}</span>
    </button>
  )
}

export default Button
