const classifyModelfields = (model, exclude = []) => {
  const fields = {
    stringFields: [],
    numberFields: [],
    dateFields: [],
    booleanFields: [],
    objectIdFields: [],
    arrayFields: [],
    mixedFields: [],
    bufferFields: [],
    allFields: [],
  };

  const paths = model.schema.paths;

  for (const fieldName in paths) {
    if (exclude.includes(fieldName)) continue;

    const fieldType = paths[fieldName].instance;
    const fieldTypeName =
      fieldType.charAt(0).toLowerCase() + fieldType.slice(1) + "Fields";

    if (fields.hasOwnProperty(fieldTypeName)) {
      fields[fieldTypeName].push(fieldName);
    }

    fields.allFields.push(fieldName);
  }

  return fields;
};

module.exports = classifyModelfields;
