const groupModelFieldsByType = (model, exclude = []) => {
  const groupedFields = {
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
  const fieldTypeKeys = Object.keys(groupedFields);

  for (const fieldName in paths) {
    if (exclude.includes(fieldName)) continue;

    const fieldType = paths[fieldName].instance;
    const fieldTypeName =
      fieldType.charAt(0).toLowerCase() + fieldType.slice(1) + "Fields";

    if (fieldTypeKeys.includes(fieldTypeName)) {
      groupedFields[fieldTypeName].push(fieldName);
    }
    groupedFields.allFields.push(fieldName);
  }

  return groupedFields;
};

module.exports = groupModelFieldsByType;
