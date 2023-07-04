export const inputIntegrate = ({inputCredentials = {}, name}, register, options = {}) => {
    const onChange = (handleChange) => {
        return (name, value) => handleChange({target: {name, value}})
      }
    const regsiteredData = register(name, options)
    regsiteredData.onChange = onChange(regsiteredData.onChange)
    return Object.assign(inputCredentials, regsiteredData)
}