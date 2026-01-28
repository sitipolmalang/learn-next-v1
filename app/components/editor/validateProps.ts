import { Field } from './PropsEditor';

export function validateProps(
    schema: Record<string, Field>,
    props: Record<string, string>
): Record<string, string> {
    const result: Record<string, string> = {};

    for (const key in schema) {
        const field = schema[key];
        const value = props[key];

        // 1. Kalau undefined / kosong → pakai default
        if (value === undefined || value === '') {
            result[key] = field.defaultValue;
            continue;
        }

        // 2. Validasi select
        if (field.type === 'select' && field.options) {
            const isValid = field.options.some(
                (opt) => opt.value === value
            );

            result[key] = isValid
                ? value
                : field.defaultValue;
            continue;
        }

        // 3. Field biasa
        result[key] = value;
    }

    return result;
}
