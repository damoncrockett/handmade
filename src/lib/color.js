//n.b.: string values for imp and risk are coerced to numeric

const colorTable = {
  'Asian':'rgb(117,174,10)',
  'Western':'rgb(31,147,131)',
  'Unknown':'#9f9a86'
};

function togglesToFill (colorVal) {
  const hex = colorVal ? colorTable[colorVal] : 'url(#wove)';
  return hex;
}

export { togglesToFill };
