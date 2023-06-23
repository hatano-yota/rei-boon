import { Tooltip } from '@rneui/themed';
import { useState } from 'react';
import { Text, View } from 'react-native';

export const CommonTooltip = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View row align="center">
      <Tooltip
        visible={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        popover={<Text style={{ color: '#fff' }}>Tooltip text</Text>}
      >
        Click me
      </Tooltip>
    </View>
  );
};
