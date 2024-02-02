const groupModelFieldsByType = (model, exclude = []) => {
  const groupedFields = {
    objectIdFields: [],
    stringFields: [],
    numberFields: [],
    booleanFields: [],
    arrayFields: [],
    dateFields: [],
    mixedFields: [],
  };

  for (const fieldName in model.schema.paths) {
    if (exclude.includes(fieldName)) continue;

    const fieldType = model.schema.paths[fieldName].instance;

    groupedFields[
      fieldType.charAt(0).toLowerCase() + fieldType.slice(1) + "Fields"
    ].push(fieldName);
  }

  return groupedFields;
};

module.exports = groupModelFieldsByType;
