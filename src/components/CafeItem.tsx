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
    By Wikipedia
  </Text>
);

const CafeItem = ({ item, index, separators }: any) => (
  <Card
    style={styles.item}
    status='basic'
    header={headerProps => renderItemHeader(headerProps, item)}
    footer={renderItemFooter}>
    <Text>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
      a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
      remaining essentially unchanged.
    </Text>
  </Card>
);

const styles = StyleSheet.create({
  item: {
    marginVertical: 4,
  },
});

export default CafeItem;