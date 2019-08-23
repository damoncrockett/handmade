//n.b.: string values for imp and risk are coerced to numeric

const colorTable = {
  'Laid':'30',
  'Wove':'120',
  'Unknown':'220'
};

function togglesToFill (textureVal) {
  const hue = textureVal ? colorTable[textureVal] : '0';
  const sat = hue==='0' ? '0' : '100';
  const lig = '50';

  return 'hsl('+hue+','+sat+'%,'+lig+'%)';
}

export { togglesToFill };
