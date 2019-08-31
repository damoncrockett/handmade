//n.b.: string values for imp and risk are coerced to numeric

const colorTable = {
  'Western':'#773a1d',
  //'Western':'#784229',
  'Asian':'#bf963c',
  'Unknown':'#315273'
};

function togglesToFill (colorVal) {
  const hex = colorVal ? colorTable[colorVal] : '#9f9a86';
  return hex;
}

export { togglesToFill };
