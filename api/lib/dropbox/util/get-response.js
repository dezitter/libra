// generate a single response object
export function getResponse(params, ...values) {
    const result = {};

    params.forEach((param, i) => {
        result[param] = values[i];
    });

    return result;
}
