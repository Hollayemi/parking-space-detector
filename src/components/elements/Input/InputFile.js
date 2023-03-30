import React from 'react';

/**
 * @param  {} {icon
 * @param  {} name
 * @param  {} value
 * @param  {} checked
 * @param  {} placeholder
 * @param  {} label
 * @param  {} title
 * @param  {} type
 * @param  {} required
 * @param  {} onChange
 * @param  {} onFocus
 * @param  {} error
 * @param  {} border
 * @param  {} }
 */

export const InputFile = ({
    icon,
    name,
    filename,
    value,
    placeholder,
    label,
    title,
    type,
    required,
    onChange,
    onFocus,
    error,
    size,
    status,
    border,
    multiple,
    ...props
}) => {
    return (
        <div className="mb-6">
            <label
                htmlFor={name}
                className="block text-xs md:text-sm font-bold text-slate-700 tracking-wider mb-1"
            >
                {title || ''}
                {required && (
                    <span className="text-red-600 dark:text-red-500">*</span>
                )}
            </label>
            <label
                htmlFor={name}
                className="block text-sm font-bold p-1 rounded-full text-slate-700 tracking-wider w-full max-w-[200px] cursor-pointer mb-1 shadow rounded bg-slate-50 h-10 flex items-center justify-center"
            >
                <div className="flex items-center">
                    {label && (
                        <div className="h-full flex  text-slate-500 items-center px-3">
                            {icon && icon}
                            <p className="pl-3 text-xs md:text-sm">{label}</p>
                        </div>
                    )}
                    {required && (
                        <span className="text-red-600 dark:text-red-500">
                            *
                        </span>
                    )}
                </div>
            </label>

            <input
                id={name}
                type="file"
                className="fixed -left-[500px] -top-[500px]"
                onChange={onChange}
                onFocus={onFocus}
                name={name}
                filename={name}
                value={value}
                placeholder={placeholder || 'Input Placeholder'}
                required={required || false}
                multiple={multiple || false}
                {...props}
            />

            {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">{error}</span>
                </p>
            )}

            {status && (
                <p className="mt-2 text-sm text-slate-600	 dark:text-slate-400">
                    <span className="font-light">{status}</span>
                </p>
            )}
        </div>
    );
};

export const InputRadio = ({
    icon,
    name,
    value,
    checked,
    placeholder,
    label,
    type,
    required,
    onChange,
    onFocus,
    error,
    size,
    status,
    border,
    ...props
}) => {
    return (
        <div className="m-1 flex items-center  px-3">
            <input
                id={value}
                type="radio"
                className="px-2"
                onChange={onChange}
                onFocus={onFocus}
                name={name}
                checked={checked || false}
                value={value}
                placeholder={placeholder || 'Input Placeholder'}
                required={required || false}
                {...props}
            />
            <label
                htmlFor={value}
                className="block text-sm p-1 rounded-full text-slate-700  mb-1"
            >
                <div className="flex items-center">
                    {label || 'Label Here'}
                    {required && (
                        <span className="text-red-600 dark:text-red-500">
                            *
                        </span>
                    )}
                </div>
            </label>
        </div>
    );
};
