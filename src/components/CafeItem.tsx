import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from '@ui-kitten/components';

const renderItemHeader = (headerProps: any, item: any) => (
  <View {...headerProps}>
    <Text category='h6'>
      {item.name}
    </Text>
  </View>
);

const renderItemFooter = (footerProps: any) => (
  <Text {...footerProps}>
    Buttons
  </Text>
);

const CafeItem = ({ item, index, separators }: any) => (
  <Card
    style={styles.item}
    status='basic'
    header={headerProps => renderItemHeader(headerProps, item)}
    footer={renderItemFooter}>
    <Text>
      {item.rating}
    </Text>
  </Card>
);

const styles = StyleSheet.create({
  item: {
    marginVertical: 4,
  },
});

export default CafeItem;