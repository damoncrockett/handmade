//n.b.: string values for imp and risk are coerced to numeric

const colorTable = {
  'Asian':'url(#wove)',
  'Western':'url(#laid)',
  'Unknown':'#9f9a86'
};

function togglesToFill (colorVal) {
  const hex = colorVal ? colorTable[colorVal] : '#9f9a86';
  return hex;
}

export { togglesToFill };
