const groupModelFieldsByType = (model, exclude = []) => {
  exclude = [...exclude, "__v"];

  const groupedFields = {
    strings: [],
    numbers: [],
    booleans: [],
    dates: [],
  };

  for (const fieldName in model.schema.paths) {
    if (exclude.includes(fieldName)) continue;

    const fieldType = model.schema.paths[fieldName].instance;

    if (["String", "Number", "Boolean", "Date"].includes(fieldType)) {
      groupedFields[`${fieldType.toLowerCase()}s`].push(fieldName);
    }
  }

  return groupedFields;
};

module.exports = groupModelFieldsByType;
