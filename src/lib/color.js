//n.b.: string values for imp and risk are coerced to numeric

const colorTable = {
  'Western':'30',
  'Asian':'120',
  'Unknown':'220'
};

function togglesToFill (colorVal) {
  const hue = colorVal ? colorTable[colorVal] : '0';
  const sat = hue==='0' ? '0' : '100';
  const lig = '50';

  return 'hsl('+hue+','+sat+'%,'+lig+'%)';
}

export { togglesToFill };
