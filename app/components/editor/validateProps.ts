import { Field } from './types/editor';

export function validateProps(
    schema: Record<string, Field>,
    props: Record<string, unknown>
): Record<string, string | number | boolean> {
    const result: Record<string, string | number | boolean> = {};

    for (const key in schema) {
        const field = schema[key];
        const rawValue = props[key];

        // 1️⃣ Undefined / null → default
        if (rawValue === undefined || rawValue === null || rawValue === '') {
            result[key] = field.defaultValue;
            continue;
        }

        // 2️⃣ Number
        if (field.type === 'number') {
            const num = Number(rawValue);
            result[key] = isNaN(num)
                ? Number(field.defaultValue)
                : num;
            continue;
        }

        // 3️⃣ Select
        if (field.type === 'select' && field.options) {
            const value = String(rawValue);
            const isValid = field.options.some(
                (opt) => opt.value === value
            );

            result[key] = isValid
                ? value
                : field.defaultValue;
            continue;
        }

        // 4️⃣ Toggle / text / color → string
        result[key] = String(rawValue);
    }

    return result;
}
